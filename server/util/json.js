const code = require('./code');

/**
 * 返回成功的json
 * @param {any} data 
 */
module.exports.success = function(data) {
    return {
        ret: code.SUCCESS.code,
        msg: code.SUCCESS.message,
        data: data || null
    }
}

/**
 * 返回失败的json
 * @param {code} codeRes 
 * @param {any|error} error 
 */
module.exports.fail = function(codeRes,error) {
    codeRes = codeRes || code.UNKNOW_ERROR;
    return {
        ret: codeRes.code,
        msg: codeRes.message,
        error: error || null
    }
}