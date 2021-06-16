export default {
    SET_MODAL(state, payload) {
        state.modal[payload.modal] = payload.display
    },

    SET_NOTIFICATIONS(state, payload) {
        state.notifications.push(payload)
    }
}
