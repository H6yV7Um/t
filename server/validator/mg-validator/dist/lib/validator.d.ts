import { IValidator, IField, ICompareInnerRule, IResult, IResultData } from './interface';
import { type } from './types';
export declare class Validator extends type implements IValidator {
    private fieldRule;
    private compareRule;
    private data;
    static types: typeof type;
    static SUCCESS: number;
    static errCode: {
        ERR_NOT_EXIST: number;
        ERR_TYPEERR: number;
        ERR_LENGTHERR: number;
        ERR_COMPAREERR: number;
    };
    static field(rule: IField): IValidator;
    static output(resNum: number, data?: IResultData): IResult;
    static compare(rule: Array<ICompareInnerRule>): IValidator;
    field(this: Validator, rule: IField): IValidator;
    compare(this: Validator, rule: Array<ICompareInnerRule>): IValidator;
    verify(data: {
        [key: string]: any;
    }): Promise<IResult>;
    verifySync(data: {
        [key: string]: any;
    }): IResult;
    verifyAll(data: {
        [key: string]: any;
    }): Array<IResult> | IResult;
    private checkFieldRule(rules);
    private checkCompareRule(rules);
    private checkMessage(rule);
}
