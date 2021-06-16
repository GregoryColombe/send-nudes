export default {
    data: () => ({
        scrollbar: 0
    }),
    methods: {
        setScrollbarSize() {
            this.$nextTick(() => {
                this.scrollbar = this.$refs.scrollbar.scrollHeight
            })
        }
    },
    mounted() {
        if(this.$refs.scrollbar) {
            this.setScrollbarSize()
            window.addEventListener("resize", this.setScrollbarSize)
        }
    },
    beforeDestroy() {
        if(this.$refs.scrollbar) {
            window.removeEventListener("resize", this.setScrollbarSize)
        }
    }
}
