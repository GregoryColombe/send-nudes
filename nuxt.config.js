export default {
    target: "server",
    ssr: true,
    head: {
        title: "Send Nudes",
        htmlAttrs: {
            lang: "fr"
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Send Nudes est une expérience interactive et narrative qui plonge le joueur dans une enquête de disparition. Le but : Retrouver votre amie en plongeant dans sa vie numérique. Découvertes affreuses, remises en question … La recherche sera rythmée d'événements inspirés de faits réels. " }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
            { rel: "stylesheet", href: "https://use.typekit.net/azv8rzb.css" }
        ]
    },
    router: {
        middleware: "temporality"
    },
    css: ["~assets/scss/main.scss"],
    plugins: [
        "~plugins/preview.client.js",
        "~plugins/gsap.client.js",
        "~plugins/axios.js",
        {
            src : "~plugins/pixi.client.js",
            ssr: false
        }
    ],
    components: false,
    buildModules: [
        "@nuxtjs/eslint-module",
        "@nuxtjs/fontawesome"
    ],
    fontawesome: {
        component: "fa",
        suffix: true,
        icons: {
            solid: ["faHeart", "faPaperPlane", "faComment"]
        }
    },
    modules: [
        "@nuxtjs/style-resources",
        "@nuxtjs/axios",
        "cookie-universal-nuxt"
    ],
    styleResources: {
        scss: ["~assets/scss/*.scss"]
    },
    axios: {
        baseURL: "https://send-nudes-back.herokuapp.com"
    },
    build: {
        loaders: {
            scss: { sourceMap: false },
        }
    },
}

