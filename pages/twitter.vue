<template>
    <div class="twitter">
        <Background
            v-if="twitter"
            :datas="twitter"
        />

        <Temporalities color="#66D0C8" />

        <TwitterModalsPost
            v-if="getModal('posts')"
            :datas="tweet"
            :signaled="isLastTemporality"
            @on-signaled="onSignaled"
        />
        <div v-if="getModal('posts') && isLastTemporality">
            <TwitterModalsPost
                v-for="(notification, i) in notifications"
                :key="i"
                :datas="notification"
                :signaled="!!(i % 2)"
                @on-signaled="onSignaled"
            />
        </div>
        <TwitterModalMessages
            v-if="getModal('messages')"
            :datas="datas.twitter_conversations"
        />

        <div>
            <Puce
                v-for="(data, i) in datas.twitter_posts"
                :key="i"
                @on-click="onPuceClick(data.id)"
                :show="data.fixed"
                :x="data.x"
                :y="data.y"
            />

            <Puce
                @on-click="setModal({modal: 'messages', display: true})"
                :x="20"
                :y="25"
            />
        </div>

        <Disconnection
            name="Twitter"
            v-if="isLastTemporality && getModal('disconnection')"
        />
        <div
            v-if="button"
            class="twitter-disconnection"
        >
            <button
                class="--button"
                @click="onDisconnected"
            >
                <span @click="startAudioSignal">Déconnecter</span>
            </button>
        </div>
        <OverlayInformation />

        <Navigation color="#66D0C8" />

        <Subtitle
            v-if="sound"
            :audio="sound.url.url"
            :lyrics="sound.lyrics"
            @on-audio-ended="onEndAudio"
        />

        <Notebook
            color="#66D0C8"
            sound="/audios/Twitter_Notif.mp3"
        />
        <Visualizer
            v-show="visualizer"
            page="twitter"
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

        <audio
            ref="audioSignal"
            src="/audios/Twitter_Notif.mp3"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TwitterModalsPost from "~/components/Twitter/TwitterModalsPost";
import TwitterModalMessages from "~/components/Twitter/TwitterModalMessages";

import Puce from "~/components/Global/Puce";
import Subtitle from "~/components/Global/Subtitle";
import OverlayInformation from "~/components/Global/OverlayInformation.vue";
import Navigation from "~/components/Global/Navigation";
import Temporalities from "~/components/Global/Temporalities";
import Notebook from "~/components/Global/Notebook";
import Visualizer from "~/components/Global/Visualizer";
import Disconnection from "~/components/Global/Disconnection";
import Background from "~/components/Global/Background";

import utilities from "~/mixins/utilities";

export default {
    name: "Twitter",
    props: {},
    components: {
        Background,
        Disconnection,
        TwitterModalMessages,
        TwitterModalsPost,
        Puce,
        Subtitle,
        OverlayInformation,
        Navigation,
        Temporalities,
        Notebook,
        Visualizer
    },
    mixins: [utilities],
    data: () => ({
        twitter: {},
        tweet: {},
        button: false,
        sound: null,
        visualizer: false
    }),
    async asyncData({ $twitter }) {
        return {
            twitter: await $twitter.getDatas()
        }
    },
    computed: {
        ...mapGetters({
            getModal: "twitter/getModal",
            notifications: "twitter/getNotifications",

            temporality: "getTemporality",
            temporalities: "getTemporalities",
            datas: "getDatas",

            transition: "global/getTransition",
            chargePedagogie: "global/getChargePedagogie",
        })
    },
    methods: {
        ...mapActions({
            setModal: "twitter/setModal",
            setNotifications: "twitter/setNotifications",

            setTransition: "global/setTransition",
            setChargePedagogie: "global/setChargePedagogie",

            unlockNextTemporalities: "unlockNextTemporalities"
        }),

        onPuceClick(id) {
            const temporality = this.$cookies.get("temporality") || this.temporality
            this.tweet        = this.datas.twitter_posts.filter(x => x.id === id)[0]

            this.setModal({modal: "posts", display: true})

            if(id === 8 && temporality === 3 ){
                this.$voiceOffs
                    .getDatasById(5)
                    .then(resp => {
                        this.sound = resp
                    })
            }
        },

        startAudioSignal() {
            this.$refs.audioSignal.play()
        },

        onSignaled() {
            this.startAudioSignal()

            const filter  = this.datas.twitter_posts.filter(x => !x.fixed)
            const compare = filter.filter(x => !this.notifications.includes(x))
            const splice  = compare.splice(0, 2)

            splice.forEach(item => {
                this.setNotifications(item)
            })
        },

        onEndAudio(){
            this.sound = null

            this.unlockNextTemporalities()
        },

        onDisconnected(){
            this.setModal({modal: "posts", display: false})
            this.setGameFinished()

            this.button = false
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
    watch: {
        notifications: function(val) {
            const filter = this.datas.twitter_posts.filter(x => !x.fixed)

            if(val.length === filter.length) {
                this.setModal({modal: "disconnection", display: true})
                this.button = true
            }
        }
    },
    created() {},
    mounted() {
        this.transitionAnim()
        this.visualizer = true

        this.setModal({modal: "messages", display: false})
        this.setModal({modal: "posts", display: false})

        if(this.transition) {
            setTimeout(() => {
                this.setTransition(false)
            }, 2000)
        }
    },

    beforeRouteLeave(to, from, next) {
        this[`$${to.name}`].getDatas().then( () => {
            this.visualizer = false
            let tl = new this.$TimelineLite({onComplete: next})
            const transition_item = document.querySelectorAll(".transition_item")
            const transition = document.querySelectorAll(".transition")
            const transition_second_part = document.querySelectorAll(".transition_item_second-part")

            if (to.name === "tinder") {
                transition_second_part[0].style.backgroundColor = "#ffdad7"
                transition_second_part[1].style.backgroundColor = "#ffbfba"
                transition_second_part[2].style.backgroundColor = "#db7b74"
                transition_second_part[3].style.backgroundColor = "#ac5851"
                transition_second_part[4].style.backgroundColor = "#8b3832"
            }

            else if (to.name === "instagram"){
                transition_second_part[0].style.backgroundColor = "#ffeeaa"
                transition_second_part[1].style.backgroundColor = "#fadd6c"
                transition_second_part[2].style.backgroundColor = "#f3b01e"
                transition_second_part[3].style.backgroundColor = "#e3bb21"
                transition_second_part[4].style.backgroundColor = "#d89e21"
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
        })
    }
}
</script>

<style lang="scss" scoped>
.twitter {
    position: relative;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;

    &-disconnection {
        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        z-index: 9;

        button {
            padding: 10px 40px;

            border-radius: 100px;

            background-color: $twitter-color;

            box-shadow: 0 10px 20px 0 rgba($black, .25);

            span {
                @include menco-regular;
                font-size: 20px;
                color: $white;
            }
        }
    }
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
            background-color: #c9e4ef;
            left: 0;
        }
        &:nth-child(2) {
            background-color: #698998;
            left: 20vw;
        }
        &:nth-child(3) {
            background-color: #8fb2c1;
            left: 40vw;
        }
        &:nth-child(4) {
            background-color: #108cc4;
            left: 60vw;
        }
        &:nth-child(5) {
            background-color: #324751;
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
