<template>
    <div class="audio">
        <div class="audio-content">
            <audio
                :src="audio"
                ref="audio"
                preload="metadata"
                @loadedmetadata="onLoadedMetaData"
                @timeupdate="onTimeUpdate"
                @ended="onAudioEnded"
                autoplay
            />

            <p
                class="audio-content--lyrics"
                v-if="text"
            >
                {{ text }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        audio : {
            type: String,
            default: ""
        },
        lyrics: {
            type: Array,
            default: () => ([])
        },
        playing: {
            type: Boolean,
            default: true
        }
    },
    components: {},
    data: () => ({
        text: null
    }),
    computed: {},
    methods: {
        onTimeUpdate() {
            const { audio } = this.$refs
            const filter    = this.lyrics.filter(x => audio.currentTime >= x.start)
            this.text       = filter[filter.length - 1].content

            this.$emit("on-time-update", this.$refs.audio)
        },
        onAudioEnded() {
            this.text = null
            this.$emit("on-audio-ended")
        },
        onLoadedMetaData() {
            this.$emit("on-loaded-meta-data", this.$refs.audio)
        },
        setAudioPlaying(value) {
            this.$nextTick(() => {
                const { audio } = this.$refs

                value ? audio.play() : audio.pause()
            })
        }
    },
    watch: {
        playing: function(value) {
            this.setAudioPlaying(value)
        }
    },
    mounted() {
        this.setAudioPlaying(this.playing)
    }
}
</script>

<style lang="scss" scoped>
.audio{
    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;

    &-content {
        position: absolute;
        bottom: 35px;
        left: 0;

        box-sizing: border-box;
        width: 100%;

        padding: 0 50px;

        &--lyrics {
            @include menco-light;
            color: $font-color-white;
            font-size: 1.2rem;
            text-align: center;

            overflow: hidden;
            white-space: nowrap;

            background-color:rgba($black,0.5);
            padding : 10px 80px;
        }
    }
}
</style>
