import { TimelineLite } from "gsap"

class animBtn {
    constructor(counter,btn2) {
        this.counter = counter;
        this.btn2 = btn2
        this.tl = new TimelineLite()
    }

    get anim() {
        return this.animOnReveal();
    }

    get mouseEnter() {
        return this.onMouseEnter();
    }

    get mouseLeave() {
        return this.onMouseLeave();
    }

    animOnReveal() {
        if(this.counter === 0){
            if(this.btn2){
                this.tl.fromTo(".top-side2", { 
                    width: 0, 
                }, 
                {
                    delay : 1.8,
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.4
                });

                this.tl.fromTo(" .right-side2", {
                    height: 0, 
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.5, 
                });
    
                this.tl.fromTo(" .bottom-side2", { 
                    width: 0
                }, 
                {
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.5,  
                });
    
                this.tl.fromTo(" .left-side2", {  
                    height: 0
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.5
                });
            }else{
                this.tl.fromTo(".top-side", { 
                    width: 0, 
                }, 
                {
                    delay : 1.8,
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.4
                });

                this.tl.fromTo(" .right-side", {
                    height: 0, 
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.5, 
                });
    
                this.tl.fromTo(" .bottom-side", { 
                    width: 0
                }, 
                {
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.5,  
                });
    
                this.tl.fromTo(" .left-side", {  
                    height: 0
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.5
                });
            }  
        }else{
            if(this.btn2){
                this.tl.fromTo(".top-side2", { 
                    width: 0, 
                }, 
                {
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1
                });
    
                this.tl.fromTo(" .right-side2", {
                    height: 0, 
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1, 
                });
    
                this.tl.fromTo(" .bottom-side2", { 
                    width: 0
                }, 
                {
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1,  
                });
    
                this.tl.fromTo(" .left-side2", {  
                    height: 0
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1
                });
            }else {
                this.tl.fromTo(".top-side", { 
                    width: 0, 
                }, 
                {
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1
                });
    
                this.tl.fromTo(" .right-side", {
                    height: 0, 
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1, 
                });
    
                this.tl.fromTo(" .bottom-side", { 
                    width: 0
                }, 
                {
                    width: "100%", 
                    height : "2px",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1,  
                });
    
                this.tl.fromTo(" .left-side", {  
                    height: 0
                }, 
                {
                    width: "2px", 
                    height : "100%",
                    background: "white",
                    ease:"power4.out",
                    duration: 0.1
                });
            }
        }
    }

    onMouseEnter(){
        if(this.btn2){
            this.tl.to(" .left-side2, .top-side2,.bottom-side2,.right-side2", {
                zIndex : 0 ,
                ease:"power4.out"
            });

            this.tl.fromTo(".top-sideHover2", {
                width: 0
            }, 
            {
                width: "100%", 
                height : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });

            this.tl.fromTo(".right-sideHover2", {
                height: 0, 
            }, 
            {
                height: "100%", 
                width : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });
            
            this.tl.fromTo(".bottom-sideHover2", {
                width: 0, 
            }, 
            {
                width: "100%", 
                height : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });
            
            this.tl.fromTo(".left-sideHover2", {
                height: 0, 
            }, 
            {
                height: "100%", 
                width : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });
        }else{
            this.tl.to(" .left-side, .top-side,.bottom-side,.right-side", {
                zIndex : 0 ,
                ease:"power4.out"
            });

            this.tl.fromTo(".top-sideHover", {
                width: 0
            }, 
            {
                width: "100%", 
                height : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });

            this.tl.fromTo(".right-sideHover", {
                height: 0, 
            }, 
            {
                height: "100%", 
                width : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });
            
            this.tl.fromTo(".bottom-sideHover", {
                width: 0, 
            }, 
            {
                width: "100%", 
                height : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });
            
            this.tl.fromTo(".left-sideHover", {
                height: 0, 
            }, 
            {
                height: "100%", 
                width : "2px",
                background: "grey",
                ease:"power4.out",
                duration: 0.1,  
            });
        }
    }

    onMouseLeave(){
        if(this.btn2){
            this.tl.to(" .left-side2, .top-side2,.bottom-side2,.right-side2", {
                zIndex : 2 ,
                ease:"power4.out"
            });
        }else{
            this.tl.to(" .left-side, .top-side,.bottom-side,.right-side", {
                zIndex : 2 ,
                ease:"power4.out"
            });
        }
    }
}


export default animBtn