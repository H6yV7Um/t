import { ICompareInnerRule, IResult, IRegexp, ICompareVerify } from './interface';
export declare class Compare implements ICompareVerify {
    data: {
        [key: string]: any;
    };
    constructor(data: {
        [key: string]: any;
    });
    verify(compareRule: ICompareInnerRule): IResult;
    private getArr(key);
    compare(type: number, data: Array<number>): boolean;
    getType(rule: string): IRegexp | null;
    getData(rule: IRegexp, input: string): Array<number>;
    private toInt(arr);
}
