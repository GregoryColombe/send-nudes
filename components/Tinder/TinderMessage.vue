<template>
    <li :class="[{'--send' : data.me}, {'--join' : joined}]">
        <div>
            <p>{{ data.text }}</p>
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
li {
    display: flex;
    justify-content: flex-start;

    div {
        max-width: 70%;

        background-color: $light-grey;

        padding: 15px;
        margin-bottom: 15px;

        border-radius: 10px 10px 10px 0;

        p {
            font-size: 15px;
            @include menco-light;
        }
    }

    &.--send {
        justify-content: flex-end;

        div {
            background-color: $tinder-color;
            border-radius: 10px 10px 0 10px;

            p {color: $white}
        }
    }
    &.--join {
        div {
            margin-bottom: 5px;
        }
    }

    &:last-child {
        div {margin-bottom: 0}
    }
}
</style>
