// 初始化的状态
import model from 'api/task'

const state = {
    cases: [],
    total: 0
}

const mutations = {
    page(state,{total,list}) {
        state.cases = list;
        state.total = total;
    }
}

const actions = {
    async getCasesByPid({ commit }, pid) {
        try {
            let res = await model.getList({
                where: {
                    rules: {pid:pid}
                }
            })
            return res;
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