<template>
    <div class="notebook">
        <div class="notebookIcon">
            <button @click="showNotebook">
                <div>
                    <NotebookIconSvg
                        :color="color"
                    />
                </div>
            </button>
        </div>

        <NotificationGame
            v-if="first &&!notebookIsVisited && !isLastTemporality && notebook"
            :data="notebook"
            :color="color"
            :temporalities-notifs="false"
            :sound="'/audios/Messenger_Receive.mp3'"
            :effect="effect"
            @on-audio-ended="effect=false"
        />
        <NotificationGame
            v-if="!first &&!notebookIsVisited && notebook && notification && !temporalities[this.filter-1].blocked &&!temporalities[filter-1].visited && filter-1 !== 0 && !modals && !getModal('post') && !getModal('messages') && !getModalT('messages') && !getModalT('posts')"
            :data="notebook"
            :color="color"
            :temporalities-notifs="false"
            :sound="sound"
            :first="false"
            :effect="effect"
            @on-audio-ended="effect=false"
        />

        <div
            class="open"
            v-if="openNoteBook && image"
        >
            <img
                class="carnet"
                :src="require('~/assets/images/icons/carnet.svg')"
            >
            <img
                class="drawings"
                :src="image.url"
            >
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {  TimelineMax } from "gsap";
import utilities from "~/mixins/utilities";

import NotificationGame from "~/components/Global/NotificationGame";
import NotebookIconSvg from "~/components/Icons/NotebookIconSvg";

export default {
    props: {
        color: {
            type: String,
            default: "#383838"
        },
        first : {
            type: Boolean,
            default : false
        },
        sound : {
            type: String,
            default : ""
        }
    },
    components: {
        NotebookIconSvg,
        NotificationGame
    },
    mixins:[utilities],
    data: () => ({
        openNoteBook:false,
        notebook: null,
        image: null,
        notification : true,
        filter : 0,
        effect:false
    }),
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality",
            notebookIsVisited: "getNotebookIsVisited",
            modals: "tinder/getModal",
            getModal: "instagram/getModal",
            getModalT: "twitter/getModal",
        })
    },
    methods: {
        ...mapActions({
            setNotebookIsVisited: "setNotebookIsVisited",
        }),
        showNotebook(){
            const tl = new TimelineMax()
            this.setNotebookIsVisited(true)
            this.notification = false

            if(this.openNoteBook===false){
                this.openNoteBook = true;
                this.$nextTick(() =>{
                    tl.from(".carnet", { duration: 0.5,
                        opacity : 0 ,
                        scale: 0.9,
                        ease: "elastic.out(1, 0.5)",
                    });
                });
            }else{
                this.openNoteBook = false;
            }
        },
        setNotebookImage() {
            this.filter = this.$cookies.get("temporality") || this.temporality;

            let content = this.notebook.drawings.content.filter(x => x.temporality.id <= this.filter)
            content = content[content.length - 1]

            this.image = content.drawing
        }
    },
    watch: {
        temporalities: {
            handler() {
                this.setNotebookImage()
                this.notification =true
                this.setNotebookIsVisited(false) 

                this.effect=true
            },
            deep: true
        }
    },
    created() {
        this.$notebook
            .getDatas()
            .then(resp => {
                this.notebook = resp
                this.setNotebookImage()
            })
    },
    mounted() { 
        if(this.first){
            setTimeout(() => {
                this.effect=true
            }, 1800);
        }
    }
}
</script>

<style lang="scss" scoped>

.notebook{
    position: relative;
    z-index: 8;

    .notebookIcon{
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 70px;
        margin-right: 70px;

        button{
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;
            
            background-color: $white;
            border-radius: 50%;
            border: transparent;
            
            padding: 10px;

            transition: all .2s ease-in-out;

            div{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1.25rem;
                height: 1.25rem;
                background-color: $white;
            }

            &:hover {
                transform: scale(1.1,1.1);
            }
        }

        .unvisited{
            animation-duration: 0.5s;
            animation-name: changewidth;
            animation-iteration-count: infinite;
            animation-direction: alternate  
        }
    }

    .open{
        width: 40%;
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 140px;
        margin-right: 75px;

        img{
            width: 100%;

            &.drawings{
                position: absolute;
                top: 5%;
                left: 8%;
                width: 90%;
            }
        }
    }
}
</style>
