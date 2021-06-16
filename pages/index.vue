<template>
    <div class="home">
        <canvas id="background" />

        <div class="home-loader">
            <div class="home-loader_bar--top" />
            <div class="home-loader_bar--right" />
            <div class="home-loader_bar--bottom" />
            <div class="home-loader_bar--left" />
        </div>

        <div
            class="home-modal"
            v-if="!allowSound && !mobile && datas"
        >
            <div class="home-modal--content">
                <div class="home-modal--content_icon">
                    <img :src="require('~/assets/images/icons/iconCasque.svg')">
                </div>
                <div
                    class="home-modal--content_text"
                    v-html="formatHtmlText(datas.warning_headphones_before)"
                />
                <button
                    class="--button"
                    @mouseenter="onMouseEnter()"
                    @mouseleave="onMouseLeave(); onReveal(1)"
                    @click="closeModal(); animeNotifications();"
                >
                    Accéder à l'expérience
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
            </div>
        </div>

        <div class="home-container">
            <div class="home-container--logo">
                <img
                    :src="require('~/assets/images/icons/logo.svg')"
                    alt="logo de Send Nudes"
                >
            </div>
            <div
                class="home-container--content"
                v-if="!mobile && allowSound && datas"
            >
                <router-link :to="{name: 'introduction'}">
                    <button
                        class="--button"
                        @click="onStart"
                        @mouseenter="onMouseEnter()"
                        @mouseleave="onMouseLeave(); onReveal(1)"
                    >
                        Commencer l'enquête
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
                <div class="home-container--content_icon">
                    <img :src="require('~/assets/images/icons/iconCasque.svg')">
                </div>
                <div
                    class="home-container--content_text"
                    v-html="formatHtmlText(datas.warning_headphone)"
                />
            </div>

            <div
                class="home-container--content"
                v-else
            >
                <div class="home-container--content_icon">
                    <img :src="require('~/assets/images/icons/iconOrdi.svg')">
                </div>
                <div
                    class="home-container--content_text"
                    v-html="formatHtmlText(datas.warning_computer)"
                />
            </div>
        </div>

        <div
            class="home-notifications"
        >
            <div
                class="home-notifications-mobile"
                v-if="this.mobile && !allowSound && notificationMobile && notificationLaptop"
            >
                <Notification
                    v-for="(notification, i) in notificationMobile.notifications"
                    :key="i"
                    :data="notification"
                    class="notif-mobile"
                    ref="notifMobile"
                />
            </div>
            <div
                class="home-notifications-laptop"
            >
                <Notification
                    v-for="(notification, i) in notificationLaptop.notifications"
                    :key="i"
                    :data="notification"
                    :class="`notification-${i+1}`"
                />
            </div>
        </div>

        <audio
            ref="soundNotif"
            src=""
        />
    </div>
</template>

<script>
import Notification from "~/components/Global/Notification";
import utilities from "~/mixins/utilities";
import animNotifs from "~/class/animationNotif";
import animBtn from "~/class/animationBtn";
import backgroundNoise from "~/class/backgroundNoise";

export default {
    name: "Home",
    props: {},
    components: {
        Notification
    },
    mixins:[utilities],
    data: () => ({
        allowSound : false,
        mobile: "",
        datas: {},
        iSound: 0,
        audioList: [],
        notificationLaptop: {
            notifications: []
        },
        notificationMobile: {
            notifications: []
        },
    }),
    async asyncData({ $home }) {
        return {
            datas: await $home.getDatas(),
        }
    },
    computed: {},
    methods: {
        init() {
            window.addEventListener("resize", this.onWindowSize);
            this.onWindowSize();

            backgroundNoise()
            this.onReveal(0);

            if(this.mobile){
                setTimeout(() => {
                    for (let i = 0; i <= this.datas.notifications.length; ++i) {
                        this.animMobile(this.datas.notifications, i);
                    }
                }, 1200);
            }
        },

        onWindowSize() {
            window.innerWidth >= 1024 ? this.mobile = false : this.mobile = true
        },

        onReveal(counter){
            const tl = new this.$TimelineLite()

            if(counter===0){
                tl.fromTo(".home-container, .home-modal",{
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

        onStart() {
            this.$cookies.removeAll()
        },

        closeModal(){
            const tl = new this.$TimelineLite()

            tl.to(".home-modal", {
                duration: 1,
                opacity: 0,
                ease:"power4.out"
            });

            setTimeout(() => {
                this.allowSound = true;

                tl.fromTo(".home-container", {
                    opacity: 0,
                    y : -50
                },{
                    opacity: 1,
                    y: 0,
                    duration:1.5,
                    ease:"power4.out"
                });
            }, 1200);

        },

        animeNotifications() {
            const animeNotificatons = new animNotifs(this.datas.notifications, this.notificationLaptop,this.audioList,this.iSound,this.$refs.soundNotif);
            animeNotificatons.popup
        },

        animMobile(array, i) {
            setTimeout(() => {
                if (i <= array.length) {
                    this.notificationMobile.notifications.push(array[i])
                }

                const tl = new this.$TimelineLite()

                if(this.$refs.notifMobile){
                    tl.to(".home-container", {
                        position:"absolute"
                    });
                    tl.to(".notif-mobile", {
                        duration: 2,
                        opacity : 1 ,
                        scale: 1,
                        ease: "elastic.out(1.5, 0.6)",
                    });
                    tl.to(".home-notifications-mobile", {
                        duration: 2.7,
                        ease : "circ.in",
                        y:-522,
                    });
                }
            }, 1300 * i);
        },

        startLoader() {
            const tl = new this.$TimelineLite()

            tl.to(".home-loader_bar--top",{
                duration: 1.5,
                width: "80%",
                delay: 1,
                ease:"sine.out" ,
            });

            tl.to(".home-loader_bar--right",{
                duration: 1,
                height: "80%",
                delay: 0.05,
                ease:"sine.out" ,
            });

            tl.to(".home-loader_bar--bottom",{
                duration: 1,
                width: "80%",
                delay: 0.05,
                ease:"sine.out" ,
            });

            tl.to(".home-loader_bar--left",{
                duration: 1,
                height: "80%",
                delay: 0.05,
                ease: "Power2.easeOut",
            });

            setTimeout(() => {
                window.addEventListener("load", this.loaderFadeOut());
            }, 1000);
        },

        loaderFadeOut() {
            const tl = new this.$TimelineLite()

            tl.to(".home-loader_bar--top, .home-loader_bar--right, .home-loader_bar--bottom, .home-loader_bar--left",{
                duration: 1,
                opacity: 0,
                delay: 0.05,
                ease: "Power2.easeOut",
            });

            tl.to(".home-loader",{
                duration: 2.5,
                opacity: 0,
                display: "none",
                delay: 0.05,
                ease: "Power2.easeIn",
            })
        },
    },
    watch: {},
    mounted() {
        this.startLoader()

        setTimeout(() => {
            window.addEventListener("load", this.init());
        }, 2000)
    },
    beforeDestroy() {
        document.removeEventListener("resize", this.onWindowSize);
    },
    beforeRouteLeave(to, from, next) {
        this.$refs.soundNotif.muted = true;

        let tl = new this.$TimelineLite({ onComplete: next })

        tl.to(".home-notifications", {
            duration: 1,
            opacity: 0,
            ease: "Power2.easeOut",
        })

        tl.to(".home-container", {
            duration: 2,
            opacity: 0,
            ease: "Power2.easeOut",
        })
    }
};
</script>

<style lang="scss" scoped>
.home {
    width: 100vw;
    height: 100vh;
    position: relative;
    margin: 0;
    overflow: hidden;
    background-color: $black;

    &-loader {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
        background-color: #000;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        &_bar {

            &--top {
                position: absolute;
                left: 10%;
                top: 10%;
                width: 0;
                height: 2px;
                background-color: #fff;
                content: " ";
            }

            &--right {
                position: absolute;
                right: 10%;
                bottom: 10%;
                top: 10%;
                width: 2px;
                height: 0;
                background-color: #fff;
                content: " ";
            }
            &--bottom {
                position: absolute;
                right: 10%;
                bottom: 10%;
                margin: 0;
                width: 0;
                height: 2px;
                background-color: #fff;
                content: " ";
            }
            &--left {
                position: absolute;
                left: 10%;
                bottom: 10%;
                width: 2px;
                height: 0;
                background-color: #fff;
                content: " ";
            }
        }
    }

    &-modal {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 1000;

        color: $font-color-white;

        &--content {
            display: flex;
            flex-direction: column;
            align-items: center;

            margin-top: 5vh;

            &_icon {
                width: 3vw;
                margin-bottom: 2vh;
                z-index: 2;

                img{
                    width: 100%;
                    object-fit: contain;
                }
            }

            &_text {
                @include menco-ultra-light;
                text-align: center;
                width: 20vw;
                z-index: 2;
            }

        }
    }

    &-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: relative;
        margin-top: 5vh;
        z-index: 1000;


        color: $font-color-white;

        &--logo {
            width: 25%;

            @include breakpoint(mobileL) {width: 50%;}

            img{
                width: 100%;
                object-fit: contain;
            }
        }

        &--content {
            display: flex;
            flex-direction: column;
            align-items: center;

            &_icon {
                width: 2.5vw;
                margin-top: 5vh;
                margin-bottom: 2vh;

                @include breakpoint(laptop) {width: 3vw}
                @include breakpoint(tablet) {width: 5vw}
                @include breakpoint(mobileL) {width: 10vw}

                img{
                    width: 100%;
                    object-fit: contain;
                }
            }
            &_text {
                @include menco-ultra-light;
                text-align: center;

                :first-child{margin-bottom: 1vh}

                @include breakpoint(tablet) {
                    width: 40%;

                    :first-child{margin-bottom: 3vh}
                }
                @include breakpoint(mobileL) {width: 50%}
            }
        }
    }

    &-notifications-mobile{
        opacity: 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        overflow: hidden;

        @include breakpoint(laptop) {
            display: flex;
            flex-direction: column;

            padding: 20px;

            overflow-y: auto;

            .notification{
                transform: scale(0.8);
                width: 100%;
                box-sizing: border-box;

                position: static;

                margin-bottom: 10px;

                &:last-child{margin-bottom: 0}
            }
        }
    }

    &-notifications-laptop{
         @include breakpoint(laptop) {opacity: 0;}
    }
}

.--button {
    text-transform: uppercase;
    @include menco-regular;
    font-size: 2vw;
    color: $font-color-white;

    padding: 0.5vw 2vw;
    margin-top: 2.5vh;

    position:relative;
    z-index: 2;

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
        .bottom-side{
            position: absolute;
            background: $white;
        }

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
            width: 2px;
            height : 100%;
        }

        .top-side,.top-sideHover {
            top: 0;
            left: 0;
            height: 2px;
            width : 100%;
        }

        .right-side ,.right-sideHover{
            right: 0;
            top: 0;
            width: 2px;
            height : 100%;
        }

        .bottom-side ,.bottom-sideHover{
            bottom: 0;
            right: 0;
            height: 2px;
            width : 100%;
        }
    }
}

</style>
