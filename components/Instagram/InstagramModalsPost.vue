<template>
    <div class="instagram-posts">
        <div class="instagram-posts--content">
            <InstagramPost :picture="datas.post.url" />

            <InstagramComments :datas="datas" />
        </div>

        <div class="--overlay" />
    </div>
</template>

<script>
import { TimelineMax } from "gsap";
import InstagramPost from "~/components/Instagram/InstagramPost";
import InstagramComments from "~/components/Instagram/InstagramComments";

export default {
    props: {
        datas: {
            type: Object,
            default:() =>({})
        },
    },
    components: {InstagramComments, InstagramPost},
    data: () => ({}),
    computed: {},
    methods: {
        animePopUp() {
            const tl = new TimelineMax()
            const element = document.querySelector(".instagram-posts--content")
            tl.from(element, { duration: 0.5,
                opacity : 0 ,
                scale: 0.9,
                ease: "elastic.out(1, 0.5)",
            });
        }
    },
    watch: {},
    mounted() {
        this.animePopUp()
    }
}
</script>

<style lang="scss" scoped>

.instagram-posts {
    width: 100vw;
    height: 100vh;

    position: relative;
    z-index: 9;

    &--content {
        display: flex;

        width: 70vw;
        height: 70vh;

        position: absolute;
        left: 50px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;

        border-radius: 5px;
        overflow: hidden;

        @include breakpoint (laptopM){
            width: 80vw;
        }
    }
}
</style>
