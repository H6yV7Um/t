import model from 'api/task'

const state = {
    tasks: [],
    total: 0
}

const mutations = {
    page(state,{total,list}) {
        state.tasks = list;
        state.total = total;
    }
}

const actions = {
    async getTasksByPid({ commit }, pid) {
        try {
            let list = await model.getByFields({pid:pid})
            commit('page',list)
        } catch(e) {
            throw e;
        }
    }
}

const getters = {
    tasks(state,getters,rootState) {
        return state.tasks;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}