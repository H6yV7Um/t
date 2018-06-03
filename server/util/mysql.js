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
 * @interface selectByPage 按照分页的格式来查询数据
 * @interface totalCount 查询表单的总记录数
 */
Mysql.prototype.SQL = {
    _selectOpts: function(opt = {}) {
        return {
            desc: opt.desc || false,
        }
    },
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
     * @param {string} table 表名
     * @param {number} pagenum 第几页
     * @param {number} pagecount 一页共有多少数据
     * @param {object} opt 可选参数
     */
    selectByPage: function(table,pagenum,pagecount,opt = {}) {
        let start = pagenum * pagecount;
        let sql = `SELECT * FROM ${table} `;
            //opt = this._selectOpts(opt);
            console.log(opt);
        if (opt.desc) {
            sql += ` ORDER BY ${opt.desc} DESC`
        }
        return `${sql} LIMIT ${start},${pagecount}`
    },
    /**
     * 生成获取数据表总条目数量的语句
     * @param {string} table 表名
     */
    totalCount: function(table) {
        let sql = `SELECT count(*) as total FROM ${table}`;
        return sql;
    },
    /**
     * 生成查询某个id的数据的语句
     * @param {string} table 表名
     * @param {string} primaryKey id主键的名称
     * @param {number} id id的值
     */
    selectOneById: function(table,primaryKey,id) {
        let sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ${id}`
        return sql;
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
 * 按照分页来查询数据
 * @param {number} pagenum 第几页的值
 * @param {number} pagecount 一页多少条数据
 */
Mysql.prototype.findByPage = async function(pagenum,pagecount) {
    try {
        let sql = this.SQL.selectByPage(
            this.table,
            pagenum,
            pagecount,
            {desc:this.primaryKey}
        );
        let res = await this.query(sql);
        let sqlCount = this.SQL.totalCount(
            this.table
        )
        let resTotal = await this.query(sqlCount);
        return {
            list: this.Format.convertResultForWeb(res.results,res.fields).results,
            total: resTotal.results[0].total
        }
    } catch (jsonError) {
        throw jsonError;
    }
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
Mysql.prototype.findOneById = async function(id) {
    try {
        let sql = this.SQL.selectOneById(
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


module.exports = Mysql;