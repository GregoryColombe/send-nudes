<template>
    <div class="messenger-conversations">
        <header>
            <button
                class="messenger-conversations--button --button"
                @click="onClosed"
            >
                <CloseIcon color="#457EEF" />
            </button>

            <p>Chats</p>
        </header>

        <section>
            <div
                class="messenger-conversations--content --scrollable"
                ref="scrollbar"
            >
                <ul :class="['messenger-conversations--content_list', {'--reverse' : isLastTemporality}]">
                    <MessengerConversation
                        v-for="(data, i) in datas"
                        :key="i"
                        :data="data"
                        @on-click="$emit('on-click', data)"
                    />
                </ul>
            </div>

            <Scrollbar
                color="#457EEF"
                container="scrollbar"
                :update="scrollbar"
            />
        </section>
    </div>
</template>

<script>
import { mapActions } from "vuex";

import CloseIcon from "~/components/Icons/CloseIcon";
import Scrollbar from "~/components/Global/Scrollbar";
import MessengerConversation from "~/components/Messenger/MessengerConversation";

import utilities from "~/mixins/utilities";
import scrollbar from "~/mixins/scrollbar";

export default {
    props: {
        datas: {
            type: Array,
            default: () =>([])
        }
    },
    components: {Scrollbar, MessengerConversation, CloseIcon},
    mixins: [utilities, scrollbar],
    data: () => ({}),
    computed: {},
    methods: {
        ...mapActions({
            setModal: "room/setModal"
        }),

        onClosed() {
            this.setModal({modal: "messages", display: false})
            this.setModal({modal: "messenger", display: false})
        }
    },
    watch: {
        datas: {
            handler() {
                this.setScrollbarSize()
            },
            deep: true
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.messenger-conversations {
    display: flex;
    flex-direction: column;

    width: 50%;
    height: 100%;

    border-radius: 5px;
    background-color: $white;

    overflow: hidden;

    header {
        display: flex;
        align-items: center;

        position: relative;

        padding: 15px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        .messenger-conversations--button {
            width: 20px;
            height: 20px;

            &:hover, &:focus, &:active {
                transform: scale(1.1);
                transition: 0.2s;
            }
        }

        p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            @include menco-light;
            font-size: 20px;
            color: $font-color-black;
        }
    }

    section {
        display: flex;
        flex-grow: 1;

        overflow: hidden;

        .messenger-conversations--content {
            width: 100%;
            height: 100%;

            overflow-y: scroll;

            &_list {
                display: flex;
                flex-direction: column;

                &.--reverse {flex-direction: column-reverse;}

                li{
                    height: 60px;

                    @include breakpoint (laptopXL){
                        height: 40px;
                    }
                }
            }
        }
    }
}
</style>
