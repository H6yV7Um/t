const router = require('koa-router')()
const projectCtrl = require('../controller/project')

const routers = router
    .get('/project/:id',projectCtrl.getOne)
    .get('/projects',projectCtrl.get)
    .post('/project',projectCtrl.insert)
    .put('/project',projectCtrl.modify)
    .delete('/project',projectCtrl.remove)

module.exports = routers;