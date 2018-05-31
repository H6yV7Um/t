/**
 * insert data struct
 * @param {context} ctx
 * @example
 *     api请求参数数据 {record:data} 
 */
module.exports.insert = function(ctx) {
    const body = ctx.request.body;
    return body.record;
}

/**
 * modify data struct
 * @param {context} ctx 
 * @example
 *      api请求参数数据 {id:id,modify:data}
 */
module.exports.modify = function(ctx) {
    const body = ctx.request.body;
    return {id:body.id,modify:body.modify}
}

module.exports.get = function(ctx) {

}