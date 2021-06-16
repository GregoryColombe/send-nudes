<template>
    <div
        class="instagram-notifications"
        ref="notifications"
        :style="`top: ${data.y}%; left: ${data.x}%`"
    >
        <div>
            <fa-icon
                v-if="data.type === 'send'"
                icon="paper-plane"
            />
            <fa-icon
                v-if="data.type === 'like'"
                icon="heart"
            />
            <fa-icon
                v-if="data.type === 'comment'"
                icon="comment"
            />
        </div>

        <div>
            <p v-if="data.type === 'send'">
                @{{ data.username }} à aimé votre publication
            </p>
            <p v-if="data.type === 'like'">
                @{{ data.username }} à commenté votre publication
            </p>
            <p v-if="data.type === 'comment'">
                @{{ data.username }} à liker votre publication
            </p>
        </div>

        <audio
            src="/audios/Instagram_Notif.mp3"
            ref="audio"
            autoplay
        />
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {
        const { notifications, audio } = this.$refs

        audio.volume = .5

        this.$TweenMax.from(notifications, { duration: 0.5,
            opacity : 0 ,
            scale: 0.8,
            ease: "elastic.out(1, 0.5)",
        });
    }
}
</script>

<style lang="scss" scoped>
.instagram-notifications {
    display: flex;

    position: absolute;
    transform: translate(-50%, -50%) scale(1);

    div {
        box-shadow: 0 0 10px 0 rgba($black, .25);
        background-color: $white;
        border-radius: 5px;
        padding: 10px;

        @include menco-regular;
        font-size: 15px;
        color: $black;

        &:first-child {
            margin-right: 5px;
            color: $instagram-color;
        }

        p {white-space: nowrap}
    }
}
</style>
