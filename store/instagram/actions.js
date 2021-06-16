export default {
    setModal({ commit }, payload = {modal: "messages", display: false}) {
        commit("SET_MODAL", payload)
    },
    setNotifications({ commit }, payload) {
        commit("SET_NOTIFICATIONS", payload)
    }
}
