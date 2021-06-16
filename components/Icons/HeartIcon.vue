<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 19.019 15.899"
        :style="`fill: ${fill}; stroke: ${fill};`"
    >
        <g
            id="Groupe_23"
            data-name="Groupe 23"
            transform="translate(0.51 0.5)"
        >
            <path
                id="Tracé_4"
                data-name="Tracé 4"
                d="M312.563,723.493c-4.01,0-4.752,2.722-4.752,2.722s-.743-2.722-4.752-2.722-4.406,3.663-4.208,5.3,5.594,6.435,8.96,9.6c3.365-3.167,8.761-7.969,8.959-9.6S316.572,723.493,312.563,723.493Z"
                transform="translate(-298.811 -723.493)"
            />
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        fill: {
            type: String,
            default: ""
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
svg {
    fill: none;
    stroke: #383838;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1;
}
</style>
