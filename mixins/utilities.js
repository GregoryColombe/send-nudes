import marked from "marked"
import moment from "moment"

import { mapGetters } from "vuex"

export default {
    computed: {
        ...mapGetters({
            temporality: "getTemporality",
            temporalities: "getTemporalities",

            instagramModal: "instagram/getModal",
            twitterModal: "twitter/getModal",
        }),

        isLastTemporality() {
            return this.temporality === this.temporalities[this.temporalities.length - 1].id
        },
        isGameFinished() {
            return this.instagramModal("disconnection") && this.twitterModal("disconnection")
        }
    },
    methods: {
        formatHtmlText(text) {
            return marked(text)
        },
        formatDate(format, date) {
            moment.locale("fr")

            return moment(date).format(format)
        },

        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);

            return Math.floor(Math.random() * (max - min)) + min;
        },

        setGameFinished() {
            setTimeout(() => {
                this.isGameFinished && this.$router.push("room")
            }, 2500);
        }
    }
}
