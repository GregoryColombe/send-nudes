export default {
    GET_TEMPORALITIES(state, payload) {
        state.temporalities = payload
    },
    SET_TEMPORALITY(state, payload) {
        state.temporality = payload
    },
    SET_UNLOCK_TEMPORALITY(state, index) {
        state.temporalities[index].blocked = false
    },
    SET_VISITED_TEMPORALITY(state, index) {
        state.temporalities[index].visited = true
    },

    SET_DATAS(state, payload) {
        state.datas = payload
    },
    UPDATE_DATAS(state, payload){
        state.datas[payload.key] = payload.value
    },

    SET_SOUND(state, payload) {
        state.sound = payload
    },

    SET_NOTEBOOK_IS_VISITED(state, payload) {
        state.notebookIsVisited = payload
    },

    SET_ON_FIRST_LOAD(state, value) {
        state.onFirstLoad = value
    }
}
