<template>
    <div class="instagram-modal-messages">
        <div class="instagram-modal-messages--content">
            <InstagramConversations
                :datas="datas.messages"
                @on-click="onConversationClick"
            />

            <InstagramMessages
                v-if="messages"
                :data="messages"
                @on-ended-scroll="$emit('on-ended-scroll', messages.id)"
            />
        </div>

        <div class="--overlay" />
    </div>
</template>

<script>
import InstagramConversations from "~/components/Instagram/InstagramConversations";
import InstagramMessages from "~/components/Instagram/InstagramMessages";

export default {
    props: {
        datas: {
            type: Object,
            default:() =>({})
        }
    },
    components: {
        InstagramMessages,
        InstagramConversations
    },
    data: () => ({
        messages: null
    }),
    computed: {},
    methods: {
        onConversationClick(value) {this.messages = {...this.datas.profile, ...value}},

        animePopUp() {
            const tl = new this.$TimelineLite()
            const element = document.querySelector(".instagram-modal-messages--content")
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
.instagram-modal-messages {
    width: 100vw;
    height: 100vh;

    position: relative;
    z-index: 9;

    &--content {
        opacity: 1;
        transform: scale(1);
        display: flex;

        width: 60vw;
        height: 70vh;

        position: absolute;
        top: 50%;
        left: 50px;
        transform: translateY(-50%);
        z-index: 2;

        overflow: hidden;

        @include breakpoint(laptopM){
            width: 70vw;
        }
    }
}
</style>
