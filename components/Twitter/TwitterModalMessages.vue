<template>
    <div class="twitter-modal-messages">
        <div class="twitter-modal-messages--content">
            <TwitterConversations
                :datas="datas"
                @on-click="onConversationClick"
            />

            <TwitterMessages
                v-if="data"
                :datas="data"
            />
        </div>

        <div class="--overlay" />
    </div>
</template>

<script>
import { TimelineMax } from "gsap";

import TwitterMessages from "~/components/Twitter/TwitterMessages";
import TwitterConversations from "~/components/Twitter/TwitterConversations";

export default {
    props: {
        datas: {
            type: Array,
            default: () => ([])
        }
    },
    components: {
        TwitterConversations,
        TwitterMessages,
    },
    data: () => ({
        data: null
    }),
    computed: {},
    methods: {
        onConversationClick(value) {
            this.data = value
        },

        animePopUp() {
            const tl = new TimelineMax()
            const element = document.querySelector(".twitter-modal-messages")
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
.twitter-modal-messages {
    width: 100vw;
    height: 100vh;

    position: absolute;
    z-index: 9;

    display: flex;

    &--content {
        position: absolute;
        left: 5vw;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;

        display: flex;
        height: 70vh;
        width: 60vw;

        @include breakpoint(laptopM) {width: 75vw}
    }
}
</style>
