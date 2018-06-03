const router = require('koa-router')()
const projectCtrl = require('../controller/project')
const taskCtrl = require('../controller/task')

const routers = router
    // project
    .get('/project/:id',projectCtrl.getOne)
    .get('/projects',projectCtrl.getList)
    .post('/project',projectCtrl.insert)
    .put('/project',projectCtrl.modify)
    .delete('/project',projectCtrl.remove)
    // task
    .get('/tasks',taskCtrl.getList)

module.exports = routers;