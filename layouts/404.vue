<template>
    <div class="error">
        <canvas id="background" />
        <div class="error-container">
            <div class="error-container-notification">
                <div>
                    <LogoIcon />
                </div>

                <h1>Erreur 404</h1>
            </div>

            <p>Vous êtes perdu.</p>

            <router-link to="/">
                <button
                    class="--button"
                    @mouseenter="onMouseEnter()"
                    @mouseleave="onMouseLeave(); onReveal(1)"
                >
                    Retourner en lieu sûr
                    <div class="square">
                        <span class="left-side" />
                        <span class="top-side" />
                        <span class="right-side" />
                        <span class="bottom-side" />
                    </div>
                    <div class="squareHover">
                        <span class="left-sideHover" />
                        <span class="top-sideHover" />
                        <span class="right-sideHover" />
                        <span class="bottom-sideHover" />
                    </div>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import LogoIcon from "~/components/Icons/LogoIcon";
import backgroundNoise from "~/class/backgroundNoise";
import animBtn from "~/class/animationBtn";

export default {
    name: "Error",
    props: {},
    components: {
        LogoIcon
    },
    data: () => ({}),
    computed: {},
    methods: {
        onReveal(counter){
            const tl = new this.$TimelineLite()

            if(counter===0){
                tl.fromTo(".error-container",{
                    opacity: 0,
                    y: -100
                },
                {
                    opacity: 1,
                    delay: 0.25,
                    duration: 1.5,
                    ease:"sine.out" ,
                    y: 0
                });
            }

            const animeBtn = new animBtn(counter);
            animeBtn.anim
        },
        
        onMouseEnter(){
            const animeBtn = new animBtn();
            animeBtn.mouseEnter
        },

        onMouseLeave(){
            const animeBtn = new animBtn();
            animeBtn.mouseLeave
        },
    },
    watch: {},
    mounted() {
        this.onReveal(0);

        backgroundNoise(200,200)
    }
}
</script>

<style lang="scss" scoped>
.error {
    width: 100vw;
    height: 100vh;

    position: relative;

    overflow: hidden;
    
    &-container{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;

        width: 100vw;
        height: 90vh;

    
        &-notification {
            display: inline-flex;
            align-items: center;

            padding: 25px;
            margin-bottom: 20px;

            background-color: rgba($white, 0.5);

            border-radius: 10px;
            z-index: 2;

            @include breakpoint(tablet) {
                    width: 60vw;
            }

            div {
                width: 100px;

                @include breakpoint(tablet) {
                    width: 90px
                }

                @include breakpoint(mobileL) {
                    width: 60px;
                }
            }

            h1 {
                margin-left: 50px;

                @include menco-regular;
                text-transform: uppercase;
                font-size: 60px;
                color: $font-color-white;

                @include breakpoint(tablet) {
                    font-size: 30px;
                    margin-left: 0;
                    width: 100%;
                    text-align: center
                }

                @include breakpoint(mobileL) {
                    font-size: 20px;
                }
            }
        }

        p {
            @include menco-light;
            font-size: 1.8rem;
            color: $font-color-white;

             z-index: 2;
        }
        .--button {
                text-transform: uppercase;
                @include menco-regular;
                font-size: 2vw;

                color: $font-color-white;

                padding: 0.5vw 2vw;
                margin-top: 29vh;

                position:relative;

                @include breakpoint(tablet) {
                    font-size: 4vw;
                }

                @include breakpoint(mobileL) {
                    font-size: 6vw;
                }

                .square , .squareHover{
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 100%;
                    height: 100%;

                    .left-side,
                    .top-side,
                    .right-side,
                    .bottom-side ,
                    .left-sideHover,
                    .top-sideHover,
                    .right-sideHover,
                    .bottom-sideHover{
                        position: absolute;
                        background: none transparent;
                    }

                    .left-side,.left-sideHover  {
                        left: 0;
                        bottom: 0;
                    }

                    .top-side,.top-sideHover {
                        top: 0;
                        left: 0;
                    }

                    .right-side ,.right-sideHover{
                        right: 0;
                        top: 0;
                    }

                    .bottom-side ,.bottom-sideHover{
                        bottom: 0;
                        right: 0;
                    }
                }
        }
    }
}
</style>
