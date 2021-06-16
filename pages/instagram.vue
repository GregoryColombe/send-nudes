<template>
    <div class="instagram">
        <Temporalities color="#FDD241" />

        <Background
            v-if="instagram"
            :datas="instagram"
        />

        <InstagramModalsPost
            v-if="getModal('post')"
            :datas="{...post, ...instagram}"
        />

        <InstagramModalsMessages
            v-if="getModal('messages')"
            :datas="{messages: datas.instagram_messages, profile: instagram}"
            @on-ended-scroll="onEndedScroll"
        />

        <div>
            <Puce
                v-for="(data, i) in datas.instagram_posts"
                :key="i"
                :x="data.x"
                :y="data.y"
                @on-click="onPuceClick(data.id)"
            />
            <Puce
                :x="60"
                :y="60"
                @on-click="setModal({modal: 'messages', display: true})"
            />
        </div>

        <Disconnection
            name="instagram"
            v-if="isLastTemporality && getModal('disconnection')"
        />
        <OverlayInformation @is-ready="val => {this.overlay = !val}" />

        <div v-if="getModal('notifications') && isLastTemporality">
            <InstagramNotifications
                v-for="(notification, i) in notifications"
                :key="i"
                :data="notification"
            />
        </div>

        <Subtitle
            v-if="audio"
            :audio="audio.url.url"
            :lyrics="audio.lyrics"
            @on-audio-ended="onEndedAudio"
        />

        <Navigation />
        <Notebook
            color="#FDD241"
            sound="/audios/Instagram_Notif.mp3"
        />
        <Visualizer
            v-show="visualizer"
            page="instagram"
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

import Puce from "~/components/Global/Puce";

import InstagramModalsPost from "~/components/Instagram/InstagramModalsPost";
import InstagramModalsMessages from "~/components/Instagram/InstagramModalsMessages";
import InstagramNotifications from "~/components/Instagram/InstagramNotifications";

import Temporalities from "~/components/Global/Temporalities";
import Navigation from "~/components/Global/Navigation";
import Notebook from "~/components/Global/Notebook";
import Subtitle from "~/components/Global/Subtitle";
import Visualizer from "~/components/Global/Visualizer";
import Disconnection from "~/components/Global/Disconnection";
import OverlayInformation from "~/components/Global/OverlayInformation";
import Background from "~/components/Global/Background";

import utilities from "~/mixins/utilities";

export default {
    name: "Instagram",
    props: {},
    components: {
        OverlayInformation,
        Disconnection,
        Subtitle,
        Temporalities,
        Puce,
        InstagramModalsMessages,
        InstagramNotifications,
        InstagramModalsPost,
        Navigation,
        Notebook,
        Visualizer,
        Background
    },
    mixins: [utilities],
    data: () => ({
        instagram: {},
        post: {},
        audio: null,
        overlay: false,
        nextPage: "",
        visualizer: false
    }),
    async asyncData({ $instagram }) {
        return {
            instagram: await $instagram.getDatas()
        }
    },
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality",
            datas: "getDatas",
            onFirstLoad: "getOnFirstLoad",

            getModal: "instagram/getModal",
            notifications: "instagram/getNotifications"
        })
    },
    methods: {
        ...mapActions({
            setModal: "instagram/setModal",
            setNotifications: "instagram/setNotifications",
            unlockNextTemporalities: "unlockNextTemporalities",
        }),

        onPuceClick(value) {
            this.post = this.datas.instagram_posts.find(x => x.id === value)
            this.setModal({modal: "post", display: true})
        },

        onEndedAudio() {
            this.audio = null
            this.unlockNextTemporalities()
        },
        onEndedScroll(value) {
            const temporality = this.$cookies.get("temporality") || this.temporality

            if(temporality === 2 && value === 6) {
                this.$voiceOffs
                    .getDatasById(8)
                    .then(resp => {
                        this.audio = resp
                    })
            }
        },

        setNewNotifications() {
            const difference = this.datas.instagram_notifications.filter(x => {
                const map = this.notifications.map(x => x.id)

                return !map.includes(x.id)
            })
            const splice     = difference.splice(0, 1)

            splice.forEach(item => {
                this.setNotifications(item)
            })
        },
        updateNotifications() {
            this.interval = setInterval(this.setNewNotifications, 400)
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
            if(val.length === this.datas.instagram_notifications.length) {
                clearInterval(this.interval)
                setTimeout(() => {
                    this.setModal({modal: "notifications", display: false})
                    this.setModal({modal: "disconnection", display: true})
                    this.setGameFinished()
                }, 2500);
            }
        },
        overlay: function(val) {
            this.isLastTemporality && val ? this.updateNotifications() : clearInterval(this.interval)
        }
    },
    created() {
        if(this.isLastTemporality && !this.getModal("disconnection")) {
            this.setModal({modal: "notifications", display: true})
        }
    },
    mounted() {
        this.transitionAnim()
        this.visualizer = true

        this.setModal({modal: "post", display: false})
        this.setModal({modal: "messages", display: false})

        if(this.isLastTemporality && !this.getModal("disconnection")) {
            this.setModal({modal: "notifications", display: true})
            this.updateNotifications()
        }
    },
    beforeDestroy() {
        this.interval && clearInterval(this.interval)
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
                rotation: 0,
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
.instagram {
    width: 100vw;
    height: 100vh;

    position: relative;

    overflow: hidden;
}
.overlay_instagram {
    background-color: #000;
    width: 100vw;
    height: 100vh;
    position: absolute;
    right: -100vw;
    display: block;
    opacity: 0
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
            background-color: #ffeeaa;
            left: 0;
        }
        &:nth-child(2) {
            background-color: #fadd6c;
            left: 20vw;
        }
        &:nth-child(3) {
            background-color: #f3b01e;
            left: 40vw;
        }
        &:nth-child(4) {
            background-color: #e3bb21;
            left: 60vw;
        }
        &:nth-child(5) {
            background-color: #d89e21;
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
