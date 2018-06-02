import {ICompareInnerRule, IResult, IRegexp, ICompareVerify, ISymbol} from './interface';
import {Validator} from './validator';

export class Compare implements ICompareVerify{
    data : {[key : string] : any};
    //rule : ICompareInnerRule;

    constructor(data : {[key : string] : any}){
        this.data = data;
    }
    
    verify(compareRule : ICompareInnerRule) : IResult{
        let rule = compareRule.rule;
        let idx = this.getType(rule);
        if(!idx){
            throw Error('compare规则配置有误')
        }

        let key = rule.split(idx.symbol);
        let data = this.getArr(key);
        let res = {
            dataName : [key[0], key[1]],
            value : data,
            ruleName : rule,
            errMsg : compareRule.message
        };
        let ret = this.compare(idx.type, data) ? Validator.SUCCESS : Validator.errCode.ERR_COMPAREERR;
        return Validator.output(ret, res);
    }

    private getArr(key : Array<string>) : Array<number>{
        let res : Array<number>= [];
        key.forEach((item, index) => {
            let num = Number(item);
            num ? res.push(num) : res.push(this.data[key[index]]);
        });
        return res;
    }
    
    compare(type : number, data : Array<number>) : boolean{
        let pass = true;  
        switch(type){
            case 1 : 
                pass = data[0] > data[1];
                break;
            case 2 : 
                pass = data[0] < data[1];
                break;
            case 3 : 
                pass = data[0] >= data[1];
                break;
            case 4 : 
                pass = data[0] <= data[1];
                break;
            case 5 : 
                pass = data[0] == data[1];
                break;
        }
        return pass;
    }

    getType(rule : string) :  IRegexp | null{
        let temp;
        let regexp = [
            {type : 1, reg : /^(\w*)>(\w+)$/, symbol : ISymbol.TYPE1},
            {type : 2, reg : /^(\w*)<(\w+)$/, symbol : ISymbol.TYPE2},
            {type : 3, reg : /^(\w*)>=(\w+)$/, symbol : ISymbol.TYPE3},
            {type : 4, reg : /^(\w*)<=(\w+)$/, symbol : ISymbol.TYPE4},
            {type : 5, reg : /^(\w*)=(\w+)$/, symbol : ISymbol.TYPE5},
            {type : 6, reg : /^(\w+)~(\w+)$/, symbol : ISymbol.TYPE6}
        ];
        regexp.forEach((item) => {
            if(item.reg.test(rule)){
                temp = item;
            }
        });
        return temp || null;
    }

    getData(rule : IRegexp, input : string) : Array<number>{
        let symbol = rule.symbol,
            type = rule.type;
        let arr = input.split(symbol),
            res = this.toInt(arr);
        return type == 6 ? res : [res[1]];
    }

    private toInt(arr : Array<string>) : Array<number>{
        let res : Array<number> = [];
        arr.forEach((item) => {
            res.push(Number(item))
        });
        return res;
    }

}