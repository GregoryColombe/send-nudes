<template>
    <div class="computer">
        <div class="computer--container">
            <header>
                <button
                    class="--button"
                    @click="setModal({modal: 'account', opacity: false})"
                >
                    <CloseIcon color="#457EEF" />
                </button>

                <h2>Connexion</h2>
            </header>

            <section>
                <CardPassword
                    v-if="modal('password')"
                    :data="accountActivable"
                    :indice="this.datas"
                    @on-connection="onConnection"
                />

                <div
                    class="computer--connection"
                    v-else
                >
                    <CardAccount
                        v-for="(account, i) in accounts"
                        :key="i"
                        :data="account"
                        @on-click="onAccountSelected(i)"
                    />
                </div>
            </section>
        </div>

        <div class="--overlay" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import CloseIcon from "~/components/Icons/CloseIcon";
import CardAccount from "~/components/Room/CardAccount";
import CardPassword from "~/components/Room/CardPassword"

export default {
    props: {
        datas: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        CloseIcon,
        CardAccount,
        CardPassword
    },
    data: () => ({
        accounts: [],
    }),
    computed: {
        ...mapGetters({
            modal: "room/getModal"
        }),

        accountActivable() {
            return this.accounts.filter(x => x.activable)[0]
        }
    },
    methods: {
        ...mapActions({
            setModal: "room/setModal"
        }),

        onAccountSelected(index) {
            this.accounts[index].disable = true

            this.accounts[index].id === this.accountActivable.id && this.setModal({modal: "password", display: true})

            this.$emit("on-click", this.accounts[index].id)
        },
        onConnection() {
            this.$emit("on-click", "connection")
        },

        animePopUp() {
            const tl = new this.$TimelineLite()
            const element = document.querySelector(".computer--container")
            tl.from(element, { duration: 0.5,
                opacity : 0 ,
                scale: 0.9,
                ease: "elastic.out(1, 0.5)",
            });
        }
    },
    watch: {},
    mounted() {
        this.accounts = this.datas.content.map(x => ({...x, disable: false}))
        this.animePopUp()
    }
}
</script>

<style lang="scss" scoped>
.computer {
    width: 100vw;
    height: 100vh;

    position: relative;

    z-index: 9;

    &--container {
        width: 55vw;
        height: 70vh;

        display: flex;
        flex-direction: column;

        position: absolute;
        left: 50px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;

        border-radius: 5px;
        background-color: $white;

        overflow: hidden;

        @include breakpoint(laptop) {width: 80vw}

        header {
            display: flex;
            align-items: center;

            position: relative;

            padding: 20px 15px;
            box-shadow: 0 0 10px 0 rgba($black, .25);

            button {
                width: 20px;
                height: 20px;

                &:hover, &:focus, &:active {
                    transform: scale(1.1);
                    transition: 0.2s;
                }
            }

            h2 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                @include menco-light;
                font-size: 20px;
                color: $font-color-black;
            }
        }

        section {
            display: flex;
            justify-content: center;
            flex-grow: 1;

            padding: 60px 40px;

            height: 60%;

            .computer--connection {
                display: flex;
                height: 100%;
                width: 90%;
            }
        }
    }
}
</style>
