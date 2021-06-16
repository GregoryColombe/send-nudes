<template>
    <div class="tinder-messages">
        <div class="tinder-messages--content">
            <header>
                <button
                    class="--button"
                    @click="setModals(false)"
                >
                    <CloseIcon color="#B8605B" />
                </button>

                <h3>{{ name }}</h3>
            </header>

            <section
                class="--scrollable"
                ref="scrollbar"
            >
                <div
                    v-for="(data, i) in messages"
                    :key="`date-${i}`"
                >
                    <p class="tinder-messages--date">
                        <span>{{ formatDate("dddd DD MMMM", data.date) }}</span>,
                        {{ formatDate("HH:mm", data.date) }}
                    </p>

                    <ul>
                        <TinderMessage
                            v-for="(message, x) in data.contents"
                            :key="`message-${x}`"
                            :data="message"
                            :joined="joinDatas(data.contents, x)"
                        />
                    </ul>
                </div>
            </section>
        </div>

        <Scrollbar
            color="#B8605B"
            container="scrollbar"
            :update="scrollbar"
            @on-ended-scroll="$emit('on-ended-scroll')"
        />
    </div>
</template>

<script>
import Scrollbar from "~/components/Global/Scrollbar";
import TinderMessage from "~/components/Tinder/TinderMessage";

import { mapActions, mapGetters } from "vuex";

import utilities from "~/mixins/utilities";
import scrollbar from "~/mixins/scrollbar";
import CloseIcon from "~/components/Icons/CloseIcon";

export default {
    props: {
        name: {
            type: String,
            default: ""
        },
        datas: {
            type: Array,
            default: () => ([])
        }
    },
    components: {
        CloseIcon,
        TinderMessage,
        Scrollbar
    },
    mixins: [utilities, scrollbar],
    data: () => ({}),
    computed: {
        ...mapGetters({
            temporality: "getTemporality"
        }),

        messages() {
            return this.datas.filter(x => x.temporality.id <= this.temporality)
        }
    },
    methods: {
        ...mapActions({
            setModals: "tinder/setModal"
        }),

        joinDatas(array, index) {
            let join = false

            if(array[index + 1]) {
                if(array[index + 1].me === array[index].me) {
                    join = true
                }
            }

            return join
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
    mounted() {}
}
</script>

<style lang="scss" scoped>
.tinder-messages {
    width: 60%;
    height: 100%;

    display: flex;
    overflow: hidden;

    border-radius: 5px;

    background-color: $white;

    &--content {
        display: flex;
        flex-direction: column;

        width: 100%;

        overflow: hidden;


        header {
            position: relative;

            padding: 20px 25px;

            box-shadow: 0 0 20px 0 rgba($black,0.25);

            h3 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                @include menco-light;
                color: $black;
                font-size: 25px;
            }

            button {
                width: 25px;
                height: 25px;

                color: $tinder-color;

                &:hover, &:focus, &:active {
                    transform: scale(1.1);
                    transition: 0.2s;
                }

                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        section {
            flex-grow: 1;

            padding: 20px 25px 25px 25px;

            overflow-y: auto;

            .tinder-messages--date {
                margin: 15px 0;

                @include menco-light;
                font-size: 15px;
                text-align: center;

                span {
                    @include menco-regular;
                }
            }
        }
    }
}
</style>

