import {IValidator, IField, ICompareInnerRule, IFieldRule, IResult, IResultData} from './interface';
import {Field} from './field';
import {Compare} from './compare';
import {type} from './types';


export class Validator extends type implements IValidator{

    private fieldRule : IField | null = null;
    private compareRule : Array<ICompareInnerRule> | null = null;
    private data : {[key : string] : any} = {};

    static types = type;    
    static SUCCESS = 0;
    static errCode = {
        ERR_NOT_EXIST : -1001,
        ERR_TYPEERR : -1002,
        ERR_LENGTHERR : -1003,
        ERR_COMPAREERR : -1004
    };

    static field(rule : IField) : IValidator {
        const f = new Validator();
        return f.field(rule);
    }

    static output(resNum : number, data?: IResultData) : IResult{  
        if(data && resNum!=0){  
            return {
                ret : resNum,
                result : {
                    dataName : data.dataName,
                    value : data.value,
                    ruleName : data.ruleName,
                    errMsg : data.errMsg
                }
            }
        }else{
            return {ret : Validator.SUCCESS};
        }
    }

    static compare(rule : Array<ICompareInnerRule>) : IValidator{
        const c = new Validator();
        return c.compare(rule);
    }

    field(this : Validator, rule : IField) : IValidator{
        this.checkFieldRule(rule);
        this.fieldRule = rule;
        return this;
    }

    compare(this : Validator, rule : Array<ICompareInnerRule>) : IValidator{
        this.checkCompareRule(rule);
        this.compareRule = rule;
        return this; 
    }

    verify(data : {[key : string] : any}) : Promise<IResult>{  
        return new Promise((resolve, reject) => {
            this.data = data;        
            if(this.fieldRule != null){  
                const field = new Field(data);            
                for(let key in this.fieldRule){
                    let res = field.verify(key, this.fieldRule[key]);
                    if(res.ret != Validator.SUCCESS){
                        reject(res);
                    }
                }
            }
            if(this.compareRule != null){
                const compare = new Compare(data);
                for(let key in this.compareRule){
                    let res = compare.verify(this.compareRule[key]);
                    if(res.ret != Validator.SUCCESS){
                        reject(res);
                    }
                }
            }
            resolve({ret : Validator.SUCCESS});
        });
    }

    verifySync(data : {[key : string] : any}) : IResult{
        this.data = data;
        if(this.fieldRule != null){  
            const field = new Field(data);            
            for(let key in this.fieldRule){
                let res = field.verify(key, this.fieldRule[key]);
                if(res.ret != Validator.SUCCESS){
                    return res;
                }
            }
        }
        if(this.compareRule != null){
            const compare = new Compare(data);
            for(let key in this.compareRule){
                let res = compare.verify(this.compareRule[key]);
                if(res.ret != Validator.SUCCESS){
                    return res;
                }
            }
        }
        return {ret : Validator.SUCCESS};
    }

    verifyAll(data : {[key : string] : any}) : Array<IResult> | IResult{
        this.data = data;
        let result = [],
            pass = true;
        if(this.fieldRule != null){
            const field = new Field(data);            
            for(let key in this.fieldRule){
                let res = field.verify(key, this.fieldRule[key]);
                result.push(res);
                if(res.ret != Validator.SUCCESS){
                    pass = false;
                }
            }
        }
        if(this.compareRule != null){
            const compare = new Compare(data);
            for(let key in this.compareRule){
                let res = compare.verify(this.compareRule[key]);
                result.push(res);
                if(res.ret != Validator.SUCCESS){
                    pass = false;
                }
            }
        }
        return pass ? {ret : 0} : result;
    }

    private checkFieldRule(rules : IField) : void{
        for(let i in rules){
            if(!rules[i].hasOwnProperty('type') && !rules[i].hasOwnProperty('length')){
                throw Error('type和length规则至少配置一个');
            }
            this.checkMessage(rules[i]);
        }
    }

    private checkCompareRule(rules : Array<ICompareInnerRule>) : void{
        rules.forEach((item) => {
            this.checkMessage(item);
        });
    }

    private checkMessage(rule : IFieldRule | ICompareInnerRule) : void{
        if(!rule.hasOwnProperty('message')){
            throw Error('未配置全局message');
        }
    }
}







