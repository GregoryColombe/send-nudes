import { TimelineLite } from "gsap"

class animNotifs {
    constructor(array,datasCopied, audioList,iSound,audio) {
        this.array = array;
        this.datasCopied = datasCopied;
        this.audioList = audioList;
        this.iSound = iSound;
        this.audio = audio
    }
    
    get popup() {
        return this.animPopup();
    }
    
    animPopup() {
        setTimeout(() => {
            for (let i = 0; i <= this.array.length; ++i) {
                this.setDelay(this.array, i);
            }
        }, 1300);
    }

    setDelay(array, i) {
        setTimeout(() => {
            if (i <= array.length) {
                this.datasCopied.notifications.push(array[i])
            }

            const tl = new TimelineLite()
            if(document.querySelectorAll(".notification").length !=0){
                tl.fromTo(`.notification-${i}`, {
                    opacity:0
                },{
                    duration: 1.8, 
                    opacity : 1 ,
                    scale: 1,
                    ease: "elastic.out(1.5, 0.6)",
                });
    
                this.audioNotifications() 
            }

        }, 1300 * i);
    }

    audioNotifications() {
        const nbNotification = document.querySelectorAll(".notification").length
        
        this.audioList = ["/audios/Instagram_Notif.mp3", "/audios/Tinder_MatchNotif.mp3", "/audios/Twitter_Notif.mp3"]
        this.audio.src = this.audioList[this.iSound]
        
        if(nbNotification !==0){
            this.audio.play()

            this.iSound++
        }

        if (this.iSound >= 3 ) {
            this.iSound = 0
        }
    }
}

export default animNotifs