<template>
    <div class="twitter-conversations">
        <header>
            <button
                class="--button"
                @click="setModal({modal: 'messages', display: false})"
            >
                <CloseIcon color="#66D0C8" />
            </button>

            <h3>Messages</h3>
        </header>

        <section>
            <div
                class="twitter-conversations--content --scrollable"
                ref="scrollbar"
            >
                <ul>
                    <TwitterConversation
                        v-for="(data, i) in datas"
                        :key="i"
                        :data="data"
                        @on-click="onClick"
                    />
                </ul>
            </div>

            <Scrollbar
                container="scrollbar"
                color="#66D0C8"
                :update="scrollbar"
            />
        </section>
    </div>
</template>

<script>
import { mapActions } from "vuex";

import Scrollbar from "~/components/Global/Scrollbar"
import TwitterConversation from "~/components/Twitter/TwitterConversation";

import scrollbar from "~/mixins/scrollbar";
import CloseIcon from "~/components/Icons/CloseIcon";

export default {
    props: {
        datas: {
            type: Array,
            default: () => ([])
        }
    },
    components: {
        CloseIcon,
        TwitterConversation,
        Scrollbar
    },
    mixins: [scrollbar],
    data: () => ({}),
    computed: {},
    methods: {
        ...mapActions({
            setModal: "twitter/setModal"
        }),

        onClick(value) {
            this.$emit("on-click", value)
        },
    },
    watch: {
        datas: {
            handler() {
                this.setScrollbarSize()
            },
            deep: true
        }
    },
    mounted() {},
    beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.twitter-conversations {
    display: flex;
    flex-direction: column;

    width: 43%;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba($black,0.25);
    background-color: $white;



    header {
        display: flex;
        align-items: center;

        padding: 15px 25px;

        border: {
            bottom: {
                style: solid;
                width: 1px;
                color: rgba($grey, .25);
            }
        }

        button {
            width: 20px;
            height: 20px;

            font-size: 20px;
            color: $twitter-color;
        }

        h3 {
            @include menco-regular;
            font-size: 20px;
            color: $black;

            margin-left: 20px;
        }
    }

    section {
        display: flex;
        flex-grow: 1;
        overflow: hidden;

        .twitter-conversations--content {
            width: 100%;
            overflow-y: scroll;
        }
    }
}
</style>
