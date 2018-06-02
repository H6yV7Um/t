import {IFieldRule, IResult, IRegexp, IFieldVerify, ITypeInnerRuleArr, IRuleName} from './interface';
import {type, Datetime} from './types';
import {Compare} from './compare';
import {Validator} from './validator';

export class Field implements IFieldVerify{
    data : {[key : string] : any};
    private compare : any;

    constructor(data : {[key : string] : any}){
        this.data = data;
        this.compare = new Compare(data);
    }

    verify(key : string, field : IFieldRule) : IResult{
        let res = this.verifyOpt(key, field);
        if(res.ret != Validator.SUCCESS){
            return res;
        }
        if(this.exist(key)){
            res = this.verifyType(key, field);
            if(res.ret != Validator.SUCCESS){
                return res;
            }
            res = this.verifyLength(key, field);
        }
        return res;
    }

    verifyType(key : string, field : IFieldRule) : IResult{  
        let typeRule = field.type;
        let ret; 
        if(!typeRule){
            return Validator.output(Validator.SUCCESS);
        }               
        if(typeof typeRule != 'object'){
            typeRule = {
                rule : [typeRule],
                message : field.message
            };
        }   
        if(!typeRule.message){
            typeRule.message = field.message;
        }
        if(typeof typeRule.rule != 'object'){
            typeRule.rule = [typeRule.rule];
        } 
        if(Array.isArray(typeRule.rule)){
            ret = this._verifyTypesArr(key, {
                rule : typeRule.rule, 
                sign : typeRule.sign
            });
        }else{
            ret = this._verifyTypesArr(key, typeRule.rule);
        }
        let data = {
            dataName : key,
            value : String(this.data[key]),
            ruleName : IRuleName.TYPE,
            errMsg : typeRule.message
        };
        return Validator.output(ret, data);
    }

    verifyLength(key : string, field : IFieldRule) : IResult{
        let lengthRule = field.length;        
        if(!lengthRule){
            return Validator.output(Validator.SUCCESS);
        }  
        if(typeof lengthRule === 'string'){
            lengthRule = {
                rule : lengthRule,
                message : field.message
            }
        }
        let idx = this.compare.getType(lengthRule.rule); 
        let arr = this.compare.getData(idx, lengthRule.rule);
        let res = false; 
        let ret;    
        if(arr.length == 1){
            arr.unshift(this.data[key].length);      
            res = this.compare.compare(idx.type, arr);
        }else{
            let data1 = [arr[0], this.data[key].length],
                data2 = [this.data[key].length, arr[1]];  
            res = this.compare.compare(2, data1) && this.compare.compare(2, data2);
        }
        let data = {
            dataName : key,
            value : String(this.data[key]),
            ruleName : IRuleName.LENGTH,
            errMsg : lengthRule.message
        };
        if(!res){
            ret = Validator.errCode.ERR_LENGTHERR;
        }else{
            ret = Validator.SUCCESS;
        }
        return Validator.output(ret, data);
    }

    _verifyTypesArr(key : string, typeRule : ITypeInnerRuleArr) : number{
        let ret;
        let sign = typeRule.sign;
        if(sign && sign === 'or'){
            ret = this._verifyOr(key, typeRule.rule);
        }else if(sign && sign === 'not'){
            ret = this._verifyNot(key, typeRule.rule);
        }else if(sign && sign === 'datetime'){
            ret = this._verifyDate(key, typeRule.rule);
        }else{
            ret = this._verifyAnd(key, typeRule.rule);
        }
        return ret ? Validator.SUCCESS : Validator.errCode.ERR_TYPEERR;
    }

    _verifyAnd(key : string, rules : Array<string>) : boolean{
        let res = true;
        rules.forEach((rule) => {
            let ret = this._verifyType(this.data[key], rule);
            if(!ret){
                res = false;
            }
        });
        return res;
    }

    _verifyOr(key : string, rules : Array<string>) : boolean{
        let res = false;
        rules.forEach((rule) => {
            let ret = this._verifyType(this.data[key], rule);
            if(ret){
                res = true;
            }                
        });
        return res;
    }

    _verifyDate(key : string, rules : Array<string>) : boolean{
        return Datetime.isValid(rules[0], this.data[key]);
    }

    _verifyNot(key : string, rules : Array<string>) : boolean{
        let res = true;
        rules.forEach((rule) => {
            let ret = this._verifyType(this.data[key], rule);  
            if(ret){
                res = false;
            }
        });
        return res;
    }

    _verifyType(val : string, rule : any) : boolean{  
        return rule(val);
    }

    private verifyOpt(key : string, field : IFieldRule) : IResult{
        let optionalRule = field.optional || false;
        let ret;
        if(typeof optionalRule === 'boolean'){
            optionalRule = {
                rule : optionalRule,
                message : field.message
            }
        }  
        let data = {
            dataName : key,
            value : null,
            ruleName : IRuleName.OPTIONAL,
            errMsg : optionalRule.message
        };  
        if(!optionalRule.rule && !this.exist(key)){
            ret = Validator.errCode.ERR_NOT_EXIST;
        }else{
            ret = Validator.SUCCESS;
        } 
        return Validator.output(ret, data);
    }

    private exist(key : string) : boolean{
        let data = this.data;
        return (data!=null) && data.hasOwnProperty(key) ? true : false;
    }
}

