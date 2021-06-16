<template>
    <div class="tinder">
        <Background
            v-if="tinder"
            :datas="tinder"
        />

        <Temporalities color="#B8605B" />

        <TinderModals
            v-if="modals"
            :datas="profile"
            @on-ended-scroll="onEndedScroll"
        />

        <div>
            <Puce
                v-for="(data, i) in datas.tinder_profiles"
                :key="i"
                @on-click="onPuceClick(data.id)"
                :x="data.x"
                :y="data.y"
            />
        </div>

        <Disconnection
            name="Tinder"
            v-if="isLastTemporality"
        />

        <OverlayInformation />

        <Subtitle
            v-if="audio"
            :audio="audio.url.url"
            :lyrics="audio.lyrics"
            @on-audio-ended="onEndedAudio"
        />

        <Navigation />
        <Notebook
            color="#B8605B"
            sound="/audios/Tinder_MatchNotif.mp3"
        />
        <Visualizer
            v-show="visualizer"
            page="tinder"
        />

        <div class="transition">
            <div class="transition_item">
                <div class="transition_item_second-part" />
            </div>
            <div class="transition_item">
                <div class="transition_item_second-part" />
            </div>
            <div class="transition_item">
                <div class="transition_item_second-part" />
            </div>
            <div class="transition_item">
                <div class="transition_item_second-part" />
            </div>
            <div class="transition_item">
                <div class="transition_item_second-part" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TinderModals from "~/components/Tinder/TinderModals";

import Puce from "~/components/Global/Puce";
import Temporalities from "~/components/Global/Temporalities";
import Navigation from "~/components/Global/Navigation";
import Notebook from "~/components/Global/Notebook";
import Subtitle from "~/components/Global/Subtitle";
import Visualizer from "~/components/Global/Visualizer";
import OverlayInformation from "~/components/Global/OverlayInformation"
import Disconnection from "~/components/Global/Disconnection";
import Background from "~/components/Global/Background";

import utilities from "~/mixins/utilities";

export default {
    name: "Tinder",
    props: {},
    components: {
        Disconnection,
        Subtitle,
        Temporalities,
        TinderModals,
        Puce,
        Navigation,
        Notebook,
        Visualizer,
        OverlayInformation,
        Background
    },
    mixins: [utilities],
    data: () => ({
        tinder: {},
        profile: null,
        audio: null,
        visualizer: false
    }),
    async asyncData({ $tinder }) {
        return {
            tinder: await $tinder.getDatas()
        }
    },
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality",
            datas: "getDatas",
            modals: "tinder/getModal",
        })
    },
    methods: {
        ...mapActions({
            setModals: "tinder/setModal",
            setTransition: "global/setTransition",
            unlockNextTemporalities: "unlockNextTemporalities"
        }),

        onPuceClick(id) {
            this.profile = this.datas.tinder_profiles.find(x => x.id === id)

            this.setModals(true)
        },
        onEndedAudio() {
            this.audio = null

            this.unlockNextTemporalities()
        },
        onEndedScroll() {
            const temporality = this.$cookies.get("temporality") || this.temporality

            if(this.profile.id === 11 && temporality === 1) {
                this.$voiceOffs
                    .getDatasById(4)
                    .then(resp => {
                        this.audio   = resp
                    })
            }
        },

        transitionAnim() {
            let tl = new this.$TimelineLite()
            const transition_item = document.querySelectorAll(".transition_item")
            const transition = document.querySelector(".transition")

            transition.style.display = "flex"
            transition_item.forEach(item => {
                item.style.top = 0
            });

            tl.to([ transition_item[0], transition_item[1], transition_item[2], transition_item[3], transition_item[4] ], {
                duration: 0.5,
                top: "-100vh",
                ease: "Power2.easeOut",
                stagger: {
                    from: "end",
                    amount: 1
                }
            })
        }
    },
    watch: {},
    created() {},
    mounted() {
        this.transitionAnim()
        this.visualizer = true

        this.setModals(false)
    },
    beforeDestroy() {
        this.setModals(false)
    },

    beforeRouteLeave(to, from, next) {
        this.visualizer = false
        let tl = new this.$TimelineLite({onComplete: next})
        const transition_item = document.querySelectorAll(".transition_item")
        const transition = document.querySelectorAll(".transition")
        const transition_second_part = document.querySelectorAll(".transition_item_second-part")

        if (to.name === "instagram") {
            transition_second_part[0].style.backgroundColor = "#ffeeaa"
            transition_second_part[1].style.backgroundColor = "#fadd6c"
            transition_second_part[2].style.backgroundColor = "#f3b01e"
            transition_second_part[3].style.backgroundColor = "#e3bb21"
            transition_second_part[4].style.backgroundColor = "#d89e21"
        }

        else if (to.name === "twitter"){
            transition_second_part[0].style.backgroundColor = "#c9e4ef"
            transition_second_part[1].style.backgroundColor = "#698998"
            transition_second_part[2].style.backgroundColor = "#8fb2c1"
            transition_second_part[3].style.backgroundColor = "#108cc4"
            transition_second_part[4].style.backgroundColor = "#324751"
        }

        tl.set(transition, {
            display: "flex",
        })

        tl.to([ transition_item[0], transition_item[1], transition_item[2], transition_item[3], transition_item[4] ], {
            duration: 0.35,
            top: "0",
            ease: "Power2.easeIn",
            stagger: {
                from: "end",
                amount: 1
            }
        })

        tl.to([transition_second_part[0], transition_second_part[1], transition_second_part[2], transition_second_part[3], transition_second_part[4]],{
            duration: 0.5,
            left: 0,
            ease: "Power2.easeOut",
            stagger: {
                from: "end",
                amount: 1
            },
            delay: 0.2
        })
    }
}
</script>

<style lang="scss" scoped>
.tinder {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.transition {
    width: 100vw;
    height: 100vh;
    z-index: 15;
    display: none;

    &_item {
        height: 100vh;
        width: 20vw;
        top: 100vh;
        position: absolute;
        z-index: 50;

        &:nth-child(1) {
            background-color: #ffdad7;
            left: 0;
        }
        &:nth-child(2) {
            background-color: #ffbfba;
            left: 20vw;
        }
        &:nth-child(3) {
            background-color: #db7b74;
            left: 40vw;
        }
        &:nth-child(4) {
            background-color: #ac5851;
            left: 60vw;
        }
        &:nth-child(5) {
            background-color: #8b3832;
            left: 80vw;
        }

        &_second-part {
            width: 20vw;
            height: 100vh;
            position: relative;
            left: 20vw;
            top: 0;
        }
    }
}
</style>

