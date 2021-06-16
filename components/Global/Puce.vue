<template>
    <div
        v-if="show"
        class="puce"
        :style="`top: ${y}vh; left: ${x}vw`"
        @click="onPuceClick"
    >
        <img
            :src="require('~/assets/images/icons/pucehover.svg')"
            class="croix"
        >
    </div>
</template>

<script>
export default {
    props: {
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        show: {
            type: Boolean,
            default: true
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {
        onPuceClick() {
            this.$emit("on-click")
        },
        
        onReveal(){
            const tl = new this.$TimelineLite()
         
            tl.fromTo(".puce",{
                opacity: 1,
                width: "100px",
                height: "100px",
            },
            {
                opacity: 0.9,
                duration: 1,
                repeat : 1,
                width: "30px",
                height: "30px",
                ease : "power1.out",
            });
        },
    },
    watch: {},
    mounted() {
        this.onReveal();
    }
}
</script>

<style lang="scss" scoped>
.puce {
    width: 30px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    transform: translate(-50%, -50%);

    border-radius: 50%;

    background-color: $white;

    opacity: 0.9;

    transition: all .2s ease-in-out;
    

    &:hover {
        cursor: pointer;
        width: 50px  !important;
        height: 50px  !important;
        opacity: 1  !important;

        img{
            opacity: 1;
        }
    }
    &:after {
        content: "";

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 38px;
        height: 38px;

        border: {
            style: solid;
            width: 1px;
            color: $white;
            radius: 50%;
        }
    }

    img{
        width: 25px;

        opacity: 0;

        transition: all .2s ease-in-out;

        &:hover {
            opacity: 1;
        }
    }
}
</style>
