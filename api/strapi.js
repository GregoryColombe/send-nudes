export default $axios => ressources => ({
    getDatas() {
        return $axios.$get(ressources)
    },

    getDatasById(id) {
        return $axios.$get(`${ressources}/${id}`)
    }
})
