<template>
    <div :class="['messenger-message', {'--received' : !data.me}]">
        <div
            class="messenger-message--picture"
            v-if="!data.me"
        >
            <div>
                <img
                    v-if="picture"
                    :src="picture.url"
                    alt="Image profile messenger"
                >
                <div
                    v-else
                    class="messenger-message--picture_placeholder"
                />
            </div>
        </div>

        <div
            v-if="type === 'content'"
            class="messenger-message--content"
        >
            <p>{{ data.content }}</p>
        </div>
        <div
            v-if="type === 'call'"
            class="messenger-message--call"
        >
            <p>Janice à manqué votre appel</p>

            <div>
                <div class="messenger-message--call__icon">
                    <ArrowIcon />
                </div>

                <p>{{ formatDate("ddd, HH:MM", data.call) }}</p>
            </div>
        </div>
        <div
            v-if="type === 'audio'"
            class="messenger-message--audio"
        >
            <button
                class="messenger-message--audio__button --button"
                @click="playing = true"
            >
                <PlayIcon :color="!data.me ? '#9B9B9B' : '#457EEF'" />
            </button>

            <hr>

            <p>{{ duration }}</p>

            <div
                class="messenger-message--audio__timming"
                :style="`background-color: ${!data.me ? '#808080' : '#325BAD'}`"
                ref="timming"
            />
        </div>

        <Subtitle
            class="messenger-message--subtitles"
            v-if="type === 'audio'"
            v-show="playing"
            :playing="playing"
            :audio="data.audio.url.url"
            :lyrics="data.audio.lyrics"
            @on-loaded-meta-data="onLoadedMetaData"
            @on-audio-ended="onEnded"
            @on-time-update="onTimeUpdate"
        />
    </div>
</template>

<script>
import ArrowIcon from "~/components/Icons/ArrowIcon";
import PlayIcon from "~/components/Icons/PlayIcon";

import utilities from "~/mixins/utilities";
import Subtitle from "~/components/Global/Subtitle";

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        type: {
            type: String,
            default: "content"
        },
        picture: {
            type: Object,
            default: () => ({})
        },
    },
    components: {
        Subtitle,
        PlayIcon,
        ArrowIcon
    },
    mixins: [utilities],
    data: () => ({
        playing: false,
        duration: "0:00"
    }),
    computed: {},
    methods: {
        onEnded() {
            this.playing = false
            !this.data.me && this.$emit("on-ended-audio")
        },
        onLoadedMetaData(value) {
            this.duration = this.calculateTime(value.duration)
        },
        onTimeUpdate(value) {
            this.duration = this.calculateTime(value.currentTime)

            this.$refs.timming.style.width = `${value.currentTime / value.duration * 100}%`
        },

        calculateTime(secs) {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        },
    },
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.messenger-message {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    margin-bottom: 10px;

    &:last-child {margin-bottom: 0}
    &--picture {
        div {
            width: 35px;
            height: 35px;

            border-radius: 50%;

            overflow: hidden;

            img{
                width: 100%;
                object-fit: contain;
            }

        }

        &_placeholder {
            width: 100%;
            height: 100%;

            background: $grey;
        }
    }

    &--content {
        max-width: 80%;

        margin-left: 10px;
        padding: 10px;

        border-radius: 5px;

        background-color: $messenger-color;

        p {
            @include menco-regular;
            font-size: 15px;
            text-align: right;
            color: $font-color-white;
        }
    }
    &--call {
        max-width: 80%;

        padding: 10px;
        margin-left: 10px;

        border-radius: 5px;
        background-color: $grey;

        div {
            display: flex;
            align-items: flex-end;

            .messenger-message--call__icon {
                width: 15px;
                height: 15px;

                margin-bottom: 3px;
                margin-right: 3px;
            }

            p {@include menco-semi-bold;}
        }

        p {
            @include menco-regular;
            font-size: 12px;
            color: $font-color-white;
        }
    }
    &--audio {
        display: flex;
        align-items: center;

        position: relative;

        overflow: hidden;

        margin-left: 10px;
        padding: 5px;

        border-radius: 100px;
        background-color: $messenger-color;

        & > * {
            position: relative;
            z-index: 1;
        }

        &__button {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 20px;
            height: 20px;

            border-radius: 50%;
            background-color: $white;

            svg {width: 7px}
        }
        hr {
            border: none;
            background-color: $white;

            width: 50px;
            height: 2px;
        }
        p {
            padding: 5px 10px;

            @include menco-regular;
            color: $messenger-color;
            font-size: 12px;

            border-radius: 100px;
            background-color: $white;
        }

        &__timming {
            height: 100%;

            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
        }
    }

    &.--received {
        justify-content: flex-start;

        .messenger-message--content {
            background-color: transparent;

            border: {
                style: solid;
                width: 1px;
                color: $light-grey;
            };

            p {
                text-align: left;
                color: $font-color-black;
            }
        }
        .messenger-message--audio {
            background-color: $grey;

            p {color: $grey}
        }
    }

    &--subtitles {
        top: calc((70vh - 100vh) / 2);
        left: -50px;
    }
}
</style>
