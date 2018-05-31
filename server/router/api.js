const router = require('koa-router')()
const projectCtrl = require('../controller/project')

const routers = router
    .get('/project',projectCtrl.get)
    .post('/project',projectCtrl.insert)
    .put('/project',projectCtrl.modify)
    .delete('/project',projectCtrl.remove)

module.exports = routers;