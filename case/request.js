const request = require('request');

/**
 * config
 */
<<<<<<< HEAD
const url = 'http://www.qq.com'
const opts = {
    method   : `GET`,
    cookies  : {
      
=======
const url = 'https://h5.qianbao.qq.com/jifen?debug=1'
const opts = {
    method  : `GET`,
    cookie  : {
       
>>>>>>> 528f7a3f3e65c71d68cd8f448f4b90e457fdab22
    },
    proxy : {
        host  : `127.0.0.1`,
        point : 80
    }
}

<<<<<<< HEAD
/**
 * sys config
 */
const USERAGENT = {
    'normal' : `Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D257 QQ/7.6.5.302 NetType/WIFI  Mem/28`
}


function stringify(object,split) {
    let arr = [];
    for ( let i in object ) {
        arr.push(`${i}=${object[i]}`);
    }
    return arr.join(split)
}


function getUseAgent(key) {
    return key && USERAGENT[key] ? USERAGENT[key] : USERAGENT.normal
}

=======
/** 
 * sys config
 */
const USER_AGENT = {
    "normal" : `Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D257 QQ/7.6.5.302 NetType/WIFI  Mem/28`
}

function stringify(obj,split) {
    let arr = [];
    for( let i in obj ) {
        arr.push(`${i}=${obj[i]}`);
    }
    return arr.join(split);
}


function getAgent(name) {
    return name && USER_AGENT[name] ? USER_AGENT[name] : USER_AGENT.normal;
}


>>>>>>> 528f7a3f3e65c71d68cd8f448f4b90e457fdab22
function formatParams(url,opts) {
    return {
        url : url,
        method : opts.method,
        headers : {
<<<<<<< HEAD
            "cookie" : stringify(opts.cookies,';'),
            "user-agent" : getUseAgent(opts.useAgent)
=======
            "cookie" : stringify(opts.cookie,';'),
            "user-agent" : getAgent(opts.userAgent)
>>>>>>> 528f7a3f3e65c71d68cd8f448f4b90e457fdab22
        }
    }
}


function run(url,opts) {
    return new Promise((resolve,reject) => {
<<<<<<< HEAD
        let params = formatParams(url,opts);
        request(params,(error,responese,body) => {
            if ( error ) {
                reject(error);
            } else {
                console.log(responese);
            }
            
=======
        const params = formatParams(url,opts);
        const st = Date.now();
        request(params,(error,responese,body) => {
            const et = Date.now();
            const time = (et-st)/1000;
            if ( error ) {
                reject({
                    params : params,
                    time  : time,
                    error : error
                });
            } else {
                const headers = responese.headers;
                const statusCode = respone.statusCode;
                if ( statusCode == 200 ) {
                    resolve({
                        params : params,
                        time : time,
                        statusCode : statusCode
                    });
                } else {
                    reject({
                        params : params,
                        time : time,
                        statusCode : statusCode
                    })
                }
            }
>>>>>>> 528f7a3f3e65c71d68cd8f448f4b90e457fdab22
        })
    });
}

run(url,opts)
    .then((res) => {
        
    }).catch((res) => {

    })