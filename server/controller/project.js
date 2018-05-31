const json = require('../util/json');
const code = require('../util/code');
const validator = require('../validator/project');
const paramResolver = require('../util/paramResolver');
const model = require('../model/project');

module.exports = {
    async get(ctx) {
        
    },
    async insert(ctx,next) {
        try {
            let res = validator.insert(
                paramResolver.insert(ctx)
            );
            if (res.ret != code.SUCCESS.code) {
                ctx.body = json.fail(code.PARAMS_ERROR,res);
                return ;
            }
            let mdRes = await model.insert(res.data);
            ctx.body = json.success(mdRes.data);
        } catch(e) {
            ctx.body = json.fail(code.SERVER_ERROR,e);
        }
    },
    async modify(ctx) {
        
    },
    async remove(ctx) {

    }
}