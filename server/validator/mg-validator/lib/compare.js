"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("./interface");
var validator_1 = require("./validator");
var Compare = /** @class */ (function () {
    //rule : ICompareInnerRule;
    function Compare(data) {
        this.data = data;
    }
    Compare.prototype.verify = function (compareRule) {
        var rule = compareRule.rule;
        var idx = this.getType(rule);
        if (!idx) {
            throw Error('compare规则配置有误');
        }
        var key = rule.split(idx.symbol);
        var data = this.getArr(key);
        var res = {
            dataName: [key[0], key[1]],
            value: data,
            ruleName: rule,
            errMsg: compareRule.message
        };
        var ret = this.compare(idx.type, data) ? validator_1.Validator.SUCCESS : validator_1.Validator.errCode.ERR_COMPAREERR;
        return validator_1.Validator.output(ret, res);
    };
    Compare.prototype.getArr = function (key) {
        var _this = this;
        var res = [];
        key.forEach(function (item, index) {
            var num = Number(item);
            num ? res.push(num) : res.push(_this.data[key[index]]);
        });
        return res;
    };
    Compare.prototype.compare = function (type, data) {
        var pass = true;
        switch (type) {
            case 1:
                pass = data[0] > data[1];
                break;
            case 2:
                pass = data[0] < data[1];
                break;
            case 3:
                pass = data[0] >= data[1];
                break;
            case 4:
                pass = data[0] <= data[1];
                break;
            case 5:
                pass = data[0] == data[1];
                break;
        }
        return pass;
    };
    Compare.prototype.getType = function (rule) {
        var temp;
        var regexp = [
            { type: 1, reg: /^(\w*)>(\w+)$/, symbol: interface_1.ISymbol.TYPE1 },
            { type: 2, reg: /^(\w*)<(\w+)$/, symbol: interface_1.ISymbol.TYPE2 },
            { type: 3, reg: /^(\w*)>=(\w+)$/, symbol: interface_1.ISymbol.TYPE3 },
            { type: 4, reg: /^(\w*)<=(\w+)$/, symbol: interface_1.ISymbol.TYPE4 },
            { type: 5, reg: /^(\w*)=(\w+)$/, symbol: interface_1.ISymbol.TYPE5 },
            { type: 6, reg: /^(\w+)~(\w+)$/, symbol: interface_1.ISymbol.TYPE6 }
        ];
        regexp.forEach(function (item) {
            if (item.reg.test(rule)) {
                temp = item;
            }
        });
        return temp || null;
    };
    Compare.prototype.getData = function (rule, input) {
        var symbol = rule.symbol, type = rule.type;
        var arr = input.split(symbol), res = this.toInt(arr);
        return type == 6 ? res : [res[1]];
    };
    Compare.prototype.toInt = function (arr) {
        var res = [];
        arr.forEach(function (item) {
            res.push(Number(item));
        });
        return res;
    };
    return Compare;
}());
exports.Compare = Compare;
