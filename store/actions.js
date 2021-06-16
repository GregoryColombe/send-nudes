export default {
    async nuxtServerInit({ dispatch, commit }) {
        if(this.$cookies.get("temporality")) {
            commit("SET_TEMPORALITY", this.$cookies.get("temporality"))
        }

        await dispatch("setTemporalities")
        await dispatch("setDatas")
        await dispatch("unlockPreviousTemporalities")
        await dispatch("temporalityIsVisited")
    },

    async setTemporalities({ commit }) {
        const resp  = await this.$temporalities.getDatas()
        const array = resp.map(
            x => ({
                id: x.id,
                name: x.name,
                blocked: true,
                visited: false
            })
        )
        const sort  = array.sort((a, b) => a.id - b.id)

        commit("GET_TEMPORALITIES", sort)
    },
    async setTemporality({ dispatch, commit }, id) {
        await commit("SET_TEMPORALITY", id)

        await dispatch("setDatas", id)
        await dispatch("unlockPreviousTemporalities")
    },
    async setDatas({ commit, state }, id) {
        const temporality = state.temporality || id
        const resp        = await this.$temporalities.getDatasById(temporality)

        commit("SET_DATAS", resp)
    },

    updateDatas({ commit }, payload = {key: null, value: null}) {
        commit("UPDATE_DATAS", payload)
    },

    unlockPreviousTemporalities({ commit, state }) {
        const filter = state.temporalities.filter(x => x.id <= state.temporality)

        filter.forEach((x, i) => {
            commit("SET_UNLOCK_TEMPORALITY", i)
            commit("SET_VISITED_TEMPORALITY", i)
        })
    },
    unlockNextTemporalities({ commit, state }) {
        const index = state.temporalities.findIndex(x => x.id === state.temporality)

        if(index + 1 < state.temporalities.length) {
            commit("SET_UNLOCK_TEMPORALITY", index + 1)

            this.$cookies.set("temporality", state.temporalities[index + 1].id)
        }
    },
    temporalityIsVisited({ commit, state }, id) {
        const index = state.temporalities.findIndex(x => x.id === (state.temporality || id))

        commit("SET_VISITED_TEMPORALITY", index)
    },

    setSound({ commit }, value) {
        commit("SET_SOUND", value)
    },

    setNotebookIsVisited({ commit}, value) {
        commit("SET_NOTEBOOK_IS_VISITED", value)
    },
    setOnFirstLoad({ commit }, value) {
        commit("SET_ON_FIRST_LOAD", value)
    }
}
