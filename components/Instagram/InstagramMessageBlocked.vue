<template>
    <div class="instagram-message-blocked">
        <div>
            <p><strong>Attention :</strong></p>
            <p>ce profil est temporairement bloqué</p>
        </div>

        <div>
            <p>
                Vous voyez cet avertissement, c’est que vous avez bloqué ce compte, pour changer votre action vous pouvez accéder aux paramètres de votre compte et modifier votre liste noire.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "InstagramMessageBlocked",
    props: {},
    components: {},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.instagram-message-blocked {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;

    div {
        width: 60%;
        margin-bottom: 20px;

        &:last-child {margin-bottom: 0}
        p {
            @include menco-light;
            font-size: 15px;
            text-align: center;
            line-height: 18px;

            strong {
                @include menco-semi-bold;
            }
        }
    }

}
</style>
