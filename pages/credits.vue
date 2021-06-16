<template>
    <div class="credits">
        <canvas id="background" />
        <header>
            <router-link :to="{name: 'pedagogie'}">
                <CloseIcon color="#FFFFFF" />
            </router-link>

            <h3>Crédit</h3>
        </header>

        <section>
            <div
                class="credits-category"
                v-for="(category, i) in datas"
                :key="`category-${i}`"
            >
                <p class="category">
                    {{ category['Domaine'] }}
                </p>

                <Notification
                    v-for="(notification, x) in category.notifications"
                    :key="`notifications-${x}`"
                    :data="notification"
                />
            </div>
        </section>
        <footer>
            <router-link
                :to="{name: 'credits'}"
            >
                <img
                    :src="require('~/assets/images/icons/logo-gobelins.png')"
                    alt="logo de Send Nudes"
                >
            </router-link>
        </footer>
    </div>
</template>

<script>
import Notification from "~/components/Global/Notification";
import CloseIcon from "~/components/Icons/CloseIcon";
import { TimelineMax } from "gsap";
import backgroundNoise from "~/class/backgroundNoise";

export default {
    name: "Credits",
    props: {},
    components: {
        Notification,
        CloseIcon
    },
    data: () => ({
        datas: {},
        datasCopied: {
            notifications: []
        },
    }),
    async asyncData({ $credits }) {
        return {
            datas: await $credits.getDatas()
        }
    },
    computed: {},
    methods: {
        onReveal(){
            const tl = new this.$TimelineLite()

            tl.fromTo("header , footer , section",{
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
            

            setTimeout(() => {
                this.animeNotifications()
            },1300)
        },

        animeNotifications() {
            const tl = new TimelineMax()
            const element = document.querySelectorAll(".notification")
            tl.fromTo(element, { 
                opacity:0
            },{
                duration: 0.5, 
                opacity : 1 ,
                scale: 1.1,
                stagger:0.25,
                ease: "elastic.out(1, 0.5)",
            });
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
                        scale : 1.2,
                        duration : 0.1,
                        cursor : "pointer",
                        ease : "power1.out"
                    });
                });
        
                all[i].addEventListener("mouseleave", e => {
                    tl.to( e.target,{
                        scale : 1.1,
                        duration : 0.2,
                        ease : "power1.out"
                    });
                });
            }
        },

    },
    watch: {},
    mounted() {
        window.addEventListener("resize", this.onWindowSize);
        
        backgroundNoise(200,200)
        this.onReveal();

        this.sleep(4800).then(() =>  {
            this.onHoverBtn()
        });
    }
}
</script>


<style lang="scss">
canvas{
    z-index: -1;
}
.credits {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;

    overflow: hidden;

    header{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;

        width: 100%;
        padding-top: 5vh;
        position: absolute;
        z-index: 2;

        a {
            width: 20px;
            height: 20px;

            margin-bottom: 20px;

            &:hover, &:focus, &:active {
                transform: scale(1.1);
                transition: 0.2s;
            }

            @include breakpoint (laptopM){
                margin-bottom: 10px;
            }
        }
        h3{
            @include menco-regular;
            font-size: 25px;
            color: $font-color-white;

            @include breakpoint (laptopM){
                font-size: 20px;
            }
        }
    }

    section {
        column-count: 2;
        width: 100%;
        height: 100%;
        margin-top: 5%;
        overflow: hidden;

        .credits-category {
            display: flex;
            flex-direction: column;
            align-items: center;

            margin-bottom: 60px;
            &:last-child {margin-bottom: 0}

            @include breakpoint (laptopM){
                margin-bottom: 20px;
            }

            .category {
                @include menco-light;
                font-size: 1.2rem;
                color: $font-color-white;
                margin-bottom: 10px;
            }

            .notification {
                position: static;
                margin-bottom: 22px;

                &:last-child {margin-bottom: 0}

                @include breakpoint (laptopM){
                    margin-bottom: 10px;
                }
            }
        }
    }
    footer{
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 5vh;;

        a{
            img{
                height: 85px;
            }
        }
    }
}
</style>
