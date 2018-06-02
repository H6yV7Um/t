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
        catch (e) { /* ignore */ }
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
