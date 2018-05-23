const request = require('request');

/**
 * config
 */
const url = 'http://www.qq.com?debug=1'
const opts = {
    method   : `GET`,
    cookies  : `uin=o02060293288`,
    useAgent : `Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D257 QQ/7.6.5.302 NetType/WIFI  Mem/28`,
    proxy : {
        host  : ``,
        point : 80
    }
}


function run(url,opts) {
    return new Promise((resolve,reject) => {
        request({
            url : url,
            method : opts.method,
            headers : {
                "cookie" : opts.cookies,
                "user-agent" : opts.useAgent
            }
        },(error,responese,body) => {
            console.log(error,body);
        })
    });
}

run(url,opts);