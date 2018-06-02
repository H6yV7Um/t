import {IExtendFunc, IExtendType, IExtend} from './interface';

export class type{
 
    static QQ = type.qq;
    static ZH = type.zh;
    static EN = type.en;
    static NUMBER = type.number; 
    static POSITIVE = type.positive; 
    static NEGATIVE = type.negative; 
    static INT = type.int; 
    static NUMERIC = type.numeric; 
    static EMAIL = type.email; 
    static LOWERCASE = type.lowercase; 
    static UPPERCASE = type.uppercase; 
    static URL = type.url; 
    static JSON = type.json; 
    static LEGAL_INPUT = type.legal_input; 
    static MOBILEPHONE_ZHCN = type.mobile; 
    static UNIXTIMESTAMP = type.unix_timestamp; 
    static TIMESTAMP = type.timestamp; 
    static HOST = type.host; 
    static IP = type.ip; 
    static IPv4 = type.Ipv4; 
    static IPv6 = type.Ipv6; 
    static BASE64 = type.base64;

    static qq(val : any) : boolean{
        let pass = false;
        if(typeof val === 'string' || typeof val === 'number'){
            let num = Number(val),
                str = String(val);
            pass = (/^\d{5,10}$/.test(str) && num >= 10001 && num <= 4294967295);
        }
        return pass;
    }

    static zh(val  :any) : boolean{
        return /^[\u4e00-\u9fa5]+$/.test(val);
    }

    static en(val : any) : boolean{
        return /^[a-zA-Z]+$/.test(val);
    }

    static number(val : any) : boolean{
        let value = Number(val);
        return ( typeof value === 'number' || Object.prototype.toString.call( value ) === '[object Number]' )&&/^[\d]+$/.test(val);
    }
    //正整数&正浮点数
    static positive(val : any) : boolean{
        let value = Number(val);
        let pass = value ? (/^[1-9]\d*$/.test(String(value))) || (/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(String(value))) : false;
        return pass;
    }
    //负整数&负浮点数
    static negative(val : any) : boolean{
        let pass = (/^-[1-9]\d*$/.test(val)) || (/^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/.test(val));
        return pass;
    }

    static int(val : any) : boolean{
        let value = Number(val);
        return value ? typeof value === 'number' && value%1 === 0 : false;
    }

    static numeric(val : any) : boolean{
        return /^[-+]?[0-9\.]+$/.test(val);
    }

    static email(val : any) : boolean{
        return /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/.test(val);
    }

    static lowercase(val : any) : boolean{
        return val === val.toLowerCase();
    }

    static uppercase(val : any) : boolean{
        return val === val.toUpperCase();
    }

    static url(val : any) : boolean{
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // 如果没有文件名，则不需要斜杠
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re=new RegExp(strRegex);
        return re.test(val) ? true : false;
    }

    static json(val : any) : boolean{
        if(typeof val != 'string'){
            return false;
        }
        try {
            const obj = JSON.parse(val);
            return !!obj && typeof obj === 'object';
        } catch (e) { /* ignore */ }
        return false;
    }

    static legal_input(val : any) : boolean{
        var pattern = /[`~!#$%^*+<>?:"{},.\/;'[\]]/im;        
        var isNotLegal = pattern.test(val);    
        return isNotLegal ? false : true;
    }

    static mobile(val : any) : boolean{
        return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(val);
    }

    static unix_timestamp(val : any) : boolean{
        let value = Number(val);
        let timestamp = /^\d{10}$/;
        return value ? typeof value === 'number' && timestamp.test(val) : false;
    }

    static timestamp(val : any) : boolean{
        let value = Number(val);
        let timestamp = /^\d{13}$/;
        return value ? typeof value === 'number' && timestamp.test(val) : false;
    }

    static host(val : any) : boolean{
        return /^\s*([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*)([^a-z0-9-]|$)\s*/.test(val);
    }

    static ip(val : any) : boolean{
        return type.Ipv4(val) || type.Ipv6(val);
    }

    static Ipv4(val : any) : boolean{
        return /^\s*((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\s*$/.test(val);
    }

    static Ipv6(val : any) : boolean{
        let reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
        return reg.test(val);
    }

    static base64(val : any) : boolean{
        let notBase64 = /[^A-Z0-9+\/=]/i;
        let len = val.length;
        if(!len || len%4!==0 || notBase64.test(val)) return false;
        let firstPaddingChar = val.indexOf('=');
        return firstPaddingChar===-1 || firstPaddingChar===len-1 || (firstPaddingChar === len - 2 && val[len - 1] === '=');
    }

    static and(rules : Array<string>) : {rule : Array<string>, sign : string}{    
        return {
            rule : rules,
            sign : 'and'
        };
    }

    static or(rules : Array<string>) : {rule : Array<string>, sign : string}{
        return {
            rule : rules,
            sign : 'or'
        };
    }

    static not(rules : Array<string> | string) : {rule : Array<string> | string, sign : string}{
        return {
            rule : rules,
            sign : 'not'
        };
    }

    static extend(name : string, cb : RegExp | IExtendFunc) : IExtend | null{
        const a = new ExtendTypes();
        return a.add(name, cb);
    }

    static datetime(rule : string, val? : string) : boolean | {rule : string, sign : string}{
        return val ? Datetime.isValid(rule, val) : {rule : rule, sign : 'datetime'};
    }

}

export class ExtendTypes implements IExtend{

    types : IExtendType = {};

    private toFunc(regexp : RegExp) : IExtendFunc{
        return function(val : string){
            return regexp.test(val);
        };
    }

    private isConflict(key : string) : boolean{
        let res = false;
        let _types = Object.keys(type);     
        _types.forEach((_type) => {
            if(_type === key || _type === this.toUpperCase(key)){ 
                res = true;
            }
            if(key === ('and' || 'or' || 'not')){
                res = true;
            }
        });
        return res;
    }

    private toUpperCase(key : string) : string{
        return key.toUpperCase();
    }

    add(key : string, rule : RegExp | IExtendFunc) : IExtend | null{
        let res = false;
        if( !rule || (typeof rule!='function'&&!(rule instanceof RegExp))) return null;
        if(!this.isConflict(key)){
            let cb = rule;
            if(typeof rule != 'function'){
                cb = this.toFunc(rule);
            }  
            if(typeof cb === 'function'){
                this.types[key] = cb;
            }            
            res = true;
        }  
        return res ? this : null;
    }

    extend(name : string, cb : RegExp | IExtendFunc) : IExtend | null{
        return this.add(name, cb);
    }
}

export class Datetime{

    static isValid(rule : string, val : string) : boolean{
        let v = new Datetime();
        return v.isValid(rule, val);
    }

    isValid(rule : string, val : string) : boolean{
        let splitDate = val.split(/[- :,.\/\\_|]/),
            splitRule = rule.split(/[- :,.\/\\_|]/);
        if( !this.isNumber(splitDate) || !this.vFormate(splitDate, splitRule) ){
            return false;
        }
        let resArr = this.parseDate(splitDate, splitRule);
        return this.validate(resArr);
    }

    private validate(arr : Array<boolean>) : boolean{
        let res = true;
        arr.forEach((item) => {
            if( !item ) res = false;
        });
        return res;
    }

    private parseDate(dateArr : Array<string>, ruleArr : Array<string>) : Array<boolean>{
        let res : Array<boolean>= [];
        let date = this.toInt(dateArr); 
        ruleArr.forEach((item, index) => {
            switch(item){
                case 'MM':
                    res.push(this.validateMM(date[index]));
                    break;
                case 'DD':
                    res.push(this.validateDD(date[index-2], date[index-1], date[index]));
                    break;
                case 'hh':
                    res.push(this.validateHh(date[index], 'hh'));
                    break;
                case 'mm':
                    res.push(this.validateMS(date[index]));
                    break;
                case 'ss':
                    res.push(this.validateMS(date[index]));
                    break;
            }
        });
        return res;
    }
    //校验格式、长度等
    private vFormate(dateArr : Array<string>, ruleArr : Array<string>) : boolean{
        let res = true;
        if(dateArr.length != ruleArr.length){
            res = false;
        }
        dateArr.forEach((item, index) => {
            if(item.length != ruleArr[index].length){
                res = false;
            }
        });          
        return res;
    }

    private isNumber(list : Array<string>) : boolean{
        let res = true;
        list.forEach((item) => { 
            //let val = Number(item);
            if( !type.number(item) ){
                res = false;
            }
        });   
        return res;
    }
    //校验月份
    private validateMM(month : number) : boolean{  
        return 1<=month && month<=12;
    }
    //校验日期
    private validateDD(year : number, month : number, day : number) : boolean{
        let res = true;
        if(day<1){  
            res = false;  
              
        //如果月份是1,3,5,7,8,10,12  
        }else if((month==1||month==3||month==5||month==7||month==8||month==10||month==12)&&day>31){  
            res = false;  
              
        //如果月份是4,6,9,11  
        }else if((month==4||month==6||month==9||month==11)&&day>30){  
            res = false;    
              
        //如果月份是2  
        }else if(month==2){  
            //如果为闰年  
            if((this.isLeapYear(year)&&day>29) || (!this.isLeapYear(year)&&day>28)){  
                res = false;  
            } 
        }      
        return res; 
    }
    //校验时
    private validateHh(hour : number, type : string) : boolean{
        let res = true;
        if(hour > 23){
            res = false;
        } 
        return res;
    }
    //校验分、秒
    private validateMS(val : number) : boolean{   
        return val <= 59;
    }
    
    //是否闰年
    private isLeapYear(year : number) : boolean{   
        return year%4==0&&(year%100!=0||year%400==0);
    }

    private toInt(arr : Array<string>) : Array<number>{
        let res : Array<number> = [];
        arr.forEach((item) => {
            res.push(Number(item))
        });
        return res;
    }
}