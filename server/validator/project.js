const validator = require('./mg-validator');
const code = require('../util/code');
const types = validator.types;

module.exports.insert = function(data) {
    return validator.field({
        name: {
            type: types.LEGAL_INPUT,
            length: '<=12',
            message: '名称必须小于或者等于12个字符'
        },
        creater: {
            type: types.EN,
            length: '<30',
            message: '创建人必须为全英文'
        },
        members: {
            type: types.LEGAL_INPUT,
            length: '<=60',
            message: '成员数量不能过多',
            optional: true
        }
    }).verifyAll(data);
}