<template>
    <div class="tinder-blocked">
        <header>
            <button
                class="--button"
                @click="setModals(false)"
            >
                <CloseIcon color="#B8605B" />
            </button>

            <h3>Noé</h3>
        </header>

        <section>
            <p>
                <span>Attention:</span>
                <br>
                ce profil est temporairement bloqué
            </p>

            <p>Vous voyez cet avertissement, c’est que vous avez bloqué ce compte, pour changer votre action vous pouvez accéder aux paramètres de votre compte et modifier votre liste noire.</p>
        </section>
    </div>
</template>

<script>
import { mapActions } from "vuex"
import CloseIcon from "~/components/Icons/CloseIcon";

export default {
    name: "TinderBlocked",
    props: {},
    components: {CloseIcon},
    data: () => ({}),
    computed: {},
    methods: {
        ...mapActions({
            setModals: "tinder/setModal"
        }),
    },
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.tinder-blocked {
    width: 60%;
    height: 100%;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    border-radius: 5px;

    background-color: $white;

    header {
        position: relative;

        padding: 20px 25px;

        box-shadow: 0 0 20px 0 rgba($black,0.25);

        h3 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            @include menco-light;
            color: $black;
            font-size: 25px;
        }

        button {
            width: 25px;
            height: 25px;

            color: $tinder-color;

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }

    section {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-grow: 1;

        text-align: center;

        padding: 0 70px 100px 70px;

        span {@include menco-regular;}
        p {
            @include menco-light;
            font-size: 15px;
            color: $black;

            margin-bottom: 30px;

            &:first-child {font-size: 17px;}
            &:last-child {margin-bottom: 0}
        }
    }
}
</style>
