const logger = require('./logger')

/**
 * insert data struct
 * @param {context} ctx
 * @example
 *     { record: data } 
 */
module.exports.insert = function(ctx) {
    const body = ctx.request.body;
    logger.debug(`|param resolver|insert|${JSON.stringify(body.record)}`);
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
    logger.debug(`|param resolver|modify|${JSON.stringify(body)}`);
    return {id:body.id,modify:body.modify}
}

/**
 * pagation data struct
 * @param {context} ctx
 * @returns {object} {index:0/x,count:20/x}
 * @example
 *      { page: {index:2,count:20} }
 */
module.exports.page = function(ctx) {
    const select = getSelectParams(ctx);
    const page = select.page || {}
    logger.debug(`|param resolver|page|${JSON.stringify(page)}`);
    return {
        index: page.index ? Number(page.index) : 0,
        count: page.count ? Number(page.count) : 20
    }
}

/**
 * where data struct
 * @param {context} ctx
 * @returns {object|null} {aon:'AND',rules:object}|null
 * @example
 *      { where: { aon:'AND', rules:{pid:2} }
 */
module.exports.where = function(ctx) {
    const select = getSelectParams(ctx);
    const where = select.where || {}
    logger.debug(`|param resolver|where|${JSON.stringify(where)}`);
    return ( where && where.aon && where.rules ) ? {
        aon: where.aon && where.aon.indexOf('AND|OR') > -1 ? where.ano : 'AND',
        rules: where.rules || null
    } : null;
}

/**
 * desc data struct
 * @param {context} ctx
 * @returns {object|null} {field:xx,desc:true/false}|null
 * @example
 *      { orderby: { field: `pid`, desc: true/false } }
 */
module.exports.orderby = function(ctx) {
    const select = getSelectParams(ctx);
    const orderby = select.orderBy || {}
    logger.debug(`|param resolver|orderby|${JSON.stringify(orderby)}`);
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
    logger.debug(`|param resolver|getOne|${JSON.stringify(params)}`);
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
    logger.debug(`|param resolver|getList|${JSON.stringify(params)}`);
    return params;
}


/**
 * get query include select struct data
 * @param {context} ctx 
 */
function getSelectParams(ctx) {
    const query = ctx.request.query || {};
    const select = typeof query.select == 'string' ? JSON.parse(query.select) : {};
    return select;
}