<template>
    <div>
        <ul class="temporalities">
            <li
                v-for="(data, i) in temporalities"
                :key="i"
                @click="onClick(data)"
                :class="[
                    'temporalities--puces',
                    {'temporalities--puces_active' : data.id === temporality},
                    {'temporalities--puces_unlock' : data.id !== temporality && !data.blocked},
                    {'temporalities--puces_unvisited' : data.id !== temporality && !data.visited && !data.blocked},
                ]"
            >
                <p
                    v-if="data.id === temporality"
                    :style="`color: ${color}`"
                >
                    {{ data.name }}
                </p>

                <LockIcon
                    v-if="data.blocked && data.id !== temporality"
                    class="temporalities--puces_lock"
                />

                <img
                    :src="require('~/assets/images/icons/pucehover.svg')"
                    class="croix"
                >
            </li>
        </ul>

        <NotificationGame
            v-if="!this.temporalities[this.filter-1].blocked &&!this.temporalities[this.filter-1].visited && this.filter-1 !== 0 && notification && !modals && !getModal('post') && !getModal('messages') && !getModalT('messages') && !getModalT('posts')"
            :data="temporalities[this.filter-1]"
            :color="color"
            :temporalities-notifs="true"
            :first="false"
            :class="`notification-${this.filter-1}`"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import LockIcon from "~/components/Icons/LockIcon";
import NotificationGame from "~/components/Global/NotificationGame";


export default {
    name: "Temporalities",
    props: {
        color: {
            type: String,
            default: "#383838"
        }
    },
    components: {
        LockIcon,
        NotificationGame
    },
    data: () => ({
        notification: true,
        filter : 1
    }),
    computed: {
        ...mapGetters({
            temporalities: "getTemporalities",
            temporality: "getTemporality",
            modals: "tinder/getModal",
            getModal: "instagram/getModal",
            getModalT: "twitter/getModal",
        })
    },
    methods: {
        ...mapActions({
            setTemporality: "setTemporality",
            unlockNextTemporality: "unlockNextTemporalities",
        }),

        onClick(data) {
            if(!data.blocked) {
                this.setTemporality(data.id)
                this.notification = false
            }
        }
    },
    watch: {
        temporalities: {
            handler() {
                this.notification = true
                this.filter = this.$cookies.get("temporality") || this.temporality;
            },
            deep: true
        }
    },
    mounted() {
        this.filter = this.$cookies.get("temporality") || this.temporality;
    }
}
</script>

<style lang="scss" scoped>
.temporalities {
    display: flex;
    align-items: center;

    position: absolute;
    top: 70px;
    left: 70px;
     z-index: 9;

    &--puces {
        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;

        width: 20px;
        height: 20px;

        margin-right: 15px;

        border-radius: 50%;
        background-color: $white;

        &:last-child:after {display: none}
        &:after {
            content: "";

            position: absolute;
            top: 50%;
            left: 100%;
            transform: translateY(-50%);

            width: 15px;
            height: 3px;

            background-color: $white;
        }

        p {
            @include menco-regular;
            font-size: 15px;
        }
        svg {
            width: 10px;
            height: 10px;

            padding: 5px;
        }


        &_active {
            width: auto;

            padding: 5px 15px;

            border-radius: 50px;

        }
        &_unlock {
            background-color: transparent;
            border: 3px solid $white;
            box-sizing: border-box;

            &:after {width: 18px}
            &:before {
                content: "";

                width: 9px;
                height: 9px;

                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                border-radius: 50%;

                background-color: $white;

                transition: all .2s ease-in-out;
            }
            &:hover:before {cursor: pointer}

            &:hover:before {
                width: 30px;
                height: 30px;  
            }
            &:hover {
                .croix{
                    display: block;
                    opacity: 1;
                }
            }
        }
        &_unvisited {
            width: 30px;
            height: 30px;

            &:before {
                width: 15px;
                height: 15px;

                
            }
            &:hover:before {
                width: 25px;
                height: 25px;

                .croix{
                    display: block;
                    opacity: 1;
                }
            }
            
            animation-duration: 0.5s;
            animation-name: changewidth;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            

        }
        .croix{
            display: none;
            width: 10px;

            opacity: 0;
            z-index: 2;

            transition: all .2s ease-in-out;

            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }
}

.notification-1{
    position: absolute;
    top  :115px;
    left: 202px;
}
.notification-2{
    position: absolute;
    top  :115px;
    left: 229px;
}
.notification-3{
    position: absolute;
    top  :115px;
    left: 242px;
}
 
@keyframes changewidth {
    from {
        transform: scale(1,1);
    }

    to {
        transform: scale(1.05,1.05);
    }
}

</style>
