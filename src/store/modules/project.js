import model from 'api/project'

// 初始状态，组件之间的共享数据
const state = {
    projects: []
}

const mutations = {
    add(state,project) {
        state.projects.push(project)
    },
    all(state,projects) {
        state.projects = projects;
    }
}

const actions = {
    async addProject({ commit }, project) {
        try {
            console.log(project);
            let res = await model.insert(project);
            commit('add',res.data);
        } catch(e) {
            throw e;
        }
    },
    async allProjects({ commit }) {
        try {
            let projects = await model.getByPageNum();
            commit('all',projects);
        } catch(e) {
            throw e;
        }
    }
}

const getters = {
    projects(state,getters,rootState) {
        return state.projects;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}