/**
 * insert data struct
 * @param {context} ctx
 * @example
 *     { record: data } 
 */
module.exports.insert = function(ctx) {
    const body = ctx.request.body;
    return body.record;
}

/**
 * modify data struct
 * @param {context} ctx 
 * @example
 *      { id: id, modify: data }
 */
module.exports.modify = function(ctx) {
    const body = ctx.request.body;
    return {id:body.id,modify:body.modify}
}

/**
 * pagation data struct
 * @param {context} ctx
 * @example
 *      { page: {index:2,count:20} }
 */
module.exports.page = function(ctx) {
    const query = ctx.request.query;
    return query.page ? {index:Number(query.page.index),count:Number(query.page.count)} : null;
}

/**
 * where data struct
 * @param {context} ctx
 * @example
 *      { where: { aon:'AND', rules:{pid:2} }
 */
module.exports.where = function(ctx) {
    const query = ctx.request.query;
    const where = query.where;
    return ( where && where.aon && where.rules ) ? {
        aon: where.aon && where.aon.indexOf('AND|OR') > -1 ? where.ano : 'AND',
        rules: where.rules || null
    } : null;
}

/**
 * desc data struct
 * @param {context} ctx 
 * @example
 *      { orderby: { field: `pid`, desc: true/false } }
 */
module.exports.orderby = function(ctx) {
    const query = ctx.request.query;
    const orderby = query.orderby;
    return ( orderby && orderby.field ) ? {
        field: orderby.field,
        desc: orderby.desc || false
    } : null;
}

/**
 * get one data struct
 * @param {context} ctx 
 * @example
 *     /api/{resource}/:id
 */
module.exports.getOne = function(ctx) {
    const params = ctx.params;
    return {id:Number(params.id)}
}


/**
 * get list data struct
 * @param {context} ctx
 * @example
 *     @include this.page
 *     @include this.where 
 *     @include this.orderby
 */
module.exports.getList = function(ctx) {
    const params = {
        page: this.page(ctx),
        where: this.where(ctx),
        orderby: this.orderby(ctx)
    }
    return params;
}