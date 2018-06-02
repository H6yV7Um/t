export interface IValidator{
    field(rule : IField) : IValidator,
    compare(rule : Array<ICompareInnerRule>) : IValidator,
    verify(data : {[key : string] : any}) : Promise<IResult>,
    verifySync(data : {[key : string] : any}) : IResult,
    verifyAll(data : {[key : string] : any}) : Array<IResult> | IResult 
}

export interface IField{
    [key : string] : IFieldRule
}

export interface IMessage{
    message : string
}

export interface IBaseMessage{
    message?: string
}

export interface IFieldRule extends IBaseMessage{
    type?: string | ITypeInnerRule,
    length?: string | ILengthInnerRule,
    optional?: boolean | IOptionalInnerRule,   
}

export interface ITypeInnerRule extends IBaseMessage{
    rule : string | Array<string> | IRule,
    sign?: string     //and, or, not标识
}

export interface ITypeInnerRuleArr extends IBaseMessage{
    rule : Array<string>,
    sign?:string
}

export interface IRule{
    rule : Array<string>,
    sign : string,   //and, or, not标识
}

export interface ILengthInnerRule extends IBaseMessage{
    rule : string
}

export interface IOptionalInnerRule extends IBaseMessage{
    rule : boolean
}

export interface IResult{
    ret : number,
    result?: IResultData
}

export interface IResultData{
    dataName : string | Array<string>,
    value : string | null | Array<number>,
    ruleName : string,
    errMsg?: string
}


export interface ICompareInnerRule extends IBaseMessage{
    rule : string
}

export interface IRegexp{
    type : number,
    reg : RegExp,
    symbol : string
}

export interface IFieldVerify{
    verifyType(key : string, field : IFieldRule) : IResult,
    verifyLength(key : string, field : IFieldRule) : IResult
}

export interface ICompareVerify{
    verify(compareRule : ICompareInnerRule) : IResult,
    compare(type : number, data : Array<number>) : boolean
}

export interface ITypeFunc{
    (type : Array<string> | string) : void
}


export interface IExtendFunc{
    (val : any) : boolean
}

export interface IExtendType{
    [key : string] : IExtendFunc
}

export  interface IExtend{
    add(key : string, rule : RegExp | IExtendFunc) : IExtend | null,
}

export interface IDateTime{
    isValid(rule : string, val : string) : boolean
}

export enum IRuleName{
    TYPE = 'type', 
    LENGTH = 'length', 
    OPTIONAL = 'optional'
}

export enum ISymbol{
    TYPE1 = '>',
    TYPE2 = '<',
    TYPE3 = '>=',
    TYPE4 = '<=',
    TYPE5 = '=',
    TYPE6 = '~'
}




