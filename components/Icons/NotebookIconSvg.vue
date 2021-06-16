<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23.311"
        height="23.518"
        viewBox="0 0 23.311 23.518"
    >
        <g
            id="Groupe_199"
            data-name="Groupe 199"
            transform="translate(0.4 0.4)"
        >
            <path
                id="Tracé_64"
                data-name="Tracé 64"
                d="M402.27,321.9l-.722-.728a2.3,2.3,0,0,0-1.633-.684h-.009a2.3,2.3,0,0,0-1.629.671L386.946,332.4h0a.465.465,0,0,0-.058.07h0a.46.46,0,0,0-.042.078l0,0a.483.483,0,0,0-.017.049l-1.358,4.67a.468.468,0,0,0,.577.581l4.68-1.322.047-.016,0,0a.463.463,0,0,0,.078-.041h0a.466.466,0,0,0,.072-.059h0l11.331-11.242a2.314,2.314,0,0,0,.013-3.272Zm-4.668,1.246,2.663,2.684-9.665,9.59-2.663-2.684Zm-10.1,10.481,2.2,2.22-3.1.876Zm14.1-9.12-.669.664-2.663-2.684.669-.664a1.368,1.368,0,0,1,.97-.4h.006a1.368,1.368,0,0,1,.973.407l.722.728a1.377,1.377,0,0,1-.008,1.948Z"
                transform="translate(-380.43 -320.486)"
                fill="#457eef"
                :stroke="color"
                stroke-width="0.8"
            />
            <path
                id="Tracé_65"
                data-name="Tracé 65"
                d="M344.205,394.528a.468.468,0,0,0-.468.468v5.2a1.15,1.15,0,0,1-1.148,1.149H328.544A1.15,1.15,0,0,1,327.4,400.2V387.14a1.15,1.15,0,0,1,1.148-1.148h5.364a.468.468,0,0,0,0-.936h-5.364a2.087,2.087,0,0,0-2.084,2.084V400.2a2.087,2.087,0,0,0,2.084,2.085h14.045a2.087,2.087,0,0,0,2.084-2.085V395A.468.468,0,0,0,344.205,394.528Z"
                transform="translate(-326.46 -379.562)"
                fill="#457eef"
                :stroke="color"
                stroke-width="0.8"
            />
        </g>
    </svg>
</template>

<script>

export default {
    props: {
        color : {
            type: String,
            default: "#457EEF"
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
