<template>
    <div class="messenger-messages">
        <header v-if="isLastTemporality">
            <div class="messenger-messages--picture">
                <img
                    v-if="data.picture"
                    :src="data.picture.url"
                    alt="Image profile"
                >
                <div
                    v-else
                    class="messenger-messages--picture_placeholder"
                />
            </div>

            <p>Janice</p>
        </header>

        <section v-if="isLastTemporality">
            <div
                class="messenger-messages--container --scrollable"
                ref="scrollbar"
            >
                <div
                    class="messenger-messages--container_content"
                    v-for="(conversation, x) in conversations"
                    :key="`date-${x}`"
                >
                    <p class="messenger-messages--container_content__date">
                        {{ formatDate("Do MMMM YYYY • HH:mm", conversation.date) }}
                    </p>

                    <ul>
                        <MessengerMessage
                            v-for="(message, i) in conversation.messages"
                            :key="`messages-${i}`"
                            :data="message"
                            :type="getTypeOfData(message)"
                            :picture="data.picture"
                            @on-ended-audio="onEndedAudioReceived"
                        />
                    </ul>
                </div>

                <div
                    v-if="isTyping"
                    class="messenger-messages--container_typping"
                >
                    <span />
                    <span />
                    <span />
                </div>
            </div>

            <Scrollbar
                color="#457EEF"
                container="scrollbar"
                :update="scrollbar"
            />
        </section>
        <section v-else>
            <MessengerCall
                :data="data"
            />
        </section>

        <footer
            v-if="isLastTemporality && footer"
            :class="{'messenger-messages--recording' : isRecording}"
        >
            <div class="messenger-messages--mic">
                <button
                    class="--button"
                    @click="onPlayAudio"
                >
                    <MicIcon class="--icon" />
                </button>
            </div>

            <div
                v-if="isRecording"
                class="messenger-messages--spectrum"
            >
                <SpectrumIcon class="--icon" />

                <div
                    class="messenger-messages--spectrum__timming"
                    ref="timming"
                />
            </div>
        </footer>

        <audio
            v-if="effect.value"
            :src="effect.value"
            @ended="onEndedEffect()"
            autoplay
        />
        <Subtitle
            class="messenger-messages--subtitles"
            v-if="audio && isRecording"
            :audio="audio.url.url"
            :lyrics="audio.lyrics"
            @on-audio-ended="onEndedAudioSend"
            @on-time-update="onTimeUpdate"
        />
    </div>
</template>

<script>
import MessengerMessage from "~/components/Messenger/MessengerMessage";
import MessengerCall from "~/components/Messenger/MessengerCall";

import Scrollbar from "~/components/Global/Scrollbar";
import MicIcon from "~/components/Icons/MicIcon";
import SpectrumIcon from "~/components/Icons/SpectrumIcon";

import scrollbar from "~/mixins/scrollbar";
import utilities from "~/mixins/utilities";
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
        MessengerCall,
        SpectrumIcon,
        MicIcon,
        Scrollbar,
        MessengerMessage
    },
    mixins: [scrollbar, utilities],
    data: () => ({
        conversations: [],
        audio: null,
        effect: {
            value: null,
            event: "",
            src: {
                typing: "/audios/Messenger_Typping.mp3",
                sent: "/audios/Messenger_Sent.mp3",
                receive: "/audios/Messenger_Receive.mp3"
            }
        },
        isTyping: false,
        isRecording: false,
        isLast: false,
        footer: true,
    }),
    computed: {},
    methods: {
        getTypeOfData(object) {
            let type = ""

            for(const item in object) {
                if(Object.prototype.hasOwnProperty.call(object, item)) {
                    if(object[item]) {
                        type = item
                    }
                }
            }

            return type
        },
        setTypeOfEvent() {
            for(const item in this.effect.src) {
                if(Object.prototype.hasOwnProperty.call(this.effect.src, item)) {
                    if(this.effect.value === this.effect.src[item]) {
                        this.effect.event = item
                    }
                }
            }
        },

        onEndedEffect() {
            this.effect.value = null

            switch(this.effect.event) {
            case "sent":
                setTimeout(() => {
                    this.isTyping     = !this.isLast
                    this.effect.value = this.isLast ? null : this.effect.src.typing

                    this.isLast && this.$router.push("pedagogie")
                }, 1000)
                break;
            case "typing": 
                this.$voiceOffs
                    .getDatasById(7)
                    .then(resp => {
                        this.isTyping     = false
                        this.effect.value = this.effect.src.receive

                        this.conversations[this.conversations.length - 1].messages.push({
                            me: false,
                            call: null,
                            content: null,
                            audio: resp
                        })
                    })
                break;
            }
        },
        onEndedAudioReceived() {
            this.footer = true
            this.isLast = true
        },
        onEndedAudioSend() {
            this.footer      = false
            this.isRecording = false

            this.conversations.push({
                date: new Date(),
                messages: [{
                    me: true,
                    call: null,
                    content: null,
                    audio: this.audio
                }]
            })

            this.effect.value = this.effect.src.sent
        },
        onTimeUpdate(value) {
            this.$refs.timming.style.width= `${100 - (value.currentTime / value.duration * 100)}%`
        },

        onPlayAudio() {
            let id = this.effect.event === "receive" ? 12 : 6

            this.$voiceOffs
                .getDatasById(id)
                .then(resp => {
                    this.audio       = resp
                    this.isRecording = true
                })
        }
    },
    watch: {
        conversations: {
            handler() {
                this.isLastTemporality && this.setScrollbarSize()
            },
            deep: true
        },
        "effect.value": function(val) {
            val && this.setTypeOfEvent()
        }
    },
    created() {
        this.conversations = JSON.parse(JSON.stringify(this.data.conversations))
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.messenger-messages {
    display: flex;
    flex-direction: column;

    width: 50%;
    height: 100%;

    margin-left: 5px;

    border-radius: 5px;
    background-color: $white;

    overflow: hidden;

    header {
        display: flex;
        align-items: center;

        padding: 15px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        .messenger-messages--picture {
            width: 40px;
            height: 40px;

            border-radius: 50%;

            margin-right: 10px;

            overflow: hidden;

            img {
                width: 100%;
                height: 100%;

                object-fit: cover;
                object-position: center;
            }

            &_placeholder {
                width: 100%;
                height: 100%;
                background-color: $grey;
            }
        }

        p {
            margin-left: 15px;

            @include menco-regular;
            font-size: 15px;
            color: $font-color-black;
        }
    }
    section {
        display: flex;
        justify-content: center;
        flex-grow: 1;

        overflow: hidden;

        .messenger-messages--container {
            width: 100%;

            padding: 20px 0;

            overflow-y: scroll;

            &_content {
                margin-top: 20px;
                padding: 0 25px;

                &:first-child {margin-top: 0}
                &__date {
                    margin-bottom: 10px;


                    @include menco-light;
                    text-align: center;
                    font-size: 15px;
                    color: $font-color-grey;

                    &:last-child {margin-bottom: 0}


                }
            }
            &_typping {
                display: flex;

                width: fit-content;

                margin: 10px 25px 0 25px;
                padding: 5px;

                border-radius: 100px;
                background-color: $grey;

                span {
                    display: block;

                    width: 5px;
                    height: 5px;

                    margin-left: 5px;

                    border-radius: 50%;
                    background-color: $white;

                    &:first-child {margin-left: 0}
                }

                @for $i from 1 through 3 {
                    span:nth-child(#{$i}) {
                        animation: 1s ease-in-out $i * .1s infinite isTypping;
                    }
                }

                @keyframes isTypping {
                    0% {transform: translateY(25%)}
                    50% {transform: translateY(-25%)}
                    100% {transform: translateY(25%)}
                }
            }
        }
    }
    footer {
        display: flex;
        justify-content: center;

        padding: 10px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        &.messenger-messages--recording {justify-content: flex-start}

        .messenger-messages--mic {
            button {
                display: flex;
                justify-content: center;
                align-items: center;

                width: 30px;
                height: 30px;

                border-radius: 50%;

                background-color: $messenger-color;

                .--icon {width: 20px}

                &:hover, &:focus, &:active {
                    background-color: rgba($color: $messenger-color, $alpha: 0.85);
                    transition: 0.15s;
                }
            }
        }
        .messenger-messages--spectrum {
            display: flex;
            justify-content: center;
            align-items: center;

            position: relative;
            overflow: hidden;

            padding: 0 10px;
            margin: 0 auto;

            border-radius: 100px;
            background-color: $messenger-color;

            &__timming {
                height: 100%;
                width: 100%;

                position: absolute;
                right: 0;
                top: 0;
                background-color: $messenger-color;
            }
        }

        .--icon {height: 20px}
    }

    &--subtitles {
        top: calc((70vh - 100vh) / 2);
        left: -50px;
    }
}
</style>
