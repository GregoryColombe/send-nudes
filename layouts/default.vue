<template>
    <div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    methods: {
        onWindowSize() {
            if(window.innerWidth < 1024) {
                document.location.href = "/";
            }
        }
    },
    mounted() {
        if(this.$route.path !== "/") {
            this.onWindowSize()
            window.addEventListener("resize", () => this.onWindowSize())
        }
    }
}
</script>

<style>
</style>
