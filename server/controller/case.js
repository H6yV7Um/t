const json = require('../util/json')
const code = require('../util/code')
const paramResolver = require('../util/paramResolver')
const validator = require('../validator/case')
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
    },
    async insert(ctx) {
        try {
            let params = paramResolver.insert(ctx);
            let res = validator.insert(params);
            if (res.ret != code.SUCCESS.code) {
                ctx.body = json.fail(code.PARAMS_ERROR,res.result);
                return ;
            }
            let data = await model.insert(params);
            ctx.body = json.success(data);
        } catch(jsonError) {
            logger.error(jsonError)
            ctx.body = jsonError;
        }
    }
}