"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var types_1 = require("./types");
var compare_1 = require("./compare");
var validator_1 = require("./validator");
var Field = /** @class */ (function () {
    function Field(data) {
        this.data = data;
        this.compare = new compare_1.Compare(data);
    }
    Field.prototype.verify = function (key, field) {
        var res = this.verifyOpt(key, field);
        if (res.ret != validator_1.Validator.SUCCESS) {
            return res;
        }
        if (this.exist(key)) {
            res = this.verifyType(key, field);
            if (res.ret != validator_1.Validator.SUCCESS) {
                return res;
            }
            res = this.verifyLength(key, field);
        }
        return res;
    };
    Field.prototype.verifyType = function (key, field) {
        var typeRule = field.type;
        var ret;
        if (!typeRule) {
            return validator_1.Validator.output(validator_1.Validator.SUCCESS);
        }
        if (typeof typeRule != 'object') {
            typeRule = {
                rule: [typeRule],
                message: field.message
            };
        }
        if (!typeRule.message) {
            typeRule.message = field.message;
        }
        if (typeof typeRule.rule != 'object') {
            typeRule.rule = [typeRule.rule];
        }
        if (Array.isArray(typeRule.rule)) {
            ret = this._verifyTypesArr(key, {
                rule: typeRule.rule,
                sign: typeRule.sign
            });
        }
        else {
            ret = this._verifyTypesArr(key, typeRule.rule);
        }
        var data = {
            dataName: key,
            value: String(this.data[key]),
            ruleName: interface_1.IRuleName.TYPE,
            errMsg: typeRule.message
        };
        return validator_1.Validator.output(ret, data);
    };
    Field.prototype.verifyLength = function (key, field) {
        var lengthRule = field.length;
        if (!lengthRule) {
            return validator_1.Validator.output(validator_1.Validator.SUCCESS);
        }
        if (typeof lengthRule === 'string') {
            lengthRule = {
                rule: lengthRule,
                message: field.message
            };
        }
        var idx = this.compare.getType(lengthRule.rule);
        var arr = this.compare.getData(idx, lengthRule.rule);
        var res = false;
        var ret;
        if (arr.length == 1) {
            arr.unshift(this.data[key].length);
            res = this.compare.compare(idx.type, arr);
        }
        else {
            var data1 = [arr[0], this.data[key].length], data2 = [this.data[key].length, arr[1]];
            res = this.compare.compare(2, data1) && this.compare.compare(2, data2);
        }
        var data = {
            dataName: key,
            value: String(this.data[key]),
            ruleName: interface_1.IRuleName.LENGTH,
            errMsg: lengthRule.message
        };
        if (!res) {
            ret = validator_1.Validator.errCode.ERR_LENGTHERR;
        }
        else {
            ret = validator_1.Validator.SUCCESS;
        }
        return validator_1.Validator.output(ret, data);
    };
    Field.prototype._verifyTypesArr = function (key, typeRule) {
        var ret;
        var sign = typeRule.sign;
        if (sign && sign === 'or') {
            ret = this._verifyOr(key, typeRule.rule);
        }
        else if (sign && sign === 'not') {
            ret = this._verifyNot(key, typeRule.rule);
        }
        else if (sign && sign === 'datetime') {
            ret = this._verifyDate(key, typeRule.rule);
        }
        else {
            ret = this._verifyAnd(key, typeRule.rule);
        }
        return ret ? validator_1.Validator.SUCCESS : validator_1.Validator.errCode.ERR_TYPEERR;
    };
    Field.prototype._verifyAnd = function (key, rules) {
        var _this = this;
        var res = true;
        rules.forEach(function (rule) {
            var ret = _this._verifyType(_this.data[key], rule);
            if (!ret) {
                res = false;
            }
        });
        return res;
    };
    Field.prototype._verifyOr = function (key, rules) {
        var _this = this;
        var res = false;
        rules.forEach(function (rule) {
            var ret = _this._verifyType(_this.data[key], rule);
            if (ret) {
                res = true;
            }
        });
        return res;
    };
    Field.prototype._verifyDate = function (key, rules) {
        return types_1.Datetime.isValid(rules[0], this.data[key]);
    };
    Field.prototype._verifyNot = function (key, rules) {
        var _this = this;
        var res = true;
        rules.forEach(function (rule) {
            var ret = _this._verifyType(_this.data[key], rule);
            if (ret) {
                res = false;
            }
        });
        return res;
    };
    Field.prototype._verifyType = function (val, rule) {
        return rule(val);
    };
    Field.prototype.verifyOpt = function (key, field) {
        var optionalRule = field.optional || false;
        var ret;
        if (typeof optionalRule === 'boolean') {
            optionalRule = {
                rule: optionalRule,
                message: field.message
            };
        }
        var data = {
            dataName: key,
            value: null,
            ruleName: interface_1.IRuleName.OPTIONAL,
            errMsg: optionalRule.message
        };
        if (!optionalRule.rule && !this.exist(key)) {
            ret = validator_1.Validator.errCode.ERR_NOT_EXIST;
        }
        else {
            ret = validator_1.Validator.SUCCESS;
        }
        return validator_1.Validator.output(ret, data);
    };
    Field.prototype.exist = function (key) {
        var data = this.data;
        return (data != null) && data.hasOwnProperty(key) ? true : false;
    };
    return Field;
}());
exports.Field = Field;
