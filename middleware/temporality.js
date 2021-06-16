export default ({ app, store }) => {
    const temporality = app.$cookies.get("temporality")
    temporality && store.commit("SET_TEMPORALITY", parseInt(temporality))
}
