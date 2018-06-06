import model from 'api/testAccount'

const state = {
    testAccounts: null,
    total: 0
}

const mutations = {
    testAccounts(state,data) {
        state.testAccounts = data.list
        state.total = data.total
    },
    addTestAccount(state,data) {
        state.testAccounts.unshift(data)
        state.total += 1
    }
}

const actions = {
    async getAllTestAccounts({commit}) {
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
            commit('testAccounts',res)
        } catch(e) {
            throw e
        } 
    },
    async addTestAccount({commit},data) {
        try {
            const res = await model.insert(data)
            data.id = res
            commit('addTestAccount',data);
        } catch(e) {
            throw e
        }
    },
    getSelected({commit,state},selectid) {
        console.log(state.testAccounts,selectid);
    }
}

const getters = {
    testAccounts(state) {
        return state.testAccounts
    },
    selected(state) {
        console.log('---->getters selected')
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}