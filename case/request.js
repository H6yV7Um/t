const request = require('request');

/**
 * config
 */
const url = 'http://www.qq.com?debug=1'
const opts = {
    method  : `GET`,
    cookie  : {
       
    },
    proxy : {
       
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
    let res = {
        url : url,
        method : opts.method,
        headers : {
            "cookie" : stringify(opts.cookie,';'),
            "user-agent" : getAgent(opts.userAgent),
        }
    }
    if ( opts.proxy ) {
        res.proxy = `http://${opts.proxy.host}:${opts.proxy.port ? opts.proxy.port : '80'}`
    }
    return res;
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
                const statusCode = responese.statusCode;
                if ( statusCode == 200 ) {
                    resolve({
                        params : params,
                        time : time,
                        statusCode : statusCode,
                        body : body
                    });
                } else {
                    reject({
                        params : params,
                        time : time,
                        statusCode : statusCode,
                        body : body
                    })
                }
            }
        })
    });
}

run(url,opts)
    .then((res) => {
        console.log(`success`,res);
    }).catch((error) => {
        console.log(`error`,error);
    })