<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 9 9"
        :style="`fill: ${color}`"
    >
        <path
            id="Polygone_1"
            data-name="Polygone 1"
            d="M4.5,0,9,9H0Z"
            transform="translate(9) rotate(90)"
        />
    </svg>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: "#fff"
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {
    }
}
</script>

<style lang="scss" scoped>

</style>
