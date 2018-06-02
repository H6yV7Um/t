'use strict'

const rule = require('./rule');
const expect = require('chai').expect;
const data = require('./data.js');
const validator = require('../index');
const chai = require('chai');
const should = chai.should();

describe('validator',function(){
    describe('.field',function(){
        describe('type', function(){
            // form field pass type
            it('should pass type',function(){
                var arr = [];
                for(var type in data.types){
                    var datas = data.types[type].is;
                    datas.forEach(function(item) {       
                        var obj = {};
                        obj[type] = item;   
                        arr.push(obj);
                    });
                
                }
                arr.forEach(function(item){
                    var obj = {};
                    for(var r in rule.form){
                        if(r === Object.keys(item)[0]){
                            obj[r] = rule.form[r];
                        }
                    }
                    var rules = validator.field(obj);
                    rules.verify(item)
                        .then(function(res){
                            res.should.have.property('ret').which.equal(0);
                        }).catch(function(err){  
                            should.not.exist(err);
                        });
                    var result = rules.verifySync(item);
                    result.should.have.property('ret').which.equal(0);
                });
            });
            // not pass
            it('should not pass type',function(){
                var arr = [];
                for(var type in data.types){
                    var datas = data.types[type].not;
                    datas.forEach(function(item) {       
                        var obj = {};
                        obj[type] = item;   
                        arr.push(obj);
                    });                
                }
                arr.forEach(function(item){  
                    var obj = {};
                    for(var r in rule.form){
                        if(r === Object.keys(item)[0]){
                            obj[r] = rule.form[r];
                        }
                    }
                    var rules = validator.field(obj);
                    rules.verify(item)
                        .then(function(res){ 
                            should.not.exist(res);
                        }).catch(function(err){             
                            err.should.have.property('ret').which.equal(-1002);
                        });
                    var result = rules.verifySync(item);
                    result.should.have.property('ret').which.equal(-1002);
                });
            });
        });
        describe('length', function(){
            it('should pass length', function(){
                var arr = [];
                for(var length in data.length){
                    var datas = data.length[length].is;
                    datas.forEach(function(item){
                        var obj = {};
                        obj[length] = item;   
                        arr.push(obj);
                    });
                }
                arr.forEach(function(item){  
                    var obj = {};
                    for(var r in rule.length){
                        if(r === Object.keys(item)[0]){
                            obj[r] = rule.length[r];
                        }
                    }
                    var rules = validator.field(obj);  
                    rules.verify(item)
                        .then(function(res){ 
                            res.should.have.property('ret').which.equal(0);                            
                        }).catch(function(err){      
                            should.not.exist(err);
                        });
                    var result = rules.verifySync(item);
                    result.should.have.property('ret').which.equal(0); 
                });
            });
            it('should not pass length', function(){
                var arr = [];
                for(var length in data.length){
                    var datas = data.length[length].not;
                    datas.forEach(function(item){
                        var obj = {};
                        obj[length] = item;   
                        arr.push(obj);
                    });
                }
                arr.forEach(function(item){  
                    var obj = {};
                    for(var r in rule.length){
                        if(r === Object.keys(item)[0]){
                            obj[r] = rule.length[r];
                        }
                    }
                    var rules = validator.field(obj);  
                    rules.verify(item)
                        .then(function(res){ 
                            should.not.exist(res);                                                        
                        }).catch(function(err){      
                            err.should.have.property('ret').which.equal(-1003);
                        });
                    var result = rules.verifySync(item);
                    result.should.have.property('ret').which.equal(-1003);
                });
            });
        });
        describe('optional', function(){
            it('should pass optional', function(){
                var datas = data.optional.is,
                    objs = rule.optional.is;
                for(var obj in objs){
                    var a = {};
                    a[obj] = objs[obj];
                    var rules = validator.field(a); 
                    rules.verify(datas)         
                        .then(function(res){ 
                            res.should.have.property('ret').which.equal(0);                                                                                   
                        }).catch(function(err){     
                            should.not.exist(err); 
                        });
                    var result = rules.verifySync(datas);
                    result.should.have.property('ret').which.equal(0); 
                }
            });
            it('should not pass optional', function(){
                var datas = data.optional.not,
                    objs = rule.optional.not;
                for(var obj in objs){
                    var a = {};
                    a[obj] = objs[obj];
                    var rules = validator.field(a); 
                    rules.verify(datas)
                        .then(function(res){  
                            should.not.exist(res);                                                                                                                
                        }).catch(function(err){     
                            err.should.have.property('ret').which.equal(-1001);
                        });
                    var result = rules.verifySync(datas);
                    result.should.have.property('ret').which.equal(-1001);
                }
            });
        });
    });
    describe('.compare', function(){
        //compare pass
        it('should pass compare', function(){
            var datas = data.compare.is[0];
            var compare = rule.compare;
            var rules = validator.compare(compare);
            rules.verify(datas)
                .then(function(res){
                    res.should.have.property('ret').which.equal(0);
                }).catch(function(err){
                    should.not.exist(err);
                });
            var result = rules.verifySync(datas);
            result.should.have.property('ret').which.equal(0);
        });
        //not pass
        it('should not pass compare', function(){
            var datas = data.compare.not[0];
            var compare = rule.compare;
            var rules = validator.compare(compare);
            rules.verify(datas)
                .then(function(res){
                    should.not.exist(res);
                }).catch(function(err){                   
                    err.should.have.property('ret').which.equal(-1004);
                });
            var result = rules.verifySync(datas);
            result.should.have.property('ret').which.equal(-1004);
        });
    });
    describe('.extend', function(){
        //extend pass
        it('should pass type.extend', function(){
            var datas = data.extend.is;
            datas.forEach(function(item){
                let extend = validator.types.extend(item.name, item.rule).extend('another', item.rule);
                should.exist(extend);
                var rules = validator.field({
                    data1:{
                        type : extend.types[item.name],
                        message : '扩展类型错误'
                    }
                });
                rules.verify({data1 : '123456'})
                    .then(function(res){  
                        res.should.have.property('ret').which.equal(0);                                                                                                                                
                    }).catch(function(err){    
                        should.not.exist(err);   
                    });
                var result = rules.verifySync({data1 : '123456'});
                result.should.have.property('ret').which.equal(0);
            });                       
        });
        //extend fail
        it('should not pass type.extend', function(){
            var datas = data.extend.not;
            datas.forEach(function(item){
                let res = validator.types.extend(item.name, item.rule);
                should.not.exist(res);
            });
        });
    });
    
});
describe('types', function(){
    describe('.and', function(){
        it('should pass type.and', function(){
            var datas = data.merge.is,
                rules = rule.and;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});  
                v.verify({test : item})
                    .then(function(res){
                        res.should.have.property('ret').which.equal(0);
                    }).catch(function(err){
                        should.not.exist(err);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(0);
            });
        });
        it('should not pass type.and', function(){
            var datas = data.merge.not,
                rules = rule.and;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});  
                v.verify({test : item})
                    .then(function(res){
                        should.not.exist(res);
                    }).catch(function(err){
                        err.should.have.property('ret').which.equal(-1002);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(-1002);
            });
        });
    });
    describe('.not', function(){
        it('should pass type.not', function(){
            var datas = data.merge.not,
                rules = rule.not;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});  
                v.verify({test : item})
                    .then(function(res){
                        res.should.have.property('ret').which.equal(0);
                    }).catch(function(err){  
                        should.not.exist(err);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(0);
            });
        });
        it('should not pass type.not', function(){
            var datas = data.merge.is,
                rules = rule.not;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});  
                v.verify({test : item})
                    .then(function(res){
                        should.not.exist(res);
                    }).catch(function(err){
                        err.should.have.property('ret').which.equal(-1002);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(-1002);
            });
        });
    });
    describe('.or', function(){
        it('should pass type.or', function(){
            var datas = data.merge.is,
                rules = rule.or;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});  
                v.verify({test : item})
                    .then(function(res){
                        res.should.have.property('ret').which.equal(0);
                    }).catch(function(err){
                        should.not.exist(err);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(0);
            });
        });
        it('should not pass type.or', function(){
            var datas = data.merge.not,
                rules = rule.or;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});  
                v.verify({test : item})
                    .then(function(res){   
                        should.not.exist(res);
                    }).catch(function(err){
                        err.should.have.property('ret').which.equal(-1002);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(-1002);
            });
        });         
    });
    describe('.datetime', function(){
        it('should pass datetime', function(){
            var datas = data.datetime.is,
                rules = rule.datetime;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});
                v.verify({test : item})
                    .then(function(res){
                        res.should.have.property('ret').which.equal(0);              
                    }).catch(function(err){        
                        should.not.exist(err);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(0); 
            });
        });      
        it('should not pass datetime', function(){
            var datas = data.datetime.not,
                rules = rule.datetime;
            datas.forEach(function(item, index){
                var v = validator.field({test : rules[index]});
                v.verify({test : item})
                    .then(function(res){ 
                        should.not.exist(res);                        
                    }).catch(function(err){
                        err.should.have.property('ret').which.equal(-1002);
                    });
                var result = v.verifySync({test : item});
                result.should.have.property('ret').which.equal(-1002);
            });
        });
    });
});
describe('rule check', function(){      
    it('should not pass message check', function(){
        var data = {uin : '3563456'}; 
        (function(){
            var v = validator.field({
                uin : {type : validator.types.QQ}
            });
        }).should.throws('未配置全局message')
    });
    it('should not pass rule check', function(){
        var data = {uin : '3563456'}; 
        (function(){
            var v = validator.field({
                uin : {optional : false}
            });
        }).should.throws('type和length规则至少配置一个')
    });
});
