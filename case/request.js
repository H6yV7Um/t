const request = require('request');

/**
 * config
 */
const url = 'https://h5.qianbao.qq.com/jifen?debug=1'
const opts = {
    method  : `GET`,
    cookie  : {
       
    },
    proxy : {
        host  : `127.0.0.1`,
        point : 80
    }
}

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


function formatParams(url,opts) {
    return {
        url : url,
        method : opts.method,
        headers : {
            "cookie" : stringify(opts.cookie,';'),
            "user-agent" : getAgent(opts.userAgent)
        }
    }
}


function run(url,opts) {
    return new Promise((resolve,reject) => {
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
        })
    });
}

run(url,opts)
    .then((res) => {
        
    }).catch((res) => {

    })