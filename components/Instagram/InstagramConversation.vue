<template>
    <li
        class="instagram-conversation"
        @click="$emit('on-click', data)"
    >
        <div class="instagram-conversation--picture">
            <img
                v-if="data.picture"
                :src="data.picture.url"
                alt="Instagram profile picture"
            >
            <div class="instagram-conversation--picture_placeholder" />
        </div>

        <div class="instagram-conversation--informations">
            <p>{{ data.name }}</p>
            <p>{{ data.statut }}</p>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        data : {
            type: Object,
            default:() =>({})
        },
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
.instagram-conversation {
    display: flex;
    align-items: center;

    padding: 5px 20px;
    margin-bottom: 10px;

    width: 100%;

    &:last-child {margin-bottom: 0}
    &:hover {
        cursor: pointer;
        background-color: rgba($instagram-color, .25);
    }

    &--picture {
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
    &--informations {
        p {
            @include menco-regular;
            font-size: 18px;
            color: $font-color-black;

            &:last-child {
                margin-top: 5px;

                @include menco-light;
                font-size: 15px;
                color: $font-color-grey;
            }
        }
    }
}
</style>
