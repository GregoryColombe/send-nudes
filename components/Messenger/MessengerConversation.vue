<template>
    <li
        :class="['messenger-conversation', {'--disable' : data.blocked}]"
        @click="$emit('on-click')"
    >
        <div class="messenger-conversation--picture">
            <div>
                <img
                    v-if="data.picture"
                    :src="data.picture.url"
                    alt="Image profile messenger"
                >
                <div
                    v-else
                    class="messenger-conversation--picture_placeholder"
                />
            </div>
        </div>

        <div class="messenger-conversation--content">
            <p><strong>{{ data.name }}</strong></p>
            <p>{{ lastMessagesReceived }}</p>
        </div>
    </li>
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
    computed: {
        lastMessagesReceived() {
            const conversation = this.data.conversations[this.data.conversations.length - 1]

            return conversation.messages[conversation.messages.length - 1].content
        }
    },
    methods: {},
    watch: {},
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.messenger-conversation {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding: 10px 20px;

    border-bottom: 1px solid $light-grey;

    &:hover {
        cursor: pointer;
        background-color: rgba($messenger-color, .25);
    }
    &:last-child {border-bottom: none}

    &.--disable {
        background-color: rgba($grey, .5);
        pointer-events: none;
    }

    &--picture {
        div {
            border-radius: 50%;

            width: 40px;
            height: 40px;

            overflow: hidden;

            img {
                width: 100%;
                height: 100%;

                object-fit: cover;
                object-position: center;
            }
        }

        &_placeholder {
            width: 100%;
            height: 100%;

            background-color: $grey;
        }
    }
    &--content {
        overflow: hidden;

        margin-left: 10px;

        p {
            margin-bottom: 5px;

            @include menco-light;
            font-size: 15px;
            color: $font-color-black;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            &:last-child {margin-bottom: 0}
            strong {@include menco-regular}
        }
    }
}
</style>
