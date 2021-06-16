<template>
    <div class="card-account">
        <div class="card-account--content">
            <div class="card-account--content_picture">
                <img :src="data.profile.url">
            </div>

            <h6>{{ data.name }}</h6>
            <p>Accéder aux différents réseaux sociaux :</p>
            <p>Tinder / Instagram / Twitter</p>
        </div>

        <button
            @click="$emit('on-click')"
            :class="['card-account--button --button', {'card-account--button_disable' : data.disable}]"
            :disabled="data.disable"
        >
            Connexion
        </button>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},
    mounted() {}
}
</script>

<style lang="scss" scoped>
.card-account{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 50%;

    padding: 20px;
    margin-left: 60px;

    border-radius: 10px;
    box-shadow: 0 5px 10px 0 rgba($black, .25);

    &:first-child {margin-left: 0}

    &--content {
        display: flex;
        flex-direction: column;
        align-items: center;

        &_picture {
            width: 100px;
            height: 100px;

            border-radius: 50%;
            overflow: hidden;

            margin-top: 10px;

            @include breakpoint (laptopXL){
                width: 70px;
                height: 70px;       
            }

            img{
                width: 100%;
            }
        }

        h6, p {
            @include menco-light;
            font-size: 15px;
            color: $font-color-black;
            text-align: center;

            @include breakpoint (laptopXL){
                font-size: 12px;     
            }
        }

        h6 {
            margin-top: 5%;
            margin-bottom: 15%;

            @include menco-semi-bold;
            font-size: 19px;

            @include breakpoint (laptopXL){
                font-size: 15px;     
            }
        }
    }

    &--button {
        width: 90%;
        height: 60px;

        margin-top: 5%;
        padding: 10px 0;

        @include menco-semi-bold;
        font-size: 19px;
        text-transform: uppercase;
        color: $font-color-white;

        border-radius: 5px;
        background-color: $messenger-color;

        @include breakpoint (laptopXL){
            height: fit-content; 
            font-size: 15px;      
        }

        &:hover, &:focus, &:active {
            background-color: rgba($color: $messenger-color, $alpha: 0.85);
            transition: 0.15s;
        }

        &_disable {
            background-color: $grey
        }
        
        &_disable:hover,  &_disable:focus,  &_disable:active {
            background-color: $grey
        }
    }
}
</style>
