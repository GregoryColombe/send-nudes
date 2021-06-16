<template>
    <div class="twitter-messages">
        <header>
            <div class="twitter-messages--profile">
                <div>
                    <img
                        v-if="datas.picture"
                        :src="datas.picture.url"
                        alt="Image profile"
                    >
                    <div
                        v-else
                        class="twitter-messages--profile_placeholder"
                    />
                </div>
            </div>

            <div>
                <p>{{ datas.name }}</p>
                <p>{{ datas.username }}</p>
            </div>
        </header>

        <section>
            <div
                class="twitter-messages--content --scrollable"
                ref="scrollbar"
            >
                <div class="twitter-messages--description">
                    <p class="twitter-messages--description_user">
                        <span>{{ datas.name }}</span> {{ datas.username }}
                    </p>
                    <p class="twitter-messages--description_text">
                        {{ datas.description }}
                    </p>

                    <div class="twitter-messages--description_infos">
                        <p><span>{{ datas.subscriptions }}</span> abonnements</p>
                        <p><span>{{ datas.subscribers }}</span> abonnées</p>
                    </div>

                    <div class="twitter-messages--description_date">
                        <img :src="require('~/assets/images/icons/calendar.svg')">
                        <p>A rejoint Twitter en {{ formatDate("MMMM YYYY", datas.date) }}</p>
                    </div>

                    <hr class="--separator">
                </div>

                <ul>
                    <TwitterMessage
                        v-for="(message, i) in messages"
                        :key="i"
                        :data="{...message, picture: datas.picture}"
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
import TwitterMessage from "~/components/Twitter/TwitterMessage"
import Scrollbar from "~/components/Global/Scrollbar"

import { mapGetters } from "vuex";
import utilities from "~/mixins/utilities";
import scrollbar from "~/mixins/scrollbar";

export default {
    props: {
        datas: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        TwitterMessage,
        Scrollbar
    },
    mixins: [utilities, scrollbar],
    data: () => ({}),
    computed: {
        ...mapGetters({
            temporality: "getTemporality"
        }),

        messages() {
            let array = [];
            const filter = this.datas.messages.filter(x => x.temporality.id <= this.temporality)

            filter.forEach(messages => {
                messages.content.forEach(item => {
                    array.push(item)
                })
            })

            return array
        }
    },
    methods: {},
    watch: {
        datas: {
            handler: function() {
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
.twitter-messages {
    display: flex;
    flex-direction: column;

    width: 60%;

    margin-left: 5px;

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

        .twitter-messages--profile {
            margin-right: 25px;

            div {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-position: center;
                    object-fit: cover;
                }
            }

            &_placeholder {
                width: 100%;
                height: 100%;

                background-color: $grey;
            }
        }

        p {
            @include menco-regular;
            font-size: 15px;
            color: $black;

            &:last-child {
                @include menco-light;
                color: $grey;
            }
        }
    }

    section {
        display: flex;
        flex-grow: 1;
        overflow-y: hidden;

        .twitter-messages--content {
            padding: 25px;
            width: 100%;
            overflow-y: scroll;

            .twitter-messages--description {
                text-align: center;

                div {
                    display: flex;
                    justify-content: center;

                    p:last-child {margin-left: 10px}
                }

                p {
                    @include menco-light;
                    font-size: 15px;
                }

                & > * {margin-bottom: 5px}
                &_user {
                    color: $grey;

                    span {
                        @include menco-regular;
                        color: $black;
                    }
                }
                &_infos {
                    color: $grey;
                    span {@include menco-regular}
                }
                &_date {
                    align-items: flex-end;
                    color: $grey;
                }
                .--separator {
                    margin-top: 20px;
                    margin-bottom: 25px;
                    height: 1px;
                    background-color: $grey;
                    border: none;
                }
            }
        }
    }
}
</style>
