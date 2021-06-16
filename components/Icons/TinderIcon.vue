<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="{'--active' : active, '--full' : full}"
        viewBox="0 0 21.984 25.678"
    >
        <path
            id="Tracé_60"
            data-name="Tracé 60"
            d="M1743.059-196.2s7.864,3.2,9.073,11.061-3.8,12.617-9.073,12.617-10.716-3.2-10.716-9.765a8.952,8.952,0,0,1,5.185-8.555s-.432,3.025.864,4.148C1738.392-186.691,1744.1-187.037,1743.059-196.2Z"
            transform="translate(-1731.343 197.197)"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
        />
    </svg>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false
        },
        full: {
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
svg {
    stroke: $grey;
    fill: transparent;

    &.--active {stroke: $tinder-color}

    &.--full {
        fill: $tinder-color;
        stroke: none
    }
}
</style>
