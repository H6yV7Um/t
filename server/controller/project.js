const json = require('../util/json');
const code = require('../util/code');
const validator = require('../validator/project');
const paramResolver = require('../util/paramResolver');
const model = require('../model/project');

module.exports = {
    async getOne(ctx) {
        try {
            let params = paramResolver.getOne(ctx);
            let data = await model.findOneById(params.id);
            ctx.body = json.success(data);
        } catch(jsonError) {
            ctx.body = jsonError;
        }
    },
    async get(ctx) {
        try {
            let params = paramResolver.page(ctx);
            let data = await model.findByPage(params.pagenum,params.pagecount)
            ctx.body = json.success(data);
        } catch(e) {
            console.error(e);
            ctx.body = json.fail(code.SERVER_ERROR,e);
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
        } catch(e) {
            console.error(e);
            ctx.body = json.fail(code.SERVER_ERROR,e);
        }
    },
    async modify(ctx) {
        
    },
    async remove(ctx) {

    }
}