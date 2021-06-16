<template>
    <div class="introduction">
        <canvas id="background" />

        <div class="introduction-container">
            <div class="introduction-container--text">
                <p class="sentence_1">
                    Janice a disparu ...
                </p>
                <p class="sentence_2">
                    Vous êtes sa meilleure amie,
                </p>
                <p class="sentence_3">
                    menez l'enquête pour la retrouver.
                </p>
            </div>
        </div>

        <Subtitle
            v-if="textEnd"
            :audio="datas.url.url"
            :lyrics="datas.lyrics"
            @on-audio-ended="onAudioEnded"
        />

        <img
            src=""
            alt="Background"
            class="--background"
        >
    </div>
</template>

<script>
import Subtitle from "~/components/Global/Subtitle";
import backgroundNoise from "~/class/backgroundNoise";
import { TimelineMax } from "gsap";

import utilities from "~/mixins/utilities";


export default {
    name: "Introduction",
    props: {},
    components: {
        Subtitle,
    },
    mixins: [utilities],
    async asyncData({ $voiceOffs }) {
        return {
            datas: await $voiceOffs.getDatasById(1),
        }
    },
    data: () => ({
        textEnd : false,
        datas: {},
    }),
    computed: {},
    methods: {
        init() {
            const tl = new TimelineMax()

            tl.to(".sentence_1", { duration: 3,
                opacity: 1,
                delay : 0.25,
                ease:"power4.out"
            });
            tl.to(".sentence_2", { duration: 3,
                opacity: 1,
                delay : 0,
                ease:"power4.out"
            });
            tl.to(".sentence_3", { duration: 3,
                opacity: 1,
                delay : 0,
                ease:"power4.out"
            });
            tl.to(".sentence_1 , .sentence_2 , .sentence_3", { duration: 3,
                opacity: 0,
                delay : 0,
                ease:"power4.out"
            });

            setTimeout(() => { this.textEnd = true }, 12250);

            backgroundNoise()
        },
        
        onAudioEnded() {
            this.$router.push({name: "room"})
        },
    },
    watch: {},
    mounted() {
        this.init()
    },

    beforeRouteLeave(to, from, next) {
        this[`$${to.name}`].getDatas().then(resp => {

            let tl = new this.$TimelineLite({ onComplete: next })

            tl.to(".introduction", {
                duration: 3,
                opacity: 0,
                delay: 0.3
            })

            tl.set(".--background", { attr: { src: resp.background[0].url }, zIndex: 30 })

            tl.to(".introduction", {
                duration: 1.5,
                opacity: 1,
                ease: "Power2.easeInOut",
            })
        })
    }
}
</script>

<style lang="scss">
body {
    background-color: #000;
}
</style>

<style lang="scss" scoped>
.introduction{
    width: 100vw;
    height: 100vh;

    position: relative;
    margin: 0;

    overflow: hidden;
    background-color: $black;

    &-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &--text{
            color: $font-color-white;
            @include menco-light;
            font-size: 2.5rem;
            text-align: center;

            z-index: 3;

            p{
                margin-bottom: 2vh;
                opacity: 0;
            }

            .sentence_3{
                margin-bottom: 0;
            }
        }
    }
}

</style>
