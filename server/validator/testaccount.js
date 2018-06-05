const validator = require('./mg-validator');
const code = require('../util/code');
const types = validator.types;

module.exports.insert = function(data) {
    return validator.field({
        account: {
            type: types.NUMBER,
            length: '<=24',
            message: '账号必须填写正确'
        }
    }).verifyAll(data);
}