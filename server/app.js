const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaJson = require('koa-json')
const koaCors = require('koa-cors')
const path = require('path')
const config = require('./config/server')
const routers = require('./router')

const app = new Koa()

// 支持cors
app.use(koaCors({
    credentials: true
}))

// 支持json返回
app.use(koaJson())

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 静态文件
app.use(koaStatic(
    path.join(__dirname,'./../static')
))

app.use(routers.routes()).use(routers.allowedMethods())

app.listen( config.port );
console.log(`Your server is running: http://localhost:${config.port}`)