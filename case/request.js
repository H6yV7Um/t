const request = require('request');

/**
 * config
 */
const url = 'http://www.qq.com'
const opts = {
    method   : `GET`,
    cookies  : {
      
    },
    proxy : {
        host  : ``,
        point : 80
    }
}

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

function formatParams(url,opts) {
    return {
        url : url,
        method : opts.method,
        headers : {
            "cookie" : stringify(opts.cookies,';'),
            "user-agent" : getUseAgent(opts.useAgent)
        }
    }
}


function run(url,opts) {
    return new Promise((resolve,reject) => {
        let params = formatParams(url,opts);
        request(params,(error,responese,body) => {
            if ( error ) {
                reject(error);
            } else {
                console.log(responese);
            }
            
        })
    });
}

run(url,opts);