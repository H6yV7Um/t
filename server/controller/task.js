const json = require('../util/json')
const code = require('../util/code')
const paramResolver = require('../util/paramResolver')
const logger = require('../util/logger')

module.exports = {
    async getList(ctx) {
        try {
            let params = paramResolver.getByFields(ctx);
            let data = await model.findByFields(params);
            console.log('-->data',data);
        } catch(jsonError) {
            logger.error(jsonError)
            ctx.body = jsonError
        }
    }
}