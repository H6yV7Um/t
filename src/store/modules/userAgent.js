import model from 'api/userAgent'

const state = {
    userAgents: null,
    total: 0
}

const mutations = {
    userAgents(state,data) {
        state.userAgents = data.list
        state.total = data.total
    },
    add(state,data) {
        state.userAgents.unshift(data)
        state.total += 1
    }
}

const actions = {
    async getAllUserAgents({commit}) {
        try {
            const res = await model.getList({
                page: {
                    index: 0,
                    count: 9999
                },
                orderBy: {
                    field: `id`,
                    desc: true
                }
            });
            commit('userAgents',res)
        } catch(e) {
            throw e
        } 
    },
    async addUserAgent({commit},data) {
        try {
            const res = await model.insert(data)
            data.id = res
            commit('add',data);
        } catch(e) {
            throw e
        }
    }
}

const getters = {
    userAgents(state) {
        return state.userAgents
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}