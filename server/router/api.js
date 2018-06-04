const router = require('koa-router')()
const projectCtrl = require('../controller/project')
const taskCtrl = require('../controller/task')
const caseCtrl = require('../controller/case')

const routers = router
    // project
    .get('/project/:id',projectCtrl.getOne)
    .get('/projects',projectCtrl.getList)
    .post('/project',projectCtrl.insert)
    .put('/project',projectCtrl.modify)
    .delete('/project',projectCtrl.remove)
    // task
    .get('/task/:id',taskCtrl.getOne)
    .get('/tasks',taskCtrl.getList)
    // case
    .get('/case/:id',caseCtrl.getOne)
    .get('/cases',caseCtrl.getList)

module.exports = routers;