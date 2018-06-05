module.exports.error = function(error) {
    writeLogger('ERROR',error);
}

module.exports.debug = function(msg) {
    writeLogger('DEBUG',`${ typeof msg == 'object' ? JSON.stringify(msg) : msg }`)
}

function writeLogger(level,msg) {
    if ( msg instanceof Error && msg.stack ) {
        let error = msg;
        let arr = [];
        for ( let i in error ) {
            arr.push(`${i}:${error[i]}`);
        }
        arr.push(`stack:${error.stack}`);
        arr.push(`message:${error.message}`);
        msg = `[${arr.join('|')}]`;
    }
    console.info(`logger.js |${level}|${msg}`);
}