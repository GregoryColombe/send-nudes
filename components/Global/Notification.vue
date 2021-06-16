<template>
    <div
        v-if="data.socials"
        class="notification"
        ref="notification"
        :style="{top: `${data.y}%`, left: `${data.x}%`}"
    >
        <div class="notification-socials">
            <TwitterIcon
                :full="true"
                v-if="data.socials === 'twitter'"
            />
            <InstagramIcon
                :full="true"
                v-if="data.socials === 'instagram'"
            />
            <TinderIcon
                :full="true"
                v-if="data.socials === 'tinder'"
            />
        </div>

        <div class="notification-text">
            <h6>{{ data.socials }}</h6>
            <p> {{ data.content }} </p>
        </div>
    </div>

    <a
        v-else
        :href="data.url"
        target="_blank"
        class="notification"
        :style="{top: `${data.y}%`, left: `${data.x}%`}"
    >

        <div class="notification-icon">
            <LogoIcon :color="data.icon" />
        </div>

        <div class="notification-text">
            <h6>{{ data.titre }}</h6>
            <p> {{ data.content }} </p>
        </div>

    </a>
</template>

<script>
import LogoIcon from "~/components/Icons/LogoIcon";
import TwitterIcon from "~/components/Icons/TwitterIcon";
import InstagramIcon from "~/components/Icons/InstagramIcon";
import TinderIcon from "~/components/Icons/TinderIcon";


export default {
    props: {
        data : {
            type: Object,
            default:() =>({})
        },
    },
    components: {
        LogoIcon,
        TwitterIcon,
        TinderIcon,
        InstagramIcon
    },
    data: () => ({
        mobile: true
    }),
    computed: {},
    methods: {},
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.notification{
    opacity: 0;
    display: flex;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;

    width: 370px;

    padding: 10px 15px;

    background-color: $hard-grey;
    border-radius: 10px;

    transform : scale(0.9,0.9);

    @include breakpoint(laptopM){
        width: 230px;
    }

    @include breakpoint(laptopXL){
        width: 330px;
    }

    &-socials{
        width: 35px;
        height: 35px;

        margin-right: 15px;

        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        @include breakpoint(laptopM){
            width: 25px;
            height: 25px;
        }
    }

    &-icon {
        width: 80px;
        margin-right: 15px;

        @include breakpoint(laptopXL){
            width: 60px;
        }
        
    }

    &-text {
        font-size: 18px;
        color: $black;

        h6{
            @include menco-regular;
            text-transform: uppercase;
            @include breakpoint(laptopM){
            font-size: 14px;
        }
        }
        p{
            font-size: 20px;
            @include breakpoint(laptopXL){
                font-size: 16px;
            }
            @include menco-light;
            @include breakpoint(laptopM){
                font-size: 12px;
            }
        }

    }
}
</style>
