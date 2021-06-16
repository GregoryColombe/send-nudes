<template>
    <div class="messenger-call">
        <div>
            <div class="messenger-call--picture">
                <div>
                    <img
                        v-if="data.picture"
                        :src="data.picture.url"
                        alt="Image profile"
                    >
                    <div
                        v-else
                        class="messenger-call--picture_placeholder"
                    />
                </div>
            </div>

            <div class="messenger-call--informations">
                <p><strong>{{ data.name }}</strong></p>

                <p v-if="response">
                    {{ response }}
                </p>
            </div>
        </div>

        <div
            :class="[
                'messenger-call--buttons',
                {'messenger-call--buttons_center' : audio || !data.isRecalled}
            ]"
        >
            <div v-if="!audio && data.isRecalled">
                <button
                    class="messenger-call--buttons_phone --button"
                    @click="onCalled"
                >
                    <PhoneIcon />
                </button>

                <p v-if="!data.isCalled">
                    Appeler
                </p>
                <p v-else>
                    Rappeler
                </p>
            </div>

            <div>
                <button
                    class="--button"
                    @click="onClosed"
                >
                    <CloseIcon color="#FFF" />
                </button>

                <p>Fermer</p>
            </div>
        </div>

        <audio
            v-if="audio && !subtitle"
            :src="audio"
            ref="audio"
            @timeupdate="onAudioTimeUpdate"
            @ended="onAudioEnded"
            autoplay
        />

        <Subtitle
            v-if="audio && subtitle"
            class="messenger-call--subtitles"
            :audio="audio.url.url"
            :lyrics="audio.lyrics"
            @on-time-update="onAudioTimeUpdate"
            @on-audio-ended="onAudioEnded"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import CloseIcon from "~/components/Icons/CloseIcon";
import PhoneIcon from "~/components/Icons/PhoneIcon";
import Subtitle from "~/components/Global/Subtitle";

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        Subtitle,
        PhoneIcon,
        CloseIcon
    },
    data: () => ({
        audio: null,
        subtitle: false,
        response: null,
        src: {
            start: "/audios/Messenger_Call.mp3",
            end: "/audios/Messenger_Call-Ended.mp3"
        }
    }),
    computed: {
        ...mapGetters({
            datas: "getDatas"
        })
    },
    methods: {
        ...mapActions({
            setModal: "room/setModal",

            updateDatas: "updateDatas"
        }),

        onClosed() {
            this.setModal({modal: "messages", display: false})
        },
        onCalled() {
            this.audio = this.src.start
        },

        onAudioEnded() {
            const value           = this.datas.messengers.map(x => ({...x}))
            const index           = value.findIndex(x => x.id === this.data.id)
            value[index].isCalled = true

            if(this.audio !== this.src.end) {
                if(this.data.possible) {
                    if(this.subtitle) {
                        this.subtitle = false
                        this.audio    = this.src.end
                        this.response = "Appel terminé"
                    } else {
                        this.$voiceOffs
                            .getDatasById(11)
                            .then(resp => {
                                this.audio    = resp
                                this.subtitle = true
                            })
                    }
                } else {
                    this.audio    = this.src.end
                    this.response = "Pas de réponse"
                }
            } else {
                this.audio = null
                this.data.possible && (value[index].isRecalled = false)
                this.updateDatas({key: "messengers", value})
            }
        },
        onAudioTimeUpdate(val) {
            if(this.audio !==  this.src.end) {
                if(this.audio ===  this.src.start) {
                    this.response = "Appel en cours"
                } else {
                    this.response = this.calculateTime(val.currentTime)
                }
            }
        },

        calculateTime(secs) {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        },
        resetDatas() {
            this.response = null
            this.audio    = null
            this.subtitle = false
        }
    },
    watch: {
        data: {
            handler() {
                this.resetDatas()
            },
            deep: true
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.messenger-call {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: 70%;
    height: 100%;

    &--picture {
        display: flex;
        justify-content: center;

        margin-bottom: 20px;

        div {
            width: 100px;
            height: 100px;

            border-radius: 50%;

            overflow: hidden;

            @include breakpoint (laptopXL){
                width: 80px;
                height: 80px;
            }

            .messenger-call--picture_placeholder {
                width: 100%;
                height: 100%;

                background-color: $grey;
            }

            img {
                width: 100%;
                height: 100%;

                object-fit: cover;
                object-position: center;
            }
        }
    }
    &--informations {
        p {
            margin-bottom: 5px;

            @include menco-light;
            font-size: 12px;
            color: $font-color-black;
            text-align: center;

            strong {
                @include menco-regular;
                font-size: 15px;
            }
        }
    }
    &--buttons {
        display: flex;
        justify-content: space-between;

        width: 100%;

        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 50%;

            button {
                display: flex;
                justify-content: center;
                align-items: center;

                width: 60px;
                height: 60px;

                margin-bottom: 10px;

                border-radius: 50%;

                background-color: $grey;

                &.messenger-call--buttons_phone {background-color: $messenger-color}
                svg {width: 20px}

                @include breakpoint (laptopXL){
                    width: 40px;
                    height: 40px;
                }
            }
            p {
                @include menco-light;
                font-size: 14px;
                color: $font-color-black;
                text-align: center;

                @include breakpoint(laptopM){
                    font-size: 12px;
                }
            }
        }

        &_center {justify-content: center}
    }

    &--subtitles {
        top: calc((70vh - 100vh) / 2);
        left: -50px;
    }
}
</style>
