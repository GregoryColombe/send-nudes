import Strapi from "~/api/strapi"

export default ({ $axios }, inject) => {
    const strapi = Strapi($axios)
    const roots  = [
        "home",
        "room",
        "instagram",
        "tinder",
        "twitter",
        "pedagogie",
        "temporalities",
        "credits",
        "instagram-posts",
        "voice-offs",
        "instagram-messages",
        "notebook"
    ]

    roots.forEach(root => {
        inject(
            convertUrlToVariables(root),
            strapi(`/${root}`)
        )
    })
}


function convertUrlToVariables(url) {
    const parse = url.split("-")
    const map   = parse.map((x, i) => filter(x, i))

    function filter(x, i) {
        if(i !== 0) {
            return x.substring(0, 1).toUpperCase() + x.substring(1, x.length)
        } else {
            return x
        }
    }

    return map.join("")
}
