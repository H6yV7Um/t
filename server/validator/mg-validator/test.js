const validator = require('../mg-validator');
const Types = validator.types;

const extend = Types.extend('test1', /^\d{5,10}$/).extend('test2', /^\d{8,10}$/);

const data = {
    uin : '251220811',
    name  : 'zy',
    data1 : '12345',
    data2 : '12345',
    date : '2011/12/12 05:05:05'
};

const rule = validator.field({
    uin : {
        // type : {
        //     rule : Types.not([Types.ZH, Types.INT]),
        //     message : 'QQ错误'
        // },
        //type : Types.ZH,
        //type : Types.or([Types.NUMERIC, Types.ZH]),
        type : extend.types.test2,
        length : {
            rule : '2~14',
            message : '长度错误'
        },
        //length : '>2',
        message : '请输入正确的QQ号码',
        optional : {
            rule : false,
            message : '该字段不存在'
        }
    },
    data1 : {
        type : {
            rule : Types.NUMERIC,
            message : 'data1类型错误'
        },
        optional : true,
        message : '请输入正确的data1'
    },
    name : {
        type : Types.ZH,
        message : '请输入正确的姓名'
    },
    date : {
        type : Types.datetime('YYYY/MM/DD hh:mm:ss'),
        message : '请输入正确的日期'
    }
}).compare([
    // {
    //     rule : 'data1>data2',
    //     message : '大小错误'
    // },
    {
        rule : 'data1=data2',
        message : '大小错误'
    }
]);

// rule.verify(data)
//     .then(function(res){
//         console.log(res);
//     }).catch(function(err){
//         console.log(err);
//     });

const result = rule.verifySync(data);
const result2 = rule.verifyAll(data);
console.log(result2);


