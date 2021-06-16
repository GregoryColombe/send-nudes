export default ({ app, store }) => {
    const temporality = app.$cookies.get("temporality")
    temporality && store.commit("global/SET_TEMPORALITY_ACTIVE", parseInt(temporality))
}
