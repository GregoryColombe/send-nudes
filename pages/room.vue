<template>
    <div class="room">
        <img
            class="--background"
            :src="room.background[0].url"
        >

        <Computer
            v-show="getModal('account')"
            :datas="room.computer"
            @on-click="onComputerClick"
        />
        <MessengerModal
            v-if="getModal('messenger')"
            :datas="datas.messengers"
        />

        <div
            v-if="getModal('password')"
            @click="onClickLetter(0,'N')"
            class="room-letter room-letter--n"
        />
        <div
            v-if="getModal('password')"
            @click="onClickLetter(1,'O')"
            class="room-letter room-letter--o"
        />
        <div
            v-if="getModal('password')"
            @click="onClickLetter(2,'É')"
            class="room-letter room-letter--e"
        />

        <div>
            <Puce
                v-if="!isLastTemporality"
                :x="room.computer.x"
                :y="room.computer.y"
                @on-click="setModal({modal: 'account', display: true})"
            />

            <Puce
                :x="11"
                :y="92"
                @on-click="setModal({modal: 'messenger', display: true})"
            />
        </div>

        <Subtitle
            v-if="audio"
            :audio="selected.audio.url.url"
            :lyrics="selected.audio.lyrics"
            @on-audio-ended="audio = false"
        />

        <Notebook
            :color="'#457EEF'"
            :first="true"
        />

        <Visualizer
            v-show="visualizer"
            page="room"
        />

        <audio
            v-if="effect"
            src="/audios/lettre.mp3"
            autoplay
            @ended="effect = false"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import utilities from "~/mixins/utilities";

import Puce from "~/components/Global/Puce";
import Subtitle from "~/components/Global/Subtitle";
import Computer from "~/components/Room/Computer";
import Notebook from "~/components/Global/Notebook";
import Visualizer from "~/components/Global/Visualizer";


import MessengerModal from "~/components/Messenger/MessengerModal";

export default {
    name: "Room",
    props: {},
    components: {
        MessengerModal,
        Puce,
        Subtitle,
        Computer,
        Notebook,
        Visualizer
    },
    mixins: [utilities],
    data: () => ({
        room: {},
        audio: false,
        selected: {},
        effect: false,
        visualizer: false
    }),
    async asyncData({ $room }) {
        return {
            room: await $room.getDatas()
        }
    },
    computed: {
        ...mapGetters({
            getModal: "room/getModal",
            datas: "getDatas",
            temporalities: "getTemporalities",
            temporality: "getTemporality"
        }),

        accountActivable() {
            return this.room.computer.content.filter(x => x.activable)[0]
        }
    },
    methods: {
        ...mapActions({
            setModal: "room/setModal",
            setPassword: "room/setPassword",
            updateDatas: "updateDatas"
        }),

        onClickLetter(index,letter){
            this.setPassword({index: index, value: letter})
            
            this.effect = true;
        },

        onComputerClick(value) {
            this.audio = true

            if(value === "connection") {
                this.audio = false
                this.changeRoutePath()
            } else {
                this.selected = this.room.computer.content.filter(x => x.id === value)[0]
            }
        },
        changeRoutePath() {
            const reseaux = ["tinder","instagram","twitter"]
            const rand    = this.getRandomInt(0,3)

            this.$router.push(reseaux[rand])
        },

        setAudio(id, audio) {
            this.$voiceOffs.getDatasById(audio)
                .then(resp => {
                    this.room.computer.content[id].audio = resp
                })
        },

        closeAllModals() {
            this.setModal({modal: "account", display: false})
            this.setModal({modal: "password", display: false})
            this.setModal({modal: "messenger", display: false})
            this.setModal({modal: "messages", display: false})
        },
    },
    watch: {},
    created() {
        const value = this.datas.messengers.map(x => ({...x, isCalled: false, isRecalled: true}))

        this.updateDatas({key: "messengers", value})
        this.closeAllModals()
    },
    mounted() {
        this.visualizer = true

        this.setAudio(0, 2)
        this.setAudio(1, 3)
    },

    beforeRouteLeave(to, from, next) {
        this.visualizer = false
        let tl = new this.$TimelineLite({ onComplete: next })
        const room = document.querySelector(".room")

        tl.to(room, {
            duration: 4,
            opacity: 0,
            delay: 0.3
        })
    }
}
</script>

<style lang="scss" scoped>
.room {
    width: 100vw;
    height: 100vh;

    position: relative;

    overflow : hidden;

    &-letter {
        position: absolute;
        cursor: pointer;
        z-index: 9;

        &--n{
            bottom: 0;
            right: 0;
            width: 15%;
            height: 40%;
        }
        &--o{
            top : 30%;
            left: 47%;
            width: 10%;
            height: 20%;
        }
        &--e{
            top : 45%;
            left: 10%;
            width: 15%;
            height: 30%;
        }
    }
}
</style>



<style lang="scss" >
body {
    background-color: #000;
}
</style>