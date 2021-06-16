<template>
    <div class="instagram-messages">
        <header>
            <div class="instagram-messages--picture">
                <img
                    v-if="data.picture"
                    :src="data.picture.url"
                    alt="Instagram profile picture"
                >
                <div class="instagram-messages--picture_placeholder" />
            </div>

            <p>
                <strong>{{ data.name }}</strong>
                <span>•</span>
                {{ data.statut }}
            </p>
        </header>

        <section>
            <div
                class="instagram-messages--container --scrollable"
                ref="scrollbar"
                v-if="!isBlocked"
            >
                <div
                    class="instagram-messages--container_content"
                    v-for="(container, i) in messages"
                    :key="`date-${i}`"
                >
                    <p class="instagram-messages--container_content__date">
                        {{ formatDate("Do MMMM YYYY • HH:mm", container.date) }}
                    </p>

                    <ul>
                        <InstagramMessage
                            v-for="(message, x) in container.message"
                            :key="`message-${x}`"
                            :data="{...message, profile_received: data.picture, profile_send: data.profile}"
                            :joined="joinDatas(container.message, x)"
                        />
                    </ul>
                </div>
            </div>
            <div
                class="instagram-messages--container --scrollable"
                ref="scrollbar"
                v-else
            >
                <InstagramMessageBlocked />
            </div>


            <Scrollbar
                container="scrollbar"
                color="#FDD241"
                :update="scrollbar"
                @on-ended-scroll="$emit('on-ended-scroll')"
            />
        </section>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import InstagramMessage from "~/components/Instagram/InstagramMessage";
import Scrollbar from "~/components/Global/Scrollbar";

import utilities from "~/mixins/utilities";
import scrollbar from "~/mixins/scrollbar";
import InstagramMessageBlocked from "~/components/Instagram/InstagramMessageBlocked";

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        InstagramMessageBlocked,
        InstagramMessage,
        Scrollbar
    },
    data: () => ({}),
    mixins: [utilities, scrollbar],
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality",
            datas: "getDatas"
        }),

        messages() {
            const filter = this.temporalities.find(x => x.id === this.temporality)

            return this.data.conversation.filter(x => x.temporality.id <= filter.id)
        },
        isBlocked() {
            return this.datas.instagram_blockeds.some(x => x.id === this.data.id)
        }
    },
    methods: {
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
        data: {
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
.instagram-messages {
    display: flex;
    flex-direction: column;

    width: 60%;
    height: 100%;

    margin-left: 5px;

    border-radius: 5px;
    background-color: $white;

    overflow: hidden;

    header {
        display: flex;
        align-items: center;

        padding: 15px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        .instagram-messages--picture {
            width: 40px;
            height: 40px;

            border-radius: 50%;

            margin-right: 10px;

            overflow: hidden;

            img {
                width: 100%;
                height: 100%;

                object-fit: cover;
                object-position: center;
            }

            &_placeholder {
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

        .instagram-messages--container {
            width: 100%;

            padding: 40px 25px;

            overflow-y: scroll;

            &_content {
                margin-top: 20px;

                &:first-child {margin-top: 0}
                &__date {
                    margin-bottom: 10px;


                    @include menco-light;
                    text-align: center;
                    font-size: 15px;
                    color: $font-color-grey;

                    &:last-child {margin-bottom: 0}
                }
            }
        }
    }
}
</style>
