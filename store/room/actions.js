export default {
    setModal({ commit }, payload = {modal: "", display: false}) {
        commit("SET_MODAL", payload)
    },
    setPassword({ commit, dispatch }, payload = {index: 0, value: ""}) {
        commit("SET_PASSWORD", payload)
        dispatch("setModal", {modal: "account", display: true})
    }
}
