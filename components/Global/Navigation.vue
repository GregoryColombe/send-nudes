<template>
    <div class="navigation">
        <router-link
            v-for="(route, i) in routes"
            :key="i"
            :to="{name: route}"
            class="--button"
        >
            <p
                v-if="matched(route)"
                :class="`--${route}`"
            >
                {{ route }}
            </p>
            <div>
                <TwitterIcon
                    v-if="route === 'twitter'"
                    :active="matched(route)"
                />
                <TinderIcon
                    v-if="route === 'tinder'"
                    :active="matched(route)"
                />
                <InstagramIcon
                    v-if="route === 'instagram'"
                    :active="matched(route)"
                />
            </div>
        </router-link>
    </div>
</template>

<script>
import InstagramIcon from "~/components/Icons/InstagramIcon";
import TinderIcon from "~/components/Icons/TinderIcon";
import TwitterIcon from "~/components/Icons/TwitterIcon";

export default {
    props: {},
    components: {
        TwitterIcon,
        TinderIcon,
        InstagramIcon
    },
    data: () => ({
        routes: ["tinder", "instagram", "twitter"],
    }),
    computed: {},
    methods: {
        matched(name) {
            return this.$route.matched.some(x => x.name === name)
        }
    },
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.navigation {
    display: flex;
    justify-content: center;

    position: absolute;
    bottom: 12vh;
    z-index: 8;

    width: 100%;

    a {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-left: 30px;
        padding: 10px;

        border-radius: 50%;
        background-color: $white;

        transition: .3s;

        &:hover, &:focus {transform: scale(1.1)}
        &:first-child {margin-left: 0}
        &.nuxt-link-exact-active {
            border-radius: 100px;

            padding: 10px 50px;

            &:hover {transform: scale(1)}
        }

        p {
            @include menco-regular;
            font-size: .95rem;
            color: $font-color-black;

            margin-right: .25rem;

            &:first-letter {text-transform: uppercase}

            &.--instagram {color: $instagram-color}
            &.--tinder {color: $tinder-color}
            &.--twitter {color: $twitter-color}
        }
        div {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 1.25rem;
            height: 1.25rem;
        }
    }
}
</style>
