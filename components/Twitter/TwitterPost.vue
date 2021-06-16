<template>
    <div class="twitter-post">
        <header>
            <button
                class="--button"
                @click="onClick"
            >
                <CloseIcon color="#66D0C8" />
            </button>
        </header>

        <section>
            <div class="twitter-post--profile">
                <div>
                    <img
                        v-if="data.profile"
                        :src="data.profile.url"
                    >
                    <div
                        v-else
                        class="twitter-post--profile_placeholder"
                    />
                </div>
            </div>

            <div class="twitter-post--article">
                <div class="twitter-post--article_user">
                    <h2>{{ data.name }}️</h2>
                    <h3>{{ data.username }}</h3>
                </div>

                <div class="twitter-post--article_content">
                    <p>{{ data.content }}</p>

                    <div v-if="data.picture">
                        <img :src="data.picture.url">
                    </div>
                </div>

                <div class="twitter-post--article_date">
                    <p>{{ formatDate("HH:mm", data.date) }} <span>{{ formatDate("Do MMMM YYYY", data.date) }}</span></p>
                </div>
            </div>
        </section>

        <footer>
            <div>
                <p><span>{{ data.retweets }}</span> Retweets</p>
                <p><span>{{ data.cited }}</span> Tweet cités</p>
                <p><span>{{ data.likes }}</span> J'aimes</p>
            </div>

            <div>
                <img :src="require('~/assets/images/icons/comment_twitter.svg')">
                <img :src="require('~/assets/images/icons/retweet.svg')">
                <img :src="require('~/assets/images/icons/like_twitter.svg')">
                <img :src="require('~/assets/images/icons/send_twitter.svg')">
            </div>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import utilities from "~/mixins/utilities";
import CloseIcon from "~/components/Icons/CloseIcon";

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {CloseIcon},
    mixins: [utilities],
    data: () => ({
        twitterPostNb: 0
    }),
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality"
        }),

        isEnded() {
            return this.temporality === this.temporalities[this.temporalities.length - 1].id
        },
    },
    methods: {
        ...mapActions({
            setModal: "twitter/setModal"
        }),

        onClick() {
            !this.isEnded && this.setModal({modal: "posts", display: false})
        },

        animePopUp() {
            const tl = new this.$TimelineLite()
            const element = document.querySelector(".twitter-post")
            tl.from(element, { duration: 0.5,
                opacity : 0 ,
                scale: 0.9,
                ease: "elastic.out(1, 0.5)"
            });
        },
    },
    watch: {},
    mounted() {
        this.animePopUp()
    }
}
</script>

<style lang="scss" scoped>
.twitter-post {
    width: 100%;

    border-radius: 5px;

    box-shadow: 0 0 10px 0 rgba($black,0.25);
    background-color: $white;

    header {
        padding: 15px 20px;

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
    }

    section {
        display: flex;
        padding: 25px 90px 20px 20px;

        .twitter-post--profile {
            div {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            &_placeholder {
                width: 100%;
                height: 100%;

                background-color: $grey;
            }
        }

        .twitter-post--article {
            margin-top: 10px;
            margin-left: 20px;

            flex-grow: 1;

            &_user {
                margin-bottom: 30px;
                font-size: 15px;

                h2 {
                    @include menco-semi-bold;
                    color: $black;
                }

                h3 {
                    @include menco-light;
                    color: $grey;
                }
            }
            &_content {
                p {
                    @include menco-light;
                    color: $black;
                }

                div {
                    width: 100%;
                    height: 200px;

                    border-radius: 5px;

                    margin-top: 10px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;

                        object-position: center;
                        object-fit: cover;
                    }
                }
            }
            &_date {
                margin-top: 15px;

                p {
                    @include menco-light;
                    font-size: 15px;
                    color: $grey;

                    span {margin-left: 15px}
                }
            }
        }
    }

    footer {

        div {
            display: flex;
            padding: 15px 90px;

            border: {
                top: {
                    style: solid;
                    width: 1px;
                    color: rgba($grey, .25);
                }
            }

            p {
                margin-left: 15px;

                @include menco-light;
                font-size: 15px;
                color: $black;

                &:first-child {margin-left: 0}
                span {
                    @include menco-regular;
                }
            }

            &:last-child {
                padding: 20px 90px;
                justify-content: space-between;
            }
        }
    }
}
</style>
