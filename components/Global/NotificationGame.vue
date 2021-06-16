<template>
    <div class="notifications">
        <div
            v-if="temporalitiesNotifs"
            class="temporalities--puces__notification notification"
        >
            <div class="temporalities--puces__notification_logo">
                <LogoIcon :color="color" />
            </div>
            <div>
                <p>NOUVELLE TEMPORALITÉ</p>
                <p>- {{ data.name }} débloquée</p>
            </div>
        </div>

        <div
            v-else
            class="notebook--puces__notification notification" 
        >
            <div class="notebook--puces__notification_logo">
                <LogoIcon :color="color" />
            </div>
            <div>
                <p>CARNET D'ENQUÊTE</p>
                <p v-if="first">
                    {{ data.firstNotification }}
                </p>
                <p v-else>
                    {{ data.afterNotification }}
                </p>
            </div>

            <audio
                v-if="effect"
                :src="sound"
                autoplay
                @ended="onEnded"
            />
        </div>
    </div>
</template>

<script>
import LogoIcon from "~/components/Icons/LogoIcon";
export default {
    props: {
        data: {
            type: Object,
            default: ()=>{}
        },
        color: {
            type: String,
            default: "#383838"
        },
        temporalitiesNotifs : {
            type: Boolean,
            default : true
        },
        first : {
            type: Boolean,
            default : true
        },
        sound : {
            type: String,
            default : ""
        },
        effect: {
            type : Boolean,
            default :false
        }
    },
    components: {
        LogoIcon
    },
    data: () => ({}),
    computed: {},
    methods: {
        showNotif(){
            const tl = new this.$TimelineLite()

            if(this.first){
                tl.fromTo(".notification", { 
                    opacity: 0,
                },{
                    opacity : 1 ,
                    delay:1.8,
                    ease: "elastic.out(1.5, 0.6)",
                    duration:1.8,
                });
            }else{
                tl.fromTo(".notification", { 
                    opacity: 0,
                },{
                    opacity : 1 ,
                    ease: "elastic.out(1.5, 0.6)",
                    duration:1.8,
                });
            }
        }, 
        onEnded() {
            this.$emit("on-audio-ended")
        },
    },
    watch: {},
    mounted() {
        this.showNotif()
    }
}
</script>

<style lang="scss" scoped>

.temporalities,.notebook {
    position: relative;
    opacity: 0;

    &--puces {

        &__notification {
            display: flex;
            justify-content: center;

            position: absolute;
            transform: translateY(100%);

            padding: 10px 50px 10px 20px;

            border-radius: 15px;

            box-shadow: 0 0 10px 0 rgba($black, .25);
            background-color: $white;

            pointer-events: none;

            animation-duration: 0.5s;
            animation-name: changewidth;
            animation-iteration-count: infinite;
            animation-direction: alternate;  
            animation-delay: 1.8;

            z-index: 12;

            p {
                margin-left: 10px;

                @include menco-regular;
                font-size: 15px;
                color: $font-color-black;
                white-space: nowrap;

                &:first-child {margin-bottom: 5px}
                &:last-child {@include menco-light}
            }

            &_logo {
                width: 50px;
                margin-top: 2px;
            }
        }
    }
}
.temporalities--puces__notification{
 

    &:after {
        content: "";

        position: absolute;
        top: 0;
        left: 15px;
        transform: translate(0, -90%);

        width: 20px;
        height: 10px;

        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        background-color: $white;
    }
}
.notebook--puces__notification{
    top: 125px;
    right: 65px;

    align-items: center;

    &:after {
        content: "";

        position: absolute;
        top: 0;
        right: 15px;
        transform: translate(0, -90%);

        width: 20px;
        height: 10px;

        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        background-color: $white;
    }

    p{
        text-align: left;
        margin-bottom: 0;
         &:first-child {margin-bottom: 0px}
    }
}

@keyframes changewidth {
    from {
       transform: scale(1,1) 
    }

    to {
        transform: scale(1.02,1.02) ;
    }
}
</style>
