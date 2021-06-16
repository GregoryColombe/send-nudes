<template>
    <li
        class="twitter-conversation"
        @click="$emit('on-click', data)"
    >
        <div class="twitter-conversation--picture">
            <div>
                <img
                    v-if="data.picture"
                    :src="data.picture.url"
                    alt="Image profile"
                >
                <div
                    v-else
                    class="twitter-conversation--picture_placeholder"
                />
            </div>
        </div>

        <div class="twitter-conversation--content">
            <div class="twitter-conversation--content_info">
                <p>
                    {{ data.name }} <span class="username">{{ data.username }}</span>
                </p>
                <p class="date">
                    {{ formatDate("Do MMMM", data.messages[0].content[0].date) }}
                </p>
            </div>

            <div class="twitter-conversation--content_text">
                <p>{{ data.messages[0].content[0].text }}</p>
            </div>
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
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.twitter-conversation {
    display: flex;
    align-items: center;

    padding: 15px 20px;

    border: {
        bottom: {
            style: solid;
            width: 1px;
            color: rgba($grey, .25);
        }
    }

    transition: .3s;

    &:hover {
        cursor: pointer;
        background-color: rgba($twitter-color, .25);
        transition: .3s
    }
    &:last-child {border: none}
    &--picture {
        div {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;

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
        flex-grow: 1;
        margin-left: 20px;
        overflow: hidden;

        &_info {
            display: flex;
            justify-content: space-between;

            margin-bottom: 5px;

            p {
                @include menco-regular;
                font-size: 15px;

                span {color: $grey;}
                &:first-child {color: $black}
                &:last-child {color: $grey}
            }
            .date , .username{
                 @include menco-light;
            }
        }

        &_text {
            p {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                @include menco-light;
                font-size: 15px;
                color: $black;
            }
        }
    }
}
</style>
