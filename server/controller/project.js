const json = require('../util/json');
const code = require('../util/code');
const validator = require('../validator/project');
const paramResolver = require('../util/paramResolver')
const model = require('../model/project')
const logger = require('../util/logger')

module.exports = {
    async getOne(ctx) {
        try {
            let params = paramResolver.getOne(ctx);
            let data = await model.getOneById(params.id);
            ctx.body = json.success(data);
        } catch(jsonError) {
            logger.error(jsonError)
            ctx.body = jsonError;
        }
    },
    async getList(ctx) {
        try {
            let params = paramResolver.getList(ctx);
            let data = await model.getList(params);
            ctx.body = json.success(data);
        } catch(jsonError) {
            logger.error(jsonError)
            ctx.body = jsonError;
        }
    },
    async insert(ctx,next) {
        try {
            let params = paramResolver.insert(ctx)
            let res = validator.insert(params);
            if (res.ret != code.SUCCESS.code) {
                ctx.body = json.fail(code.PARAMS_ERROR,res.result);
                return ;
            }
            let data = await model.insert(params);
            ctx.body = json.success(data);
        } catch(jsonError) {
            logger.error(jsonError)
            ctx.body = jsonError
        }
    },
    async modify(ctx) {
        
    },
    async remove(ctx) {

    }
}