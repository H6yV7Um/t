import model from 'api/project'

// 初始状态，组件之间的共享数据
const state = {
    projects: [],
    total: 0
}

const mutations = {
    add(state,project) {
        state.projects.push(project)
    },
    page(state,{total,list}) {
        state.projects = list;
        state.total = total;
    }
}

const actions = {
    async addProject({ commit }, project) {
        try {
            let res = await model.insert(project);
            commit('add',res.data);
        } catch(e) {
            throw e;
        }
    },
    async getProjectsByPage({ commit }, pagenum) {
        try {
            let data = await model.getByPageNum();
            commit('page',data);
        } catch(e) {
            throw e;
        }
    },
    async getProject({ commit }, id) {
        try {
            let data = await model.getOneById(id);
            return data;
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