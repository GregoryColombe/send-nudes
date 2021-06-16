<template>
    <div
        class="temporality-overlay"
        v-if="display"
        ref="overlay"
    >
        <h3>{{ activeTemporality.name }}</h3>

        <canvas id="background" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import Noise from "~/class/backgroundNoise";

export default {
    props: {
        datas : {
            type: Object,
            default:() =>({})
        }
    },
    components: {},
    data: () => ({
        display: false
    }),
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality",
            onFirstLoad: "getOnFirstLoad",

            transition: "global/getTransition",
        }),

        activeTemporality() {
            return this.temporalities.find(x => x.id === this.temporality)
        }
    },
    methods: {
        ...mapActions({
            setOnFirstLoad: "setOnFirstLoad"
        })
    },
    watch: {
        temporality: function() {
            this.display = true
            this.$emit("is-ready", this.display)
        },
        display: function(val) {
            val && this.$nextTick(() => {
                Noise()

                const {overlay} = this.$refs

                this.$TweenMax
                    .to(overlay, .3, {
                        delay: 2,
                        css: {alpha: 0},
                        onComplete: () => {
                            this.display = false
                            this.$emit("is-ready", this.display)
                        }
                    })
            })
        }
    },
    created(){},
    mounted() {
        if(this.onFirstLoad) {
            this.display = true
            this.setOnFirstLoad(false)
        }
    }
}
</script>

<style lang="scss" scoped>
.temporality-overlay {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    position: absolute;
    overflow: hidden;
    z-index: 99;

    animation: .3s ease-out fadeIn;

    @keyframes fadeIn {
        from {opacity: 0}
        to {opacity: 1}
    }

    h3 {
        @include menco-regular;
        font-size: 4rem;
        text-transform: uppercase;
        color: $font-color-white;

        position: relative;
        z-index: 2;
    }
}
</style>

