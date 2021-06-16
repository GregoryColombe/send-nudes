<template>
    <li class="instagram-comment">
        <div class="instagram-comment--content">
            <p>
                <span>{{ data.name }}</span>
                {{ data.content }}
            </p>

            <div class="instagram-comment--content_infos">
                <p class="date">
                    {{ data.date }}
                </p>
                <p>{{ data.impression }} mentions j’aime</p>
            </div>
        </div>

        <div class="instagram-comment--like">
            <HeartIcon
                fill="#FDD241"
                v-if="data.like"
            />
            <HeartIcon v-else />
        </div>
    </li>
</template>

<script>
import HeartIcon from "~/components/Icons/HeartIcon";

export default {
    props: {
        data : {
            type: Object,
            default:() =>({})
        },
    },
    components: {HeartIcon},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.instagram-comment {
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-bottom: 20px;

    &:last-child{margin-bottom: 0}

    &--content {
        width: calc(100% - 15px);

        p {
            padding-right: 10px;

            @include menco-light;
            font-size: 15px;
            line-height: 18px;
            color: $font-color-black;

            span {
                @include menco-regular;
                margin-right: 10px;
            }
        }
        &_infos {
            display: flex;

            margin-top: 5px;

            p {
                @include menco-light;
                color: $font-color-grey;
                font-size: 12px;

                &:last-child {color: $font-color-grey}
            }

            .date{
                font-size: 10px;
            }
        }
    }
    &--like {width: 15px}
}
</style>
