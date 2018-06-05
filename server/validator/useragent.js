const validator = require('./mg-validator');
const code = require('../util/code');
const types = validator.types;

module.exports.insert = function(data) {
    return validator.field({
        name: {
            type: types.LEGAL_INPUT,
            length: '<=24',
            message: '名称必须小于或者等于24个字符'
        }
    }).verifyAll(data);
}