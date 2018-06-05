const router = require('koa-router')()
const projectCtrl = require('../controller/project')
const taskCtrl = require('../controller/task')
const caseCtrl = require('../controller/case')
const useragentCtrl = require('../controller/useragent')
const testaccountCtrl = require('../controller/testaccount')

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
    // useragent
    .get('/useragent/:id',useragentCtrl.getOne)
    .get('/useragents',useragentCtrl.getList)
    .post('/useragent',useragentCtrl.insert)
    // testaccount
    .get('/testaccount/:id',testaccountCtrl.getOne)
    .get('/testaccounts',testaccountCtrl.getList)
    .post('/testaccount',testaccountCtrl.insert)

module.exports = routers;