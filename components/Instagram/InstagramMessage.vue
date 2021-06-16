<template>
    <li :class="['instagram-message', {'--send' : data.me}, {'--join' : joined}]">
        <div
            class="instagram-message--picture"
            v-if="!joined"
        >
            <div v-if="!data.me">
                <img
                    v-if="data.profile_received"
                    :src="data.profile_received.url"
                    alt="Instagram profile picture"
                >
                <div
                    class="instagram-message--picture_placeholder"
                    v-else
                />
            </div>
            <div v-else>
                <img
                    v-if="data.profile_send"
                    :src="data.profile_send.url"
                    alt="Instagram profile picture"
                >
                <div
                    class="instagram-message--picture_placeholder"
                    v-else
                />
            </div>
        </div>

        <div :class="['instagram-message--content', {'--send' : data.me}, {'--join' : joined}, {'--screen': data.picture && !data.nude}]">
            <div
                v-if="data.picture && data.nude"
                class="instagram-message--content_image"
            >
                <img
                    :src="data.picture.url"
                    alt="Image of conversation"
                >
            </div>
            <span
                v-if="data.picture && data.nude"
                class="instagram-message--content_text"
            >* Noé a screené *</span>
            <p v-else>
                {{ data.content }}
            </p>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        joined: {
            type: Boolean,
            default: false
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.instagram-message {
    display: flex;
    align-items: flex-end;

    margin-bottom: 15px;

    &:last-child {margin-bottom: 0}

    &.--send {flex-direction: row-reverse}
    &.--join {margin-bottom: 5px}

    &--picture {
        width: 40px;
        height: 40px;

        border-radius: 50%;

        overflow: hidden;

        div {
            width: 100%;
            height: 100%;

            img {
                width: 100%;
                height: 100%;

                object-fit: cover;
                object-position: center;
            }

            .instagram-message--picture_placeholder {
                width: 100%;
                height: 100%;

                background-color: $grey;
            }
        }

    }
    &--content {
        max-width: 65%;

        margin-left: 15px;
        padding: 10px 20px;

        border: {
            style: solid;
            width: 1px;
            color: $light-grey;
            radius: 5px;
        }

        p{
            @include menco-light;
            font-size: 15px;
            color: $font-color-black;
        }

        &_image {
            height: 200px;

            margin-top: 15px;

            border-radius: 5px;

            overflow: hidden;

            img {
                height: 100%;

                object-fit: contain;
                object-position: center;
            }
        }

        &.--screen {
            padding: 10px 0;
            border: none;
        }
        &.--send {
            margin-left: 0;
            margin-right: 15px;

            border-style: none;
            border-radius: 5px;
            background-color: $instagram-color;

            &.--join {margin-right: 55px}
        }
        &.--join {margin-left: 55px}
        span{
            @include menco-light;
            font-size: 12px;
            color: $font-color-grey;
            font-style: italic;
        }
    }
}


</style>
