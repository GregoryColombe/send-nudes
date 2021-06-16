<template>
    <li :class="['twitter-message', {'--send' : data.me}]">
        <div
            class="twitter-message--profile"
            v-if="!data.me"
        >
            <div>
                <img
                    v-if="data.picture"
                    :src="data.picture.url"
                    alt="Image profile"
                >
                <div
                    v-else
                    class="twitter-message--profile_placeholder"
                />
            </div>
        </div>

        <div class="twitter-message--content">
            <div>
                <p>{{ data.text }}</p>
            </div>

            <p class="twitter-message--content_date">
                {{ formatDate("Do MMM YYYY à HH:mm", data.date) }}
            </p>
        </div>
    </li>
</template>

<script>
import utilities from "~/mixins/utilities";

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    mixins: [utilities],
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.twitter-message {
    display: flex;
    align-items: flex-end;

    margin-bottom: 15px;

    &:last-child {margin-bottom: 0}
    &--profile {
        div {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 15px;

            img {
                width: 100%;
                height: 100%;
                object-position: center;
                object-fit: cover;
            }
        }

        &_placeholder {
            width: 100%;
            height: 100%;

            background-color: $grey;
        }
    }
    &--content {
        display: flex;
        flex-direction: column;
        margin-left: 15px;

        div {
            width: 80%;
            padding: 10px;
            background-color: $light-grey;
            border-radius: 10px 10px 10px 0;

            p {
                @include menco-light;
                font-size: 15px;
                color: $black;
            }
        }

        &_date {
            @include menco-light;
            font-size: 12px;
            color: $grey;
            margin-top: 5px;
        }
    }

    &.--send {
        justify-content: flex-end;

        .twitter-message--content {
            align-items: flex-end;

            div {
                border-radius: 10px 10px 0 10px;
                background-color: $twitter-color;

                p {color: $white}
            }
        }
    }
}
</style>
