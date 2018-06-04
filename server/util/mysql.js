const mysql = require('mysql');
const code = require('./code')
const json = require('./json')
const logger = require('./logger')
const moment = require('moment')

/**
 * 数据库基础类
 * @param {object} dbConfig 数据库配置，其中包括host、port用在connection
 * @param {string} table 表的名称
 * @param {object} opts  可选配置
 */
const Mysql = function(dbConfig,table,opts = {}) {
    this.dbConfig = dbConfig
    this.table = table;
    this.primaryKey = opts.primaryKey || `id`;
    this.connection = mysql.createConnection(this.dbConfig);
}

/**
 * 生成SQL语句
 * @interface insert 插入sql
 * @interface getOneById 按照分页的格式来查询数据
 * @interface select 查询表单列表以及总数
 */
Mysql.prototype.SQL = {
    /**
     * 生成insert sql语句
     * @param {string} 表名
     * @param {object} 插入的数据
     */
    insert: function(table,data) {
        let sql = `INSERT INTO ${table}`;
        let keys = [];
        let values = [];
        for( let i in data ) {
            keys.push(`${i}`);
            if (typeof data[i] == 'string') {
                values.push(`'${data[i]}'`);
            } else {
                values.push(`${data[i]}`);
            }
        }
        return `${sql} (${keys.join(',')}) VALUES (${values.join(',')})`
    },
    /**
     * 生成查询某个id的数据的语句
     * @param {string} table 表名
     * @param {string} primaryKey id主键的名称
     * @param {number} id id的值
     */
    getOneById: function(table,primaryKey,id) {
        let sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ${id}`
        return sql;
    },
   
    /**
     * 生成select语句
     * @param {object} params 参数
     * @param {object|null} params.page 可选,{index:当前页面数,count:要获取一页的数}
     * @param {object|null} params.where 可选,{aon:'AND'/'OR'/'NOT',rules:{key:value}}
     * @param {object|null} params.orderby 可选,{field:`pid`,desc:true/false}
     * @param {boolean} isGetTotalCount 可选,只是返回获取总数的sql语句
     */
    select: function(table,params,isGetTotalCount = false) {
        const page = this._select_page(params.page);
        const where = this._select_where(params.where);
        const orderby = this._select_orderBy(params.orderby);
        return isGetTotalCount ? 
            `SELECT count(*) as total FROM ${table} ${where} ${orderby} ${page}` :
            `SELECT * FROM ${table} ${where} ${orderby} ${page}`   
    },
    /**
     * 生成select page部分的语句
     * @param {object|null} page 可选,{index:当前页面数,count:要获取一页的数}
     */
    _select_page: function(page = {}) {
        let index = page.index || 0;
        let count = page.count || 20;
        return `LIMIT ${index*count},${count}`
    },
    /**
     * 生成select where部分的语句
     * @param {object|null} where 可选,{aon:'AND'/'OR'/'NOT',rules:{key:value}}
     */
    _select_where: function(where = null) {
        let arr = [];
        if (where && where.rules) {
            let rules = where.rules;
            for(let i in rules) {
                if (typeof rules[i] == 'string') {
                    arr.push(`${i}='${rules[i]}'`)
                } else if (typeof rules[i] == 'number') {
                    arr.push(`${i}=${rules[i]}`)
                }
            }
        }
        return arr.length == 0 ? `` : 'WHERE ' + arr.join(` ${where.aon} `);
    },
    /**
     * 生成select orderBy部分的语句
     * @param {object|null} orderby 可选,{field:`pid`,desc:true/false}
     */
    _select_orderBy: function(orderby = null) {
        return orderby ? `ORDER BY ${orderby.field} ${orderby.desc ? 'DESC' : ""}` : ``;
    }
    
}


/**
 * 格式处理
 * @interface convertResultForWeb 自动转换数据适配页面使用
 */
Mysql.prototype.Format = {
    _covertFn: {
        'datetime' : function(data) {
            return moment(data).format('YYYY/MM/DD HH:mm:ss');
        }
    },
    convertResultForWeb: function(results,fields) {
        if (results.length == 0 ) {
            return {
                results,
                fields
            }
        }
        let covrs = {};
        fields.forEach((field) => {
            switch(field.type) {
                case 12: covrs[field.name] = this._covertFn.datetime;break;
            }
        });
        results.forEach((result) => {
            for (let key in result) {
                if ( typeof covrs[key] == 'function' ) {
                    result[key] = covrs[key](result[key])
                }
            }
        });
        return {
            results,
            fields
        }
    }
}

Mysql.prototype.query = async function(sql) {
    logger.debug(`fetch sql:${sql}`);
    return new Promise((resolve,reject) => {
        this.connection.query(sql,(error,results,fields) => {
            if (error) {
                reject(json.fail(code.MYSQL_ERROR));
                logger.error(error);
                return
            }
            resolve({
                results,
                fields
            })
        })
    })
}


/**
 * 插入数据，成功后返回插入数据的insertId
 * @param {object} data 等待插入的数据
 */
Mysql.prototype.insert = async function(data) {
    try {
        let sql = this.SQL.insert(this.table,data);
        let res = await this.query(sql);
        return res.results.insertId;
    } catch (jsonError) {
        throw jsonError;
    }
}

/**
 * 插叙某个id的数据，key是primaryKey
 * @param {number} id 请求参数的id 
 */
Mysql.prototype.getOneById = async function(id) {
    try {
        let sql = this.SQL.getOneById(
            this.table,
            this.primaryKey,
            id
        );
        let res = await this.query(sql);
            res = this.Format.convertResultForWeb(res.results,res.fields);
        return res.results && res.results[0] ? res.results[0] : null;
    } catch (jsonError) {
        throw jsonError;
    }
}

/**
 * 按照某种条件查询
 * @param {object} params 参数
 * @param {object|null} params.page 可选,{index:当前页面数,count:要获取一页的数}
 * @param {object|null} params.where 可选,{aon:'AND'/'OR'/'NOT',rules:{key:value}}
 * @param {object|null} params.orderby 可选,{field:`pid`,desc:true/false}
 * @returns {object} 
 *          {list:array,total:number}
 */
Mysql.prototype.getList = async function(params) {
    try {
        let sql = this.SQL.select(
            this.table,
            params
        );
        let res = await this.query(sql);
            res = this.Format.convertResultForWeb(res.results,res.fields);
        let sqlTotal = this.SQL.select(
            this.table,
            params,
            true
        );
        let resTotal = await this.query(sqlTotal);
        return {
            list: res.results,
            total: resTotal.results[0].total
        }
    } catch (jsonError) {
        throw jsonError;
    }
}

module.exports = Mysql;