<template>
    <div
        class="scrollbar"
        ref="scrollbar"
    >
        <div ref="scrollbar-cursor" />
    </div>
</template>

<script>
export default {
    name: "Scrollbar",
    props: {
        container: {
            type: String,
            default: ""
        },
        color: {
            type: String,
            default: ""
        },
        update: {
            type: Number,
            default: 0
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {
        onEndedScroll(container) {
            if (container.clientHeight + container.scrollTop >= container.scrollHeight - 1) {
                this.$emit("on-ended-scroll")
            }
        },
        setScrollBar: function (container) {
            let draggable = false

            const scrollbarContainer = this.$refs["scrollbar"]
            const cursorContainer    = this.$refs["scrollbar-cursor"]

            const boxScrollSize = container.scrollHeight
            const boxSize       = container.clientHeight - 10
            const scrollbarSize = scrollbarContainer.clientHeight - 10
            const cursorSize    = (boxSize / boxScrollSize) * 100

            cursorContainer.style.height = cursorSize + "%"
            cursorContainer.style.backgroundColor = this.color

            container.addEventListener("scroll", () => {
                const scroll = scrollbarSize * (container.scrollTop / boxScrollSize);

                this.onEndedScroll(container)

                cursorContainer.style.transform = `translate(-50%, ${scroll}px)`
            })

            scrollbarContainer.addEventListener("mousedown", (e) => {
                draggable = true
                container.scrollTop = boxScrollSize * (e.offsetY / scrollbarSize)
            })
            scrollbarContainer.addEventListener("mouseup", () => {
                draggable = false
            })

            scrollbarContainer.addEventListener("mousemove", e => {
                draggable && (container.scrollTop = boxScrollSize * (e.offsetY / scrollbarSize))
            })
        },
    },
    watch: {
        update: function() {
            this.setScrollBar(this.$parent.$refs[this.container])
        }
    },
    mounted() {
        this.setScrollBar(this.$parent.$refs[this.container])
    }
}
</script>

<style lang="scss">
.scrollbar {
    position: relative;

    height: 100%;
    width: 20px;

    box-shadow: inset 0 0 20px -10px rgba($black,0.25);

    div {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);

        width: calc(100% - 10px);

        margin: 5px 0;

        border-radius: 100px;

        pointer-events: none;

        &:hover {cursor: pointer}
    }
}
</style>
