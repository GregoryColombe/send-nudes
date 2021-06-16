<template>
    <div class="twitter-comments">
        <div
            class="twitter-comments--container --scrollable"
            ref="scrollbar"
            :style="`height: ${height}px`"
        >
            <ul>
                <TwitterComment
                    v-for="(comment, i) in data.comment"
                    :key="i"
                    :data="comment"
                />
            </ul>
        </div>

        <Scrollbar
            container="scrollbar"
            color="#66D0C8"
            :update="height"
            @on-ended-scroll="$emit('on-ended-scroll')"
        />
    </div>
</template>

<script>
import { TimelineMax } from "gsap";
import TwitterComment from "~/components/Twitter/TwitterComment"
import Scrollbar from "~/components/Global/Scrollbar";

export default {
    name: "TwitterComments",
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        height: {
            type: Number,
            default: 0
        }
    },
    components: {
        TwitterComment,
        Scrollbar
    },
    data: () => ({}),
    computed: {},
    methods: {
        animePopUp() {
            const tl = new TimelineMax()
            const element = document.querySelector(".twitter-comments")
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
.twitter-comments {
    display: flex;
    width: 70%;

    margin-left: 10px;

    border-radius: 5px;

    box-shadow: 0 0 10px 0 rgba($black,0.25);
    background-color: $white;
    overflow: hidden;

    &--container {
        width: 100%;
        flex-grow: 1;
        overflow-y: scroll;
    }
}
</style>
