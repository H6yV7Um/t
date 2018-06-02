import { IFieldRule, IResult, IFieldVerify, ITypeInnerRuleArr } from './interface';
export declare class Field implements IFieldVerify {
    data: {
        [key: string]: any;
    };
    private compare;
    constructor(data: {
        [key: string]: any;
    });
    verify(key: string, field: IFieldRule): IResult;
    verifyType(key: string, field: IFieldRule): IResult;
    verifyLength(key: string, field: IFieldRule): IResult;
    _verifyTypesArr(key: string, typeRule: ITypeInnerRuleArr): number;
    _verifyAnd(key: string, rules: Array<string>): boolean;
    _verifyOr(key: string, rules: Array<string>): boolean;
    _verifyDate(key: string, rules: Array<string>): boolean;
    _verifyNot(key: string, rules: Array<string>): boolean;
    _verifyType(val: string, rule: any): boolean;
    private verifyOpt(key, field);
    private exist(key);
}
