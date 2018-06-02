# MgValidator 数据校验
表单数据校验组件，支持数据对比校验以及多种类型的数据校验。

[TOC]

## 介绍

- 支持多种类型的数据校验
- 支持数据比较校验
- 支持数据内Object类型数据校验
- 支持数组类型内数据校验
- 支持校验类型与或非操作

## 引用

### Server-side

通过tnpm或者是npm来安装`tnpm install @tencent/mg-validator`或者`npm install @tencent/mg-validator`

- #### ES6方式

```javascript
import validator from '@tencent/mg-validator'
```
- #### 非ES6方式

```javascript
const validator = require('@tencent/mg-validator');
```

### Client-side

```html
<script src="path/to/your_site/node_modules/@tencent/mg-validator/dist/mgvalidator.prod.js"></script>
```

## 使用

### 快速入门

```javascript
import validator from '@tencent/mg-validator'

const Types = validator.types;

const rule = validator.field({
    uin : {
        type : Types.QQ,
        message : '输入的QQ号码有误'
    },
    age : {
        type : Types.NUMBER,
        message : '输入的年龄有误'
    },
    brief : {
        type : Types.TEXT,
        length : '<=200',
        message : '输入的简介内容有误'
    }
});

rule.verify(data)
    .then(function(){
        // 校验成功
    }).catch(function(error){
        // 校验失败
    });

```

### 更多类型数据校验

```javascript
import validator from '@tencent/mg-validator'

const Types = validator.type;

const rule = validator.field({
    uin : {
        type : Types.QQ,  // 校验类型
        length : '>10', // 字段长度判断 <10 >=10 <=10 =10 10~20 
        message : '输入正确的QQ号码',
        optional : false/true,  // 可选参数，默认为false，如果optional为true的时候，表示该参数可以没有，但是如果表单数据里面有这个参数则会去校验    
    },
    name : {
        type : Types.ZH,
        length : {  // 也能支持这种类型的输入，输入一个对象有rule和message的key，如果有message则使用里面的，否则使用外面的
            rule : '>10',  
            message : '输入的长度必须大于10个字母'
        },
        message : '输入的名称有误'
    },
    unixtimestamp : {
        type : Types.UNIXTIMESTAMP,  // unix 时间戳
        message : '输入的日期有误'
    },
    timestamp : {
        type : Types.TIMESTAMP,
        message : '输入的数据不是时间戳'
    },
    date : {
        type : Types.datetime('YYYY-MM-DD HH:mm:ss'),
        message : '输入的日期格式不对'
    }
});

rule.verify(data)
    .then(function(){
        // 校验成功
    }).catch(function(error){
        // 校验失败
    })
```

### 数据比较校验

```javascript
import validator from '@tencent/mg-validator'

const Types = validator.type;
const rule = validator.compare([{
    rule : 'total>cost',
    message : '总量必须大于消耗量'
},{
    rule : 'total>cost',
    message : '总量必须大于使用量'
},{
    rule :  'password=confirmpassword',
    message : '密码必须和确认密码一致'
}]);

rule.verify(data)
    .then(function(){
        // 校验成功
    }).catch(function(error){
        // 校验失败
    });

```

### 数据校验与数据比较同时存在

```javascript
import validator from '@tencent/mg-validator'

const Types = validator.type;
const rule = validator.field({
    total : {
        type : Types.INT,
        message : '总量数据有误'
    },
    cost : {
        type : Types.INT,
        message : '消耗数据有误'
    },
    price : {
        type : Types.NUMERIC,
        message : '输入的价格有误'
    }
}).compare([{
    rule : 'total>cost',
    message : '总量必须大于消耗量'
},{
    rule : 'price>0',
    message : '价格必须大于0'
}]);

rule.verify(data)
    .then(function(){
        // 校验成功
    }).catch(function(error){
        // 校验失败
    });

```

## 接口

### validator.field({field:FieldRule,...}) : Rule

> 说明：配置对象里面字段的校验规则

- FieldRule {Object}

| 字段 | 类型 |  必填 | 说明 |
|------|------|------|------|
| type | validator.types.XX | √ | 校验的类型，type和length至少要有一个 |
| length | string | √ | 长度校验规则，大于:>N,小于:<N,大于等于:>=N,小于等于:<=N,等于:=N,范围:N~M(范围包括N和M) |
| message | string | √ | 错误提示语 |
| optional | boolean | × | 是否为可选参数，默认为不可选(默认会去校验)，如果为true时，数据有传则校验，没传则直接略过校验 |

### validator.compare([CompareRule,...]) : Rule

> 说明：配置对象里面字段的比较校验规则

- CompareRule {Object}

| 字段 | 类型 |  必填 | 说明 |
|------|------|------|------|
| rule | string | √ | 配置比较规则 |
| message | string | √ | 错误提示语 |

### Rule.verify(data) : Promise

> 说明：根据配置的Rule去校验data里面的数据

### Rule.verifySync(data)

> 说明：verify的同步方法

### Rule.verifyAll(data)

> 说明：一次性校验完所有规则才返回

### validator.type.or(..type)

> 说明：多个type的或操作


### validator.type.and(..type)

> 说明：多个type的或操作

### validator.type.not(type)

> 说明：非type操作

### validator.types.extend(key,RegExp|Function) : Object | null

> 说明：自定义扩展校验类型，扩展成功则返回扩展的对象，扩展失败则返回null


## Types校验类型

组件提供一些默认的类型校验，与此同时，如果提供的默认校验方式不能满足业务需求，业务方也可以使用`validator.types.extend`的方法去扩展自己的校验类型。

### 支持校验的属性

| 对应属性 | 说明 |
|------|------|
| types.QQ | 校验QQ号码 |
| types.ZH | 校验中文zh编码字符 |
| types.EN | 纯英文字母 |
| types.NUMBER | 纯数字 |
| types.POSITIVE | 正数 |
| types.NEGATIVE | 负数 |
| types.INT | 整数 |
| types.NUMERIC | 数值，负数、正数、小数的校验 |
| types.EMAIL | 校验email |
| types.LOWERCASE | 校验是否全部是小写 |
| types.UPPERCASE | 校验是否全部是大写 |
| types.URL | 校验是否URL | 
| types.JSON | 校验数据是否是一个合法的JSON |
| types.LEGAL_INPUT | 安全输入 |
| types.MOBILEPHONE_ZHCN | 中国大陆手机号码校验 | 
| types.UNIXTIMESTAMP | unix时间戳 |
| types.TIMESTAMP | ECMAscript时间戳 |
| types.HOST | host判断 |
| types.IP | IP判断 |
| types.IPv4 | IPv4类型的判断 |
| types.IPv6 | IPv6类型的判断 |
| types.BASE64 | 检测是否是Base64编码 |


### 支持校验的方法

| 对应方法 | 说明 |
|------|------|
| types.datetime() | 时间，YYYY:年、MM:月、DD:日、HH:时、mm:分、ss:秒 |


### 支持与或非校验
|------|------|
| types.or(..types) | 或操作 |
| types.and(..types) | 与操作 |
| types.not(type) | 非操作 |