import Vue from 'vue'
import Vuex from 'Vuex'
import projects from './modules/project'
import cases from './modules/case'
import tasks from './modules/task'
import userAgent from './modules/userAgent'
import testAccount from './modules/testAccount'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        projects,
        cases,
        tasks,
        userAgent,
        testAccount
    },
    strict: debug
})