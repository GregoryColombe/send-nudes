<template>
    <div class="instagram-conversations">
        <header>
            <button
                class="instagram-conversations--button --button"
                @click="setModal({modal: 'messages', display: false})"
            >
                <CloseIcon color="#FDD241" />
            </button>

            <p>Janice</p>
        </header>

        <section>
            <div
                class="instagram-conversations--content --scrollable"
                ref="scrollbar"
            >
                <ul>
                    <InstagramConversation
                        v-for="(data, i) in datas"
                        :key="i"
                        :data="data"
                        @on-click="onConversationClick"
                    />
                </ul>
            </div>

            <Scrollbar
                color="#FDD241"
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
import InstagramConversation from "~/components/Instagram/InstagramConversation";

import scrollbar from "~/mixins/scrollbar";

export default {
    props: {
        datas : {
            type: Array,
            default:() =>([])
        },
    },
    components: {
        InstagramConversation,
        CloseIcon,
        Scrollbar
    },
    mixins: [scrollbar],
    data: () => ({}),
    computed: {},
    methods: {
        ...mapActions({
            setModal: "instagram/setModal"
        }),

        onConversationClick(value) {
            this.$emit("on-click", value)
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

.instagram-conversations {
    display: flex;
    flex-direction: column;

    width: 40%;
    height: 100%;

    border-radius: 5px;
    background-color: $white;

    overflow: hidden;

    header {
        display: flex;
        align-items: center;

        position: relative;

        height: 40px;

        padding: 15px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        .instagram-conversations--button {
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

            @include menco-regular;
            font-size: 20px;
            color: $font-color-black;
        }
    }

    section {
        display: flex;
        flex-grow: 1;

        overflow: hidden;

        .instagram-conversations--content {
            width: 100%;
            height: 100%;

            overflow-y: scroll;

            ul {padding: 20px 0}
        }
    }
}
</style>
