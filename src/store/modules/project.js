import project from 'api/project'

// 初始状态，组件之间的共享数据
const state = {
    projects: []
}

const mutations = {
    addProject(state,project) {
        state.projects.push(project)
    }
}

const actions = {
    ADD_PROJECT({ commit, state }, project) {
        commit('addProject', project);
        console.log('action submit',project);
    }
}

const getters = {
    getProjects(state,getters,rootState) {
        return state.projects;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}