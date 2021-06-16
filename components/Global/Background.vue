<template>
    <div
        class="background"
        ref="canvas"
    />
</template>

<script>
import Sprites from "~/class/backgroundSprites"

export default {
    props: {
        datas: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {
        setCanvas() {
            this.$nextTick(() => {
                const { canvas } = this.$refs
                const map = this.datas.sprites.map(item => ({
                    x: parseFloat(item.x),
                    y: parseFloat(item.y),
                    scale: parseFloat(item.scale),
                    speed: parseFloat(item.speed),
                    image: item.image.url,
                    json: item.json.url,
                }))

                this.sprites = new Sprites(
                    canvas,
                    this.datas.background.url,
                    map,
                    true)
            })
        }
    },
    watch: {},
    mounted() {
        this.setCanvas()
    },
    beforeDestroy() {
        this.sprites.destroy()
    }
}
</script>

<style lang="scss" scoped>
.background {
    width: 100vw;
    height: 100vh;

    position: absolute;

    background-color: $black;
}
</style>
