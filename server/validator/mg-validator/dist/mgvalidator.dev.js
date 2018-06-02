var validator =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
var field_1 = __webpack_require__(5);
var compare_1 = __webpack_require__(3);
var types_1 = __webpack_require__(2);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IRuleName;
(function (IRuleName) {
    IRuleName["TYPE"] = "type";
    IRuleName["LENGTH"] = "length";
    IRuleName["OPTIONAL"] = "optional";
})(IRuleName = exports.IRuleName || (exports.IRuleName = {}));
var ISymbol;
(function (ISymbol) {
    ISymbol["TYPE1"] = ">";
    ISymbol["TYPE2"] = "<";
    ISymbol["TYPE3"] = ">=";
    ISymbol["TYPE4"] = "<=";
    ISymbol["TYPE5"] = "=";
    ISymbol["TYPE6"] = "~";
})(ISymbol = exports.ISymbol || (exports.ISymbol = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var type = /** @class */ (function () {
    function type() {
    }
    type.qq = function (val) {
        var pass = false;
        if (typeof val === 'string' || typeof val === 'number') {
            var num = Number(val), str = String(val);
            pass = (/^\d{5,10}$/.test(str) && num >= 10001 && num <= 4294967295);
        }
        return pass;
    };
    type.zh = function (val) {
        return /^[\u4e00-\u9fa5]+$/.test(val);
    };
    type.en = function (val) {
        return /^[a-zA-Z]+$/.test(val);
    };
    type.number = function (val) {
        var value = Number(val);
        return (typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]') && /^[\d]+$/.test(val);
    };
    //正整数&正浮点数
    type.positive = function (val) {
        var value = Number(val);
        var pass = value ? (/^[1-9]\d*$/.test(String(value))) || (/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(String(value))) : false;
        return pass;
    };
    //负整数&负浮点数
    type.negative = function (val) {
        var pass = (/^-[1-9]\d*$/.test(val)) || (/^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/.test(val));
        return pass;
    };
    type.int = function (val) {
        var value = Number(val);
        return value ? typeof value === 'number' && value % 1 === 0 : false;
    };
    type.numeric = function (val) {
        return /^[-+]?[0-9\.]+$/.test(val);
    };
    type.email = function (val) {
        return /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/.test(val);
    };
    type.lowercase = function (val) {
        return val === val.toLowerCase();
    };
    type.uppercase = function (val) {
        return val === val.toUpperCase();
    };
    type.url = function (val) {
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // 如果没有文件名，则不需要斜杠
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re = new RegExp(strRegex);
        return re.test(val) ? true : false;
    };
    type.json = function (val) {
        if (typeof val != 'string') {
            return false;
        }
        try {
            var obj = JSON.parse(val);
            return !!obj && typeof obj === 'object';
        }
        catch (e) { }
        return false;
    };
    type.legal_input = function (val) {
        var pattern = /[`~!#$%^*+<>?:"{},.\/;'[\]]/im;
        var isNotLegal = pattern.test(val);
        return isNotLegal ? false : true;
    };
    type.mobile = function (val) {
        return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(val);
    };
    type.unix_timestamp = function (val) {
        var value = Number(val);
        var timestamp = /^\d{10}$/;
        return value ? typeof value === 'number' && timestamp.test(val) : false;
    };
    type.timestamp = function (val) {
        var value = Number(val);
        var timestamp = /^\d{13}$/;
        return value ? typeof value === 'number' && timestamp.test(val) : false;
    };
    type.host = function (val) {
        return /^\s*([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*)([^a-z0-9-]|$)\s*/.test(val);
    };
    type.ip = function (val) {
        return type.Ipv4(val) || type.Ipv6(val);
    };
    type.Ipv4 = function (val) {
        return /^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$/.test(val);
    };
    type.Ipv6 = function (val) {
        var reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
        return reg.test(val);
    };
    type.base64 = function (val) {
        var notBase64 = /[^A-Z0-9+\/=]/i;
        var len = val.length;
        if (!len || len % 4 !== 0 || notBase64.test(val))
            return false;
        var firstPaddingChar = val.indexOf('=');
        return firstPaddingChar === -1 || firstPaddingChar === len - 1 || (firstPaddingChar === len - 2 && val[len - 1] === '=');
    };
    type.and = function (rules) {
        return {
            rule: rules,
            sign: 'and'
        };
    };
    type.or = function (rules) {
        return {
            rule: rules,
            sign: 'or'
        };
    };
    type.not = function (rules) {
        return {
            rule: rules,
            sign: 'not'
        };
    };
    type.extend = function (name, cb) {
        var a = new ExtendTypes();
        return a.add(name, cb);
    };
    type.datetime = function (rule, val) {
        return val ? Datetime.isValid(rule, val) : { rule: rule, sign: 'datetime' };
    };
    type.QQ = type.qq;
    type.ZH = type.zh;
    type.EN = type.en;
    type.NUMBER = type.number;
    type.POSITIVE = type.positive;
    type.NEGATIVE = type.negative;
    type.INT = type.int;
    type.NUMERIC = type.numeric;
    type.EMAIL = type.email;
    type.LOWERCASE = type.lowercase;
    type.UPPERCASE = type.uppercase;
    type.URL = type.url;
    type.JSON = type.json;
    type.LEGAL_INPUT = type.legal_input;
    type.MOBILEPHONE_ZHCN = type.mobile;
    type.UNIXTIMESTAMP = type.unix_timestamp;
    type.TIMESTAMP = type.timestamp;
    type.HOST = type.host;
    type.IP = type.ip;
    type.IPv4 = type.Ipv4;
    type.IPv6 = type.Ipv6;
    type.BASE64 = type.base64;
    return type;
}());
exports.type = type;
var ExtendTypes = /** @class */ (function () {
    function ExtendTypes() {
        this.types = {};
    }
    ExtendTypes.prototype.toFunc = function (regexp) {
        return function (val) {
            return regexp.test(val);
        };
    };
    ExtendTypes.prototype.isConflict = function (key) {
        var _this = this;
        var res = false;
        var _types = Object.keys(type);
        _types.forEach(function (_type) {
            if (_type === key || _type === _this.toUpperCase(key)) {
                res = true;
            }
            if (key === ('and' || 'or' || 'not')) {
                res = true;
            }
        });
        return res;
    };
    ExtendTypes.prototype.toUpperCase = function (key) {
        return key.toUpperCase();
    };
    ExtendTypes.prototype.add = function (key, rule) {
        var res = false;
        if (!rule || (typeof rule != 'function' && !(rule instanceof RegExp)))
            return null;
        if (!this.isConflict(key)) {
            var cb = rule;
            if (typeof rule != 'function') {
                cb = this.toFunc(rule);
            }
            if (typeof cb === 'function') {
                this.types[key] = cb;
            }
            res = true;
        }
        return res ? this : null;
    };
    ExtendTypes.prototype.extend = function (name, cb) {
        return this.add(name, cb);
    };
    return ExtendTypes;
}());
exports.ExtendTypes = ExtendTypes;
var Datetime = /** @class */ (function () {
    function Datetime() {
    }
    Datetime.isValid = function (rule, val) {
        var v = new Datetime();
        return v.isValid(rule, val);
    };
    Datetime.prototype.isValid = function (rule, val) {
        var splitDate = val.split(/[- :,.\/\\_|]/), splitRule = rule.split(/[- :,.\/\\_|]/);
        if (!this.isNumber(splitDate) || !this.vFormate(splitDate, splitRule)) {
            return false;
        }
        var resArr = this.parseDate(splitDate, splitRule);
        return this.validate(resArr);
    };
    Datetime.prototype.validate = function (arr) {
        var res = true;
        arr.forEach(function (item) {
            if (!item)
                res = false;
        });
        return res;
    };
    Datetime.prototype.parseDate = function (dateArr, ruleArr) {
        var _this = this;
        var res = [];
        var date = this.toInt(dateArr);
        ruleArr.forEach(function (item, index) {
            switch (item) {
                case 'MM':
                    res.push(_this.validateMM(date[index]));
                    break;
                case 'DD':
                    res.push(_this.validateDD(date[index - 2], date[index - 1], date[index]));
                    break;
                case 'hh':
                    res.push(_this.validateHh(date[index], 'hh'));
                    break;
                case 'mm':
                    res.push(_this.validateMS(date[index]));
                    break;
                case 'ss':
                    res.push(_this.validateMS(date[index]));
                    break;
            }
        });
        return res;
    };
    //校验格式、长度等
    Datetime.prototype.vFormate = function (dateArr, ruleArr) {
        var res = true;
        if (dateArr.length != ruleArr.length) {
            res = false;
        }
        dateArr.forEach(function (item, index) {
            if (item.length != ruleArr[index].length) {
                res = false;
            }
        });
        return res;
    };
    Datetime.prototype.isNumber = function (list) {
        var res = true;
        list.forEach(function (item) {
            //let val = Number(item);
            if (!type.number(item)) {
                res = false;
            }
        });
        return res;
    };
    //校验月份
    Datetime.prototype.validateMM = function (month) {
        return 1 <= month && month <= 12;
    };
    //校验日期
    Datetime.prototype.validateDD = function (year, month, day) {
        var res = true;
        if (day < 1) {
            res = false;
            //如果月份是1,3,5,7,8,10,12  
        }
        else if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
            res = false;
            //如果月份是4,6,9,11  
        }
        else if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
            res = false;
            //如果月份是2  
        }
        else if (month == 2) {
            //如果为闰年  
            if ((this.isLeapYear(year) && day > 29) || (!this.isLeapYear(year) && day > 28)) {
                res = false;
            }
        }
        return res;
    };
    //校验时
    Datetime.prototype.validateHh = function (hour, type) {
        var res = true;
        if (hour > 23) {
            res = false;
        }
        return res;
    };
    //校验分、秒
    Datetime.prototype.validateMS = function (val) {
        return val <= 59;
    };
    //是否闰年
    Datetime.prototype.isLeapYear = function (year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    };
    Datetime.prototype.toInt = function (arr) {
        var res = [];
        arr.forEach(function (item) {
            res.push(Number(item));
        });
        return res;
    };
    return Datetime;
}());
exports.Datetime = Datetime;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var validator_1 = __webpack_require__(0);
module.exports = validator_1.Validator;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = __webpack_require__(1);
var types_1 = __webpack_require__(2);
var compare_1 = __webpack_require__(3);
var validator_1 = __webpack_require__(0);
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


/***/ })
/******/ ]);