<template>
    <li class="twitter-comment">
        <p>{{ data.name }} <span>{{ data.username }}</span></p>
        <p>en réponse à <span>@JaniceTweet</span></p>

        <div
            class="twitter-comment--content"
            v-html="formatHtmlText(data.content)"
        />
    </li>
</template>

<script>
import utilities from "~/mixins/utilities";

export default {
    name: "TwitterComment",
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
    mounted() {}
}
</script>

<style lang="scss" scoped>
.twitter-comment {
    display: flex;
    flex-direction: column;

    padding: 15px 20px;

    border: {
        bottom: {
            style: solid;
            width: 1px;
            color: rgba($grey, .25);
        }
    }

    &:last-child {border: none}

    p {
        font-size: 15px;
        color: $black;

        &:first-child {
            @include menco-regular;

            span {
                @include menco-light;
                color: $grey;
            }
        }
        &:nth-child(2) {
            @include menco-light;
            color: $grey;
                span {
                    @include menco-light;
                    color: $grey;
                }
            }
            &:nth-child(2) {
                @include menco-light;
                color: $grey;

            span {color: $twitter-color}
        }
    }

    &--content {
        margin-top: 10px;
        @include menco-light;
        font-size: 15px;
        color: $black;
    }
}
</style>
