<template>
    <div
        class="tinder-modals"
        v-if="modals"
    >
        <div class="tinder-modals--container">
            <TinderBlocked v-if="isBlocked" />
            <TinderMessages
                v-else
                :name="datas.name"
                :datas="datas.messages"
                @on-ended-scroll="$emit('on-ended-scroll')"
            />

            <TinderProfile :data="datas" />
        </div>

        <div class="--overlay" />
    </div>
</template>

<script>
import { TimelineMax } from "gsap";
import { mapGetters } from "vuex"

import TinderProfile from "~/components/Tinder/TinderProfile"
import TinderMessages from "~/components/Tinder/TinderMessages";
import TinderBlocked from "~/components/Tinder/TinderBlocked";

export default {
    props: {
        datas: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        TinderBlocked,
        TinderProfile,
        TinderMessages
    },
    data: () => ({}),
    computed: {
        ...mapGetters({
            temporality: "getTemporality",
            modals: "tinder/getModal"
        }),

        isBlocked() {
            let blocked = false;

            if(this.datas.blocked && this.datas.blocked <= this.temporality) {
                blocked = true
            }

            return blocked
        }
    },
    methods: {
        animePopUp() {
            const tl = new TimelineMax()
            const element = document.querySelector(".tinder-modals--container")
            tl.from(element, { duration: 0.5,
                opacity : 0 ,
                scale: 0.9,
                ease: "elastic.out(1, 0.5)",
            });
        }
    },
    watch: {},
    mounted() {
        this.animePopUp()
    }
}
</script>

<style lang="scss" scoped>
.tinder-modals {
    width: 100vw;
    height: 100vh;

    position: relative;

    z-index: 9;

    &--container {
        display: flex;

        @include modals-position;

        height: 70vh;
        width: 50vw;

        @include breakpoint(laptop) {width: 80vw}

        .tinder-messages, .tinder-blocked {
            position: absolute;
            left: 0;
            top: 0;

            box-shadow: 0 0 10px 0 rgba($black,0.25);
        }
        .tinder-profile {
            position: absolute;
            right: -30px;
            top: 0;

            box-shadow: 0 0 10px 0 rgba($black,0.25);
        }
    }
}
</style>

