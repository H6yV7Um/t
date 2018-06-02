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

/**
 * pagation data struct
 * @param {context} ctx
 * @example
 *      api请求的参数里面带有pagenum、pagecount 
 */
module.exports.page = function(ctx) {
    const query = ctx.request.query;
    return {pagenum:Number(query.pagenum),pagecount:Number(query.pagecount)}
}

/**
 * get one data struct
 * @param {context} ctx 
 * @example
 *      api请求的url里面配置着/:id的链接参数
 */
module.exports.getOne = function(ctx) {
    const params = ctx.params;
    return {id:Number(params.id)}
}