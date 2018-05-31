import axios from 'axios'

class Model {

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
     */
    _request(method,url,params) {
        return new Promise((resolve,reject) => {
            params = params ? params : {};
            const req = {
                url: url,
                baseURL: '/api',
                method: method,
                withCredentials: true,
                timeout: 10000,
                responseType: 'json',
                data: {
                    params: params
                }
            }
            method.toUpperCase() == 'GET' 
                ? req.params = params 
                : req.data = params;
            axios(req).then((res) => {
                if (res.ret === 0) {
                    resolve(res.data);
                } else {
                    reject(res);
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
        return _request(
            'GET',
            this._url(),
            {id:id}
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
            {id:id,modified:modified}
        )
    }

    /** 
     * 添加新的数据
     * @param {object} record 增加新的数据记录
     */
    addOne(record) {
        return this._request(
            'POST',
            this._url(),
            {record:record}
        )
    }
}


export default (...args) => {
    return new Model.call(Model,...args)
}