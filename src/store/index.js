import Vue from 'vue'
import Vuex from 'Vuex'
import projects from './modules/project'
import cases from './modules/case'
import tasks from './modules/task'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        projects,
        cases,
        tasks
    },
    strict: debug
})