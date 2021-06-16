<template>
    <div class="pedagogie">
        <canvas id="background" />
        <header>
            <NuxtLink to="/">
                <div class="pedagogie-logo">
                    <img :src="require('~/assets/images/icons/logo.svg')">
                </div>
            </NuxtLink>
            
            <div
                class="pedagogie-text"
                v-html="formatHtmlText(datas.explication)"
            />
        </header>

        <section class="pedagogie-notifications">
            <Notification
                v-for="(notification, i) in notificationLaptop.notifications"
                :key="i"
                :data="notification"
                :class="`notification-${i+1}`"
            />
        </section>

        <footer>
            <router-link
                :to="{name: 'credits'}"
            >
                <button
                    class="--button"
                    @mouseenter="onMouseEnter(false)"
                    @mouseleave="onMouseLeave(false); onReveal(1,false)"
                >
                    Crédit
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


            <button
                class="--button"
                @mouseenter="onMouseEnter(true)"
                @mouseleave="onMouseLeave(true); onReveal(1,true)"
            >
                Partager l'enquête
                <div class="square">
                    <span class="left-side2" />
                    <span class="top-side2" />
                    <span class="right-side2" />
                    <span class="bottom-side2" />
                </div>
                <div class="squareHover">
                    <span class="left-sideHover2" />
                    <span class="top-sideHover2" />
                    <span class="right-sideHover2" />
                    <span class="bottom-sideHover2" />
                </div>
            </button>
        </footer>

        <audio 
            ref="soundNotif"
            src=""
        />
    </div>
</template>

<script>
import Notification from "~/components/Global/Notification";
import utilities from "~/mixins/utilities";

import animBtn from "~/class/animationBtn";
import backgroundNoise from "~/class/backgroundNoise";
import animNotifs from "~/class/animationNotif";

export default {
    name: "Pedagogie",
    props: {},
    components: {
        Notification,
    },
    mixins:[utilities],
    data: () => ({
        datas : {},
        notificationLaptop: {
            notifications: []
        },
        iSound: 0,
        audioList: []
    }),
    async asyncData({ $pedagogie }) {
        return {
            datas : await $pedagogie.getDatas(),
        }
    },
    computed: {},
    methods: {
        onReveal(counter,btn){
            const tl = new this.$TimelineLite()

            if(counter === 0){
                tl.fromTo(".pedagogie-logo , footer",{
                    opacity: 0,
                    y: -50
                },
                {
                    opacity: 1,
                    delay: 0,
                    duration: 2,
                    ease:"sine.out" ,
                    y: 0
                }); 
            
                tl.fromTo(".pedagogie-text",{
                    opacity: 0,
                    x: 120
                }, 
                {
                    opacity: 1, 
                    x : 35,
                    ease:"power4.out",
                    duration: 1.5
                });

            }

            const animeBtn = new animBtn(counter,btn);
            animeBtn.anim
        },

        onMouseEnter(btn){
            const animeBtn = new animBtn(1,btn);
            animeBtn.mouseEnter
        },

        onMouseLeave(btn){
            const animeBtn = new animBtn(1,btn);
            animeBtn.mouseLeave
        },

        animeNotifications() {
            const animeNotificatons = new animNotifs(this.datas.notifications, this.notificationLaptop,this.audioList,this.iSound,this.$refs.soundNotif);
            animeNotificatons.popup 
        },

        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        onHoverBtn(){
            let all = document.querySelectorAll(".notification");
            const tl = new this.$TimelineLite()
            for(let i = all.length; i--;){
                all[i].addEventListener("mouseenter", e => {
                    tl.to( e.target,{
                        scale : 1.07,
                        duration : 0.1,
                        cursor : "pointer",
                        ease : "power1.out"
                    });
                });

                all[i].addEventListener("mouseleave", e => {
                    tl.to( e.target,{
                        scale : 1,
                        duration : 0.2,
                        ease : "power1.out"
                    });
                });
            }
        },
    },
    watch: {},
    mounted() {
        this.animeNotifications()
        this.onReveal(0,false);
        this.onReveal(0,true);
        backgroundNoise(200,200)

        this.sleep(13000).then(() =>  {
            this.onHoverBtn()
        });
    },

    beforeRouteLeave(to, from, next) {
        this.$refs.soundNotif.muted = true

        let tl = new this.$TimelineLite({ onComplete: next })
        const header = document.getElementsByTagName("header")
        const pedagogieNotifications = document.querySelector(".pedagogie-notifications")
        const footer = document.getElementsByTagName("footer")

        tl.to(footer, {
            duration: 0.5,
            opacity: 0,
            ease: "Power2.easeOut",
            delay: 0.25
        })

        tl.to(pedagogieNotifications, {
            duration: 1,
            opacity: 0,
            ease: "Power2.easeOut",
        })

        tl.to(header, {
            duration: 1,
            opacity: 0,
            ease: "Power2.easeOut",
        })
    }
}
</script>

<style lang="scss" scoped>
canvas{
    top: 0;
    left: 0;
}
.pedagogie{
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100vw;

    padding: 8vh 5vw;
    box-sizing: border-box;

    background-color: black;
    overflow: hidden;

    position: relative;

    header {
        display: flex;

        width: 100%;
        height: 8vh;

        a{
            width: 10%;
        }

        .pedagogie-logo {
            height: 100%;
            opacity: 0;

            img{
                height: 100%;
                object-fit: contain;
            }
        }

        .pedagogie-text{
            height: 100%;
            width: 80%;
            opacity: 0;

            color: $font-color-white;

            padding-left: 40px;
            margin-left: 40px;

            border-left: 1px solid $white;


            ::v-deep {
                p {
                    font-size: 22px;
                    line-height: 22px;
                    @include menco-ultra-light;

                    strong {
                        @include menco-semi-bold;
                    }

                    @include breakpoint (laptopM){
                        font-size: 18px;
                    }
                }
            }
        }
    }

    section {
        position: relative;
        width: 100%;
        flex-grow: 1;

        .notification{
            width: 500px;
            cursor : default;

            @include breakpoint(laptopXL){width: 410px}
            @include breakpoint(laptopM){width: 330px}

        }
        
        
    }

    footer {
        display: flex;
        opacity: 0;

        
        .--button {
                text-transform: uppercase;
                @include menco-regular;
                font-size: 1.5vw;

                color: $font-color-white;

                padding: 0.5vw 2vw;
                
                &:first-child{margin-right: 40px}

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
                    .bottom-sideHover,
                    .left-side2,
                    .top-side2,
                    .right-side2,
                    .bottom-side2 ,
                    .left-sideHover2,
                    .top-sideHover2,
                    .right-sideHover2,
                    .bottom-sideHover2{
                        position: absolute;
                        background: none transparent;
                    }

                    .left-side,.left-sideHover ,.left-side2,.left-sideHover2  {
                        left: 0;
                        bottom: 0;
                    }

                    .top-side,.top-sideHover , .top-side2,.top-sideHover2 {
                        top: 0;
                        left: 0;
                    }
é
                    .right-side ,.right-sideHover , .right-side2 ,.right-sideHover2{
                        right: 0;
                        top: 0;
                    }

                    .right-side{
                        right: 0;
                        top: 0;
                        position: absolute;
                        background: none transparent;
                        width: 2px;
                        height: 100%;

                    }

                    .bottom-side ,.bottom-sideHover ,.bottom-side2 ,.bottom-sideHover2{
                        bottom: 0;
                        right: 0;
                    }
                }
        }
    }
}

</style>
