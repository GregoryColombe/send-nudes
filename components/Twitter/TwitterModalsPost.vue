<template>
    <div class="twitter-modal">
        <div
            :class="[{'--extend' : datas.comment.length === 0}, 'twitter-modal--content']"
            :style="setPositions"
        >
            <div class="twitter-modal--content__post">
                <TwitterPost
                    ref="twitter-post"
                    :data="datas"
                />

                <button
                    v-if="isLastTemporality"
                    :disabled="!signaled"
                    :class="[{'--signaled' : !signaled}, 'twitter-modal--content__post_signaled', '--button']"
                    @click="$emit('on-signaled')"
                >
                    <span>signaler</span>
                </button>
            </div>

            <TwitterComments
                v-if="datas.comment.length !== 0"
                :data="datas"
                :height="height"
                @on-ended-scroll="$emit('on-ended-scroll', datas.id)"
            />
        </div>

        <div class="--overlay" />
    </div>
</template>

<script>
import { mapGetters } from "vuex"

import TwitterPost from "~/components/Twitter/TwitterPost"
import TwitterComments from "~/components/Twitter/TwitterComments"

import utilities from "~/mixins/utilities";

export default {
    props: {
        datas: {
            type: Object,
            default: () => ({})
        },
        signaled: {
            type: Boolean,
            default: false
        }
    },
    components: {
        TwitterComments,
        TwitterPost
    },
    mixins: [utilities],
    data: () => ({
        height: null
    }),
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality"
        }),

        setPositions() {
            let style = "";

            if(this.datas.fixed) {
                style = "top: 50%; left: 5vw; transform: translateY(-50%);"
            } else {
                style = `top: ${this.datas.y}%; left: ${this.datas.x}%; transform: translate(-50%, -50%);`
            }

            return style
        }
    },
    methods: {
        setHeight() {
            this.$nextTick(() => {
                this.height = this.$refs["twitter-post"].$el.clientHeight
            })
        },

       
    },
    watch: {},
    mounted() {
        this.setHeight()
        window.addEventListener("resize", this.setHeight)
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setHeight)
    }
}
</script>

<style lang="scss" scoped>
.twitter-modal {
    position: absolute;
    z-index: 9;

    display: flex;

    width: 100vw;
    height: 100vh;

    &--content {
        display: flex;

        width: 70vw;

        position: absolute;
        left: 50px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;

        @include breakpoint(laptopM) {width: 80vw}

        &.--extend {
            width: 40vw;

            .twitter-modal--post {width: 100%}
        }

        &__post {
            width: 100%;

            &_signaled {
                position: absolute;
                bottom: 20%;
                right: 0;
                transform: translate(30%, 50%);

                border-radius: 100px;
                padding: 5px 40px;

                background-color: $twitter-color;
                box-shadow: 0 10px 15px 0 rgba($black, 0.25);

                &.--signaled {
                    background-color: $grey;

                    &:hover {cursor: default}
                }

                span {
                    @include menco-regular;
                    font-size: 15px;
                    color: $white;
                }
            }
        }
    }
}
</style>