<template>
    <div class="--deconnection --overlay">
        <p>compte {{ name }}</p>
        <h3>Désactivé</h3>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ""
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

</style>
