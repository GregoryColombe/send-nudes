<template>
    <div class="card-password">
        <div class="card-password--content">
            <div class="card-password--content_picture">
                <img :src="data.profile.url">
            </div>

            <h6>{{ data.name }}</h6>
            <p>Accéder aux différents réseaux sociaux :</p>
            <p>Tinder / Instagram / Twitter</p>
        </div>

        <div
            class="card-password--letters"
            v-if="!checkifLetter"
        >
            <div
                v-for="(letter, i) in password"
                :key="i"
            >
                <span>{{ letter || '' }}</span>
            </div>
        </div>

        <p :class="{ cardPasswordIndication : !checkifLetter , cardPasswordIndication2 : checkifLetter }">
            {{ indice.indice }}
        </p>

        <button
            :class="[{'card-password--button_disable' : checkPassword}, 'card-password--button --button']"
            :disabled="checkPassword"
            @click="onClick"
        >
            Connexion
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Password",
    props: {
        data: {
            type: Object,
            default: () => ({})
        },
        indice : {
            type: Object,
            default: () => ({})
        },
        indiceRead : {
            type : Boolean,
            default : false
        }
    },
    components: {},
    data: () => ({}),
    computed: {
        ...mapGetters({
            password: "room/getPassword"
        }),

        checkPassword() {
            return !this.password.every(x => x !== "")
        },

        checkifLetter(){
            return !this.password.some(x => x !== "")
        }
    },
    methods: {
        ...mapActions({
            setModal: "room/setModal"
        }),

        onClick() {
            this.$emit("on-connection")
        }
    },
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.card-password {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    width: 50%;

    padding: 0 40px;

    &--content {
        display: flex;
        flex-direction: column;
        align-items: center;

        &_picture {
            width: 80px;
            height: 80px;

            border-radius: 50%;
            overflow: hidden;

            img{
                width: 100%
            }
        }

        h6, p {
            @include menco-light;
            font-size: 12px;
            color: $font-color-black;
        }

        h6 {
            margin-top: 20px;
            margin-bottom: 10px;

            @include menco-semi-bold;
            font-size: 15px;
        }
    }
    &--letters {
        display: flex;
        margin-top: 20px;
        margin-bottom: 15px;

        div {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 85px;
            height: 120px;

            margin-left: 20px;

            border-radius: 5px;
            box-shadow: 0 5px 10px 0 rgba($black, .25);

            @include breakpoint(laptopXL){
                width: 45px;
                height: 70px;
            }

            &:first-child {margin-left: 0}
            span {
                display: block;

                @include menco-regular;
                font-size: 40px;
                color: $font-color-black;
            }
        }
    }
    .cardPasswordIndication {
        @include menco-light;
        font-size: 12px;
        text-align: center;
        color: $font-color-black;
    }
    .cardPasswordIndication2 {
        @include menco-light;
        font-size: 25px;
        text-align: center;
        color: $font-color-black;
    }
    &--button {
        width: 100%;

        margin-top: 20px;
        padding: 10px 0;

        @include menco-semi-bold;
        font-size: 15px;
        text-transform: uppercase;
        color: $font-color-white;

        border-radius: 5px;
        background-color: $messenger-color;

        &_disable {background-color: $grey}
    }
}
</style>
