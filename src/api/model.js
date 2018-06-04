import axios from 'axios'

class Model {

    _PAGECOUNT = 20

    /**
     * 构造函数
     * @param {string} params.name 模块名称
     * @param {string} params.primaryKey 数据的主键
     */
    constructor(params) {
        this.name = params.name;
        this.primaryKey = params.primaryKey || `id`;
    }

    /**
     * 生成请求的url,不包含url部分
     */
    _url() {
        return `/${this.name}`
    }

    /**
     * 请求的方式
     * @param {string} method 请求的方式
     * @param {string} url 请求的url，不用带baseurl 
     * @param {object} params 请求的参数
     * @param {object} params.select select参数
     */
    _request(method,url,params) {
        return new Promise((resolve,reject) => {
            params = params ? params : {};
            const req = {
                url: url,
                baseURL: 'http://localhost:1337/api',
                method: method,
                withCredentials: true,
                timeout: 10000,
                responseType: 'json',
                data: {
                    params
                }
            }
            method.toUpperCase() == 'GET' 
                ? req.params = params 
                : req.data = params;
            axios(req).then((res,body) => {
                let data = res.data;
                if (data.ret === 0) {
                    resolve(data.data);
                } else {
                    reject(data);
                }
            }).catch((error) => {
                reject(error);
            });
        })
    }

    /**
     * 根据id获取某个数据
     * @param {number} id 数据的id值
     */
    getOneById(id) {
        return this._request(
            'GET',
            this._url()+'/'+id
        )
    }

    /**
     * 根据id去更新数据
     * @param {number} id 更新某个数据的id
     * @param {object} modified 更新的数据 
     */
    updateById(id,modified) {
        return this._request(
            'PUT',
            this._url(),
            {id,modified}
        )
    }

    /** 
     * 添加新的数据
     * @param {object} record 增加新的数据记录
     */
    insert(record) {
        return this._request(
            'POST',
            this._url(),
            {record}
        )
    }


    /**
     * 
     * @param {object} params 参数
     * @param {object} params.page 分页数据,{page:{index:0,count:20}}
     * @param {object} params.where 条件查询,{rules:[key:string],aon:`AND`/`OR`/`NOT`}
     * @param {object} params.orderBy 排序查询,{field:`pid`,desc:true/false}
     */
    getList(params) {
        console.log('-->params',params);
        let page = {index:0,count:20}
        let where = null;
        let orderBy = null;
        if (params.page && params.page.index && params.page.count) {
            page = {index:params.page.index,count:params.page.count}
        }
        if (params.where && params.where.rules) {
            where = {rules:params.where.rules,aon:params.where.aon || 'AND'}
        }
        if (params.orderBy && params.orderBy.field && params.orderBy.desc) {
            orderBy = {field:params.orderBy.field,desc:params.orderBy.desc}
        }
        const _params = {
            page,
            where,
            orderBy
        }
        return this._request(
            'GET',
            this._url()+'s',
            {select:_params}
        )
    }
}


export default function(...args){
    return new Model(...args)
}