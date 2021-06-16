<template>
    <div class="instagram-picture">
        <button
            class="instagram-picture--button --button"
            @click="setModal({modal: 'post', display: false})"
        >
            <CloseIcon color="#FDD241" />
        </button>

        <div class="instagram-picture--content">
            <img
                :src="picture"
                alt="Instagram Post"
            >
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

import CloseIcon from "~/components/Icons/CloseIcon";

export default {
    props: {
        picture: {
            type: String,
            default: ""
        }
    },
    components: {CloseIcon},
    data: () => ({}),
    computed: {},
    methods: {
        ...mapActions({
            setModal: "instagram/setModal"
        })
    },
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.instagram-picture {
    width: 55%;
    height: 100%;

    position: relative;

    &--button {
        width: 20px;
        height: 20px;

        position: absolute;
        left: 20px;
        top: 20px;

        &:hover, &:focus, &:active {
            transform: scale(1.1);
            transition: 0.2s;
        }
    }
    &--content {
        width: 100%;
        height: 100%;

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
}
</style>
