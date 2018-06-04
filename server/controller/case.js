const json = require('../util/json')
const code = require('../util/code')
const paramResolver = require('../util/paramResolver')
const logger = require('../util/logger')
const model = require('../model/case')

module.exports = {
    async getList(ctx) {
        try {
            let params = paramResolver.getList(ctx);
            let data = await model.getList(params);
            ctx.body = json.success(data);
        } catch(jsonError) {
            logger.error(jsonError)
            ctx.body = jsonError
        }
    },
    async getOne(ctx) {
        try {
            
        } catch(jsonError) {
            logger.error(jsonError)
            ctx.body = jsonError
        }
    }
}