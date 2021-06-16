<template>
    <div class="tinder-profile">
        <div
            class="tinder-profile--image"
            ref="tinderImage"
        >
            <img
                v-if="data.picture"
                :src="data.picture.url"
                alt="Image Profile Tinder"
            >
        </div>

        <div class="tinder-profile--content">
            <h3>{{ data.name }} <span v-if="data.age">, {{ data.age }}</span></h3>

            <div>
                <p v-if="data.job">
                    <span>
                        <img
                            :src="require('~/assets/images/icons/suitcase.svg')"
                            alt="suitcase icon"
                        >
                    </span>
                    {{ data.job }}
                </p>
                <p v-if="data.studie">
                    <span>
                        <img
                            :src="require('~/assets/images/icons/graduationCap.svg')"
                            alt="graduationCap icon"
                        >
                    </span>
                    {{ data.studie }}
                </p>
                <p v-if="data.location">
                    <span>
                        <img
                            :src="require('~/assets/images/icons/mapMarker.svg')"
                            alt="mapMarker icon"
                        >
                    </span>
                    {{ data.location }}
                </p>
            </div>

            <hr>

            <div
                class="tinder-profile--content_description"
                v-html="formatHtmlText(data.description)"
            />
        </div>
    </div>
</template>

<script>
import utilities from "~/mixins/utilities"

export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    mixins: [utilities],
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {
        const { tinderImage } = this.$refs

        tinderImage.style.height = tinderImage.offsetWidth + "px"

        window.addEventListener("resize", () => {
            tinderImage.style.height = tinderImage.offsetWidth + "px"
        })
    }
}
</script>

<style lang="scss" scoped>
.tinder-profile {
    width: 40%;

    overflow: hidden;

    border-radius: 5px;

    background-color: $white;

    &--image {
        background-color: $grey;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;

            object-fit: cover;
        }
    }
    &--content {
        color: $black;

        margin: 15px 25px 20px 25px;

        h3 {
            @include menco-light;
            font-size: 20px;

            margin-bottom: 10px;
        }
        hr {
            height: 1px;

            margin: 15px 0 10px 0;

            border: none;

            background-color: $light-grey;
        }
        div {

            span {
                display: inline-block;

                width: 20px;
                margin-right: 5px;

                svg {
                    display: block;

                    margin: 0 auto;
                }
            }

            p {
                display: flex;
                align-items: center;

                @include menco-light;
                font-size: 15px;
                color: $black;

                margin-bottom: 5px;
            }
        }

        &_description {
            @include menco-light;
            font-size: 12px;
            color: $black
        }
    }
}
</style>
