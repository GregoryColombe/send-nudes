<template>
    <div class="instagram-comments">
        <header>
            <div>
                <img
                    v-if="datas.profile"
                    :src="datas.profile.url"
                    alt="Instagram profile picture"
                >
                <div v-else />
            </div>

            <p>
                <strong>{{ datas.name }}</strong>
                <span>•</span>
                {{ datas.status }}
            </p>
        </header>

        <section>
            <div
                class="instagram-comments--container --scrollable"
                ref="scrollbar"
            >
                <ul>
                    <InstagramComment
                        v-for="(comment, i) in commentaries"
                        :key="i"
                        :data="comment"
                    />
                </ul>
            </div>

            <Scrollbar
                container="scrollbar"
                color="#FDD241"
                :update="scrollbar"
            />
        </section>

        <footer>
            <div class="instagram-comments--stats">
                <div>
                    <p>
                        <span>
                            <HeartIcon />
                        </span>
                        {{ stats.likes }}
                    </p>

                    <p>
                        <span>
                            <CommentIcon />
                        </span>
                        {{ stats.comments }}
                    </p>

                    <p>
                        <span>
                            <ShareIcon />
                        </span>
                        {{ stats.share }}
                    </p>
                </div>

                <div>
                    <div>
                        <SaveIcon />
                    </div>
                </div>
            </div>
            <div class="instagram-comments--description">
                <p>
                    <span>{{ datas.name }}</span>
                    {{ datas.description }}
                </p>
            </div>
            <div class="instagram-comments--date">
                <p>{{ stats.date }}</p>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import HeartIcon from "~/components/Icons/HeartIcon";
import CommentIcon from "~/components/Icons/CommentIcon";
import ShareIcon from "~/components/Icons/ShareIcon";
import SaveIcon from "~/components/Icons/SaveIcon";

import InstagramComment from "~/components/Instagram/InstagramComment";

import Scrollbar from "~/components/Global/Scrollbar";

import scrollbar from "~/mixins/scrollbar";

export default {
    props: {
        datas : {
            type: Object,
            default:() =>({})
        },
    },
    components: {
        InstagramComment,
        SaveIcon,
        ShareIcon,
        CommentIcon,
        HeartIcon,
        Scrollbar
    },
    data: () => ({
    }),
    mixins: [scrollbar],
    computed: {
        ...mapGetters({
            temporality: "getTemporality"
        }),

        commentaries() {
            return this.datas.commentaries.filter(x => x.temporality.id <= this.temporality)
        },
        stats() {
            return this.datas.stats.find(x => x.temporality.id === this.temporality)
        }
    },
    methods: {},
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
.instagram-comments {
    display: flex;
    flex-direction: column;

    width: 45%;
    height: 100%;

    background-color: $white;

    

    header {
        display: flex;
        align-items: center;

        padding: 15px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        div {
            width: 40px;
            height: 40px;

            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;

                object-fit: cover;
                object-position: center;
            }

            div {
                width: 100%;
                height: 100%;

                background-color: $grey;
            }
        }

        p {
            margin-left: 15px;

            @include menco-light;
            font-size: 15px;
            color: $font-color-black;

            strong {
                @include menco-regular;
                font-size: 20px;
            }
            span {
                display: inline-block;
                margin: 0 10px;
            }
        }
    }

    section {
        display: flex;
        flex-grow: 1;

        overflow: hidden;

        .instagram-comments--container {
            height: 100%;
            width: 100%;

            overflow-y: scroll;

            ul {padding: 25px}
        }
    }

    footer {
        display: flex;
        flex-direction: column;

        padding: 15px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        .instagram-comments--stats {
            display: flex;
            justify-content: space-between;

            div {
                display: flex;
                align-items: center;

                div {width: 12px;}

                p {
                    margin-right: 15px;
                    

                    @include menco-light;
                    font-size: 18px;
                    color: $font-color-black;

                    

                    span {
                        display: inline-block;
                        width: 15px;
                    }
                }
            }
        }
        .instagram-comments--description {
            margin-top: 20px;

            p {
                @include menco-light;
                font-size: 15px;
                color: $font-color-black;

                span {
                    display: inline-block;

                    margin-right: 10px;

                    @include menco-regular;
                }
            }
        }
        .instagram-comments--date {
            margin: 10px 0;

            p {
                @include menco-light;
                font-size: 15px;
                text-transform: uppercase;
                color: $font-color-grey;
            }
        }
    }
}
</style>
