'use strict'

const validator = require('../index');
const Types = validator.types;

module.exports = {

    form: {
        qq: {
            type: Types.QQ,
            message: '输入的uin有误'
        },
        zh: {
            type: Types.ZH,
            message: '输入的中文有误'
        },
        en: {
            type: Types.EN,
            message: '输入的英文有误'
        },
        number: {
            type: Types.NUMBER,
            message: '输入的纯数字有误'
        },
        positive: {
            type: Types.POSITIVE,
            message: '输入的正数有误'
        },
        negative: {
            type: Types.NEGATIVE,
            message: '输入的负数有误'
        },
        int: {
            type: Types.INT,
            message: '输入的整数有误'
        },
        numeric: {
            type: Types.NUMERIC,
            message: '输入的数值有误'
        },
        email: {
            type: Types.EMAIL,
            message: '输入的邮件有误'
        },
        lowercase: {
            type: Types.LOWERCASE,
            message: '输入的全小写有误'
        },
        uppercase: {
            type: Types.UPPERCASE,
            message: '输入的全大写有误'
        },
        url: {
            type: Types.URL,
            message: '输入的url有误'
        },
        json: {
            type: Types.JSON,
            message: '输入的json数据有误'
        },
        mobilephonezhcn: {
            type: Types.MOBILEPHONE_ZHCN,
            message: '输入的中国大陆手机号码有误'
        },
        unix_timestamp: {
            type: Types.UNIXTIMESTAMP,
            message: '输入的unix时间戳有误'
        },
        timestamp: {
            type: Types.TIMESTAMP,
            message: '输入的ECMAscript时间戳有误'
        },
        host: {
            type: Types.HOST,
            message: '输入的host有误'
        },
        ip: {
            type: Types.IP,
            message: '输入的ip有误'
        },
        ipv4: {
            type: Types.IPv4,
            message: '输入的IPv4有误'
        },
        ipv6: {
            type: Types.IPv6,
            message: '输入的IPv6有误'
        },
        base64: {
            type: Types.BASE64,
            message: '输入的base64有误'
        },
        legal_input: {
            type: Types.LEGAL_INPUT,
            message: '输入的字符不合法'
        }
    },
    length : {
        len1 : {length : '>2', message : '长度错误'},
        len2 : {length : '<10', message : '长度错误'},
        len3 : {length : '>=5', message : '长度错误'},
        len4 : {length : '<=9', message : '长度错误'},
        len5 : {length : '=6', message : '长度错误'},
        len6 : {length : '3~12', message : '长度错误'},
    },
    optional : {
        is : {
            data : 
                {type : Types.EN,
                optional : {
                    rule : true,
                    message : '该字段不存在'
                },
                message : 'data字段有误'
            },
            data1 : 
                {type : Types.EN,
                optional : {
                    rule : true,
                    message : '该字段不存在'
                },
                message : 'data1字段有误'
            },
            },
        not : {
            data2 : 
                {type : Types.EN,
                optional : {
                    rule : false,
                    message : '该字段不存在'
                },
                message : 'data2字段有误'},
            data1 : 
                {type : Types.EN,
                optional : {
                    rule : false,
                    message : '该字段不存在'
                },
                message : 'data1字段有误'},
            }
    },
    compare : [
        {rule : 'data1>data2', 
        message : '比较大小有误'},
        {rule : 'data4<data2', 
        message : '比较大小有误'},
        {rule : 'data2=data3', 
        message : '比较大小有误'},
        {rule : 'data1>=data2', 
        message : '比较大小有误'},
        {rule : 'data4<=data2', 
        message : '比较大小有误'},
        {rule : 'data1>1234', 
        message : '比较大小有误'},
        {rule : 'data3>=1234',
        message : '比较大小有误'}
    ],  
    and : [
        {
            type : Types.and([Types.QQ, Types.NUMERIC, Types.INT]),
            message : '类型错误'
        },
        {
            type : Types.and([Types.EN, Types.LOWERCASE]),
            message : '类型错误'
        },
        {
            type : Types.and([Types.NUMERIC, Types.IPv4]),
            message : '类型错误'
        },
        {
            type : Types.and([Types.MOBILEPHONE_ZHCN, Types.INT, Types.NUMERIC]),
            message : '类型错误'
        },
        {
            type : Types.and([Types.EN, Types.UPPERCASE]),
            message : '类型错误'
        },
        {
            type : Types.and([Types.EMAIL]),
            message : '类型错误'
        },
        {
            type : Types.and([Types.JSON]),
            message : '类型错误'
        },
        {
            type : Types.and([Types.ZH]),
            message : '类型错误'
        }
    ],
    or : [
        {
            type : Types.or([Types.MOBILEPHONE_ZHCN, Types.QQ]),
            message : '类型错误'
        },
        {
            type : Types.or([Types.IPv4, Types.EN]),
            message : '类型错误'
        },
        {
            type : Types.or([Types.EN, Types.IPv4]),
            message : '类型错误'
        },
        {
            type : Types.or([Types.MOBILEPHONE_ZHCN, Types.BASE64]),
            message : '类型错误'
        },
        {
            type : Types.or([Types.ZH, Types.UPPERCASE]),
            message : '类型错误'
        },
        {
            type : Types.or([Types.EMAIL]),
            message : '类型错误'
        },
        {
            type : Types.or([Types.JSON, Types.UPPERCASE, Types.ZH]),
            message : '类型错误'
        },
        {
            type : Types.or([Types.ZH]),
            message : '类型错误'
        }     
    ],
    not : [
        {
            type : Types.not([Types.JSON, Types.EN, Types.ZH, Types.BASE64, Types.QQ]),
            message : '类型错误'
        },
        {
            type : Types.not([Types.MOBILEPHONE_ZHCN, Types.QQ, Types.EN]),
            message : '类型错误'
        },
        {
            type : Types.not([Types.IPv4]),
            message : '类型错误'
        },
        {
            type : Types.not([Types.MOBILEPHONE_ZHCN, Types.EN]),
            message : '类型错误'
        },
        {
            type : Types.not([Types.UPPERCASE]),
            message : '类型错误'
        },
        {
            type : Types.not([Types.EMAIL, Types.NUMBER]),
            message : '类型错误'
        },
        {
            type : Types.not([Types.JSON]),
            message : '类型错误'
        },
        {
            type : Types.not([Types.ZH, Types.BASE64]),
            message : '类型错误'
        }
    ],
    datetime : [
        {
            type : Types.datetime('YYYY/MM/DD hh:mm:ss'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY-MM-DD hh.mm.ss'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY|MM|DD hh.mm.ss'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY.MM.DD hh:mm:ss'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY/MM/DD'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY-MM-DD'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY.MM.DD'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY/MM/DD'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY/MM/DD hh.mm.ss'),
            message : '请输入正确的日期' 
        },
        {
            type : Types.datetime('YYYY-MM-DD'),
            message : '请输入正确的日期' 
        }
    ]
    
        

}
