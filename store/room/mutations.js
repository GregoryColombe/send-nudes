export default {
    SET_MODAL(state, payload) {
        state.modal[payload.modal] = payload.display
    },
    SET_PASSWORD(state, payload) {
        state.password.splice(payload.index, 1, payload.value)
    }
}
