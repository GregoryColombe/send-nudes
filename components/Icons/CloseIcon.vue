<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27.099 25.542"
        :style="`stroke: ${color}`"
    >
        <g
            id="Groupe_193"
            data-name="Groupe 193"
            transform="translate(-205.022 -214.729)"
        >
            <path
                id="Tracé_3"
                data-name="Tracé 3"
                d="M324.065,1441.767l-11.429,10.355,11.429,10.945"
                transform="translate(-94.065 -1224.917)"
            />
            <path
                id="Tracé_46"
                data-name="Tracé 46"
                d="M324.065,1441.767l-11.429,10.355,11.429,10.945"
                transform="translate(531.208 1679.917) rotate(180)"
            />
        </g>
    </svg>
</template>

<script>

export default {
    props: {
        color : {
            type: String,
            default: "white"
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
svg {
    width: 100%;
    height: 100%;

    fill:none;

    color: red;

    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3px;
}
</style>
