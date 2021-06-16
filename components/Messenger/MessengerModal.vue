<template>
    <div class="messenger-modal">
        <div class="messenger-modal--container">
            <MessengerConversations
                :datas="datas"
                @on-click="onConversationClick"
            />
            <MessengerMessages
                v-if="getModal('messages')"
                :data="conversation"
            />
        </div>

        <div class="--overlay" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { TimelineMax } from "gsap";
import MessengerConversations from "~/components/Messenger/MessengerConversations";
import MessengerMessages from "~/components/Messenger/MessengerMessages";

export default {
    props: {
        datas: {
            type: Array,
            default: () => ([])
        }
    },
    components: {
        MessengerMessages,
        MessengerConversations
    },
    data: () => ({
        conversation: null
    }),
    computed: {
        ...mapGetters({
            getModal: "room/getModal",
        })
    },
    methods: {
        ...mapActions({
            setModal: "room/setModal"
        }),

        onConversationClick(value) {
            this.conversation = value

            this.setModal({modal: "messages", display: true})
        },
        animePopUp() {
            const tl = new TimelineMax()
            const element = document.querySelector(".messenger-modal--container")
            tl.from(element, { duration: 0.5,
                opacity : 0 ,
                scale: 0.9,
                ease: "elastic.out(1, 0.5)",
            });
        }
    },
    watch: {
        datas: {
            handler(val) {
                this.conversation = val.find(x => x.id === this.conversation.id)
            },
            deep: true
        }
    },
    mounted() {
        this.animePopUp()
    }
}
</script>

<style lang="scss" scoped>
.messenger-modal {
    width: 100vw;
    height: 100vh;

    position: relative;

    z-index: 9;

    &--container {
        display: flex;

        position: absolute;
        left: 50px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;

        height: 70vh;
        width: 50vw;

        @include breakpoint(laptop) {width: 80vw}
    }
}
</style>
