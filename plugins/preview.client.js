export default ({query, enablePreview}) => {
    if(query.preview) {
        console.log("ENABLED PREVIEW MODE")
        enablePreview()
    }
}
