"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var field_1 = require("./field");
var compare_1 = require("./compare");
var types_1 = require("./types");
var Validator = /** @class */ (function (_super) {
    __extends(Validator, _super);
    function Validator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fieldRule = null;
        _this.compareRule = null;
        _this.data = {};
        return _this;
    }
    Validator.field = function (rule) {
        var f = new Validator();
        return f.field(rule);
    };
    Validator.output = function (resNum, data) {
        if (data && resNum != 0) {
            return {
                ret: resNum,
                result: {
                    dataName: data.dataName,
                    value: data.value,
                    ruleName: data.ruleName,
                    errMsg: data.errMsg
                }
            };
        }
        else {
            return { ret: Validator.SUCCESS };
        }
    };
    Validator.compare = function (rule) {
        var c = new Validator();
        return c.compare(rule);
    };
    Validator.prototype.field = function (rule) {
        this.checkFieldRule(rule);
        this.fieldRule = rule;
        return this;
    };
    Validator.prototype.compare = function (rule) {
        this.checkCompareRule(rule);
        this.compareRule = rule;
        return this;
    };
    Validator.prototype.verify = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.data = data;
            if (_this.fieldRule != null) {
                var field = new field_1.Field(data);
                for (var key in _this.fieldRule) {
                    var res = field.verify(key, _this.fieldRule[key]);
                    if (res.ret != Validator.SUCCESS) {
                        reject(res);
                    }
                }
            }
            if (_this.compareRule != null) {
                var compare = new compare_1.Compare(data);
                for (var key in _this.compareRule) {
                    var res = compare.verify(_this.compareRule[key]);
                    if (res.ret != Validator.SUCCESS) {
                        reject(res);
                    }
                }
            }
            resolve({ ret: Validator.SUCCESS });
        });
    };
    Validator.prototype.verifySync = function (data) {
        this.data = data;
        if (this.fieldRule != null) {
            var field = new field_1.Field(data);
            for (var key in this.fieldRule) {
                var res = field.verify(key, this.fieldRule[key]);
                if (res.ret != Validator.SUCCESS) {
                    return res;
                }
            }
        }
        if (this.compareRule != null) {
            var compare = new compare_1.Compare(data);
            for (var key in this.compareRule) {
                var res = compare.verify(this.compareRule[key]);
                if (res.ret != Validator.SUCCESS) {
                    return res;
                }
            }
        }
        return { ret: Validator.SUCCESS };
    };
    Validator.prototype.verifyAll = function (data) {
        this.data = data;
        var result = [], pass = true;
        if (this.fieldRule != null) {
            var field = new field_1.Field(data);
            for (var key in this.fieldRule) {
                var res = field.verify(key, this.fieldRule[key]);
                result.push(res);
                if (res.ret != Validator.SUCCESS) {
                    pass = false;
                }
            }
        }
        if (this.compareRule != null) {
            var compare = new compare_1.Compare(data);
            for (var key in this.compareRule) {
                var res = compare.verify(this.compareRule[key]);
                result.push(res);
                if (res.ret != Validator.SUCCESS) {
                    pass = false;
                }
            }
        }
        return pass ? { ret: 0 } : result;
    };
    Validator.prototype.checkFieldRule = function (rules) {
        for (var i in rules) {
            if (!rules[i].hasOwnProperty('type') && !rules[i].hasOwnProperty('length')) {
                throw Error('type和length规则至少配置一个');
            }
            this.checkMessage(rules[i]);
        }
    };
    Validator.prototype.checkCompareRule = function (rules) {
        var _this = this;
        rules.forEach(function (item) {
            _this.checkMessage(item);
        });
    };
    Validator.prototype.checkMessage = function (rule) {
        if (!rule.hasOwnProperty('message')) {
            throw Error('未配置全局message');
        }
    };
    Validator.types = types_1.type;
    Validator.SUCCESS = 0;
    Validator.errCode = {
        ERR_NOT_EXIST: -1001,
        ERR_TYPEERR: -1002,
        ERR_LENGTHERR: -1003,
        ERR_COMPAREERR: -1004
    };
    return Validator;
}(types_1.type));
exports.Validator = Validator;
