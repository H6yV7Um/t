import { IExtendFunc, IExtendType, IExtend } from './interface';
export declare class type {
    static QQ: typeof type.qq;
    static ZH: typeof type.zh;
    static EN: typeof type.en;
    static NUMBER: typeof type.number;
    static POSITIVE: typeof type.positive;
    static NEGATIVE: typeof type.negative;
    static INT: typeof type.int;
    static NUMERIC: typeof type.numeric;
    static EMAIL: typeof type.email;
    static LOWERCASE: typeof type.lowercase;
    static UPPERCASE: typeof type.uppercase;
    static URL: typeof type.url;
    static JSON: typeof type.json;
    static LEGAL_INPUT: typeof type.legal_input;
    static MOBILEPHONE_ZHCN: typeof type.mobile;
    static UNIXTIMESTAMP: typeof type.unix_timestamp;
    static TIMESTAMP: typeof type.timestamp;
    static HOST: typeof type.host;
    static IP: typeof type.ip;
    static IPv4: typeof type.Ipv4;
    static IPv6: typeof type.Ipv6;
    static BASE64: typeof type.base64;
    static qq(val: any): boolean;
    static zh(val: any): boolean;
    static en(val: any): boolean;
    static number(val: any): boolean;
    static positive(val: any): boolean;
    static negative(val: any): boolean;
    static int(val: any): boolean;
    static numeric(val: any): boolean;
    static email(val: any): boolean;
    static lowercase(val: any): boolean;
    static uppercase(val: any): boolean;
    static url(val: any): boolean;
    static json(val: any): boolean;
    static legal_input(val: any): boolean;
    static mobile(val: any): boolean;
    static unix_timestamp(val: any): boolean;
    static timestamp(val: any): boolean;
    static host(val: any): boolean;
    static ip(val: any): boolean;
    static Ipv4(val: any): boolean;
    static Ipv6(val: any): boolean;
    static base64(val: any): boolean;
    static and(rules: Array<string>): {
        rule: Array<string>;
        sign: string;
    };
    static or(rules: Array<string>): {
        rule: Array<string>;
        sign: string;
    };
    static not(rules: Array<string> | string): {
        rule: Array<string> | string;
        sign: string;
    };
    static extend(name: string, cb: RegExp | IExtendFunc): IExtend | null;
    static datetime(rule: string, val?: string): boolean | {
        rule: string;
        sign: string;
    };
}
export declare class ExtendTypes implements IExtend {
    types: IExtendType;
    private toFunc(regexp);
    private isConflict(key);
    private toUpperCase(key);
    add(key: string, rule: RegExp | IExtendFunc): IExtend | null;
    extend(name: string, cb: RegExp | IExtendFunc): IExtend | null;
}
export declare class Datetime {
    static isValid(rule: string, val: string): boolean;
    isValid(rule: string, val: string): boolean;
    private validate(arr);
    private parseDate(dateArr, ruleArr);
    private vFormate(dateArr, ruleArr);
    private isNumber(list);
    private validateMM(month);
    private validateDD(year, month, day);
    private validateHh(hour, type);
    private validateMS(val);
    private isLeapYear(year);
    private toInt(arr);
}
