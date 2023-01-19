import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls{
    constructor(){
        this.i=0;
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.rectLight =[];
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight[this.i] = [child];
                this.i++;
            }
        });

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.setSmoothScroll();
        }
        this.setScrollTrigger();
        
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.5,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();

    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 801px)": ()=>{
                console.log("fired desktop");

                //Resets
                this.room.scale.set(0.003,0.003,0.003);
                this.room.position.set(-0.5,0,-1);
                this.camera.orthographicCamera.position.set(1.5,4,10);
                this.rectLight[0].width=3;
                this.rectLight[0].height=1.5;
                this.rectLight[1].width=0.5;
                this.rectLight[1].height=2;

                //Firstt Section------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        //invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.fromTo(this.room.position,  { x:-0.5, y: 0, z: -1 }, {
                    x:() => {
                        return this.sizes.width*0.003;
                    },
                },"same");

                //Second Section------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x:() => {
                        return 1;
                    },
                    z:() => {
                        return this.sizes.height*0.001;
                    },
                },"same");
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.012,
                    y: 0.012,
                    z: 0.012,

                },"same");
                this.secondMoveTimeline.to(this.rectLight[0], {
                    width: 3*4,
                    height: 1.5*4,
                },"same");
                this.secondMoveTimeline.to(this.rectLight[1], {
                    width: 0.5*4,
                    height: 1.5*4,
                },"same");

                //Third Section------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                   y: 4,
                   x: 0,
                   //default camera position (1.5,4,10)
                },"same");
                this.thirdMoveTimeline.to(this.room.scale, {
                    x: 0.018,
                    y: 0.018,
                    z: 0.018,

                },"same");
                this.thirdMoveTimeline.to(this.rectLight[0], {
                    width: 3*6,
                    height: 1.5*6,
                },"same");
                this.thirdMoveTimeline.to(this.rectLight[1], {
                    width: 0.5*6,
                    height: 1.5*6,
                },"same");

                //Fourth Section------------------
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.fourthMoveTimeline.to(this.camera.orthographicCamera.position, {
                   x: 15,
                   y: 7,
                   //default camera position (1.5,4,10)
                },"same");

                //Fifth Section------------------
                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fifth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.fifthMoveTimeline.to(this.room.scale, {
                    x: 0.015,
                    y: 0.015,
                    z: 0.015,

                },"same");
                this.fifthMoveTimeline.to(this.rectLight[0], {
                    width: 3*5,
                    height: 1.5*5,
                },"same");
                this.fifthMoveTimeline.to(this.rectLight[1], {
                    width: 0.5*5,
                    height: 1.5*5,
                },"same");
                this.fifthMoveTimeline.to(this.camera.orthographicCamera.position, {
                   y: -5,
                   x: -3,
                   z:0,
                   //default camera position (1.5,4,10)
                },"same");
                
            },
            //Mobile
            "(max-width: 800px)": ()=> {
                console.log("fired mobile");
                
                //Resets
                this.room.scale.set(0.0025,0.0025,0.0025);
                this.room.position.set(-0.5,0,-1);
                this.camera.orthographicCamera.position.set(1.5,4,10);

                //Firstt Section------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x:0.003,
                    y:0.003,
                    z:0.003,
                },"same")
                //Second Section------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.012,
                    y: 0.012,
                    z: 0.012,
                },"same").to(this.rectLight[0], {
                    width: 3*4,
                    height: 1.5*4,
                },"same").to(this.rectLight[1], {
                    width: 0.5*4,
                    height: 2*4,
                },"same").to(this.room.position, {
                    x: 5.5,
                },"same");
                //Third Section------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: -2,
                },"same");
                //Fourth Section------------------
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x: -7,
                },"same");
                //Fifth Section------------------
                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fifth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    x:-2,
                    y: 3,
                    z:-3,
                });
            },
        
            // all 
            "all": () => {

                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section)=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    
                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                //circle animations
                //Firstt Section------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        //invalidateOnRefresh: true,
                    },
                }).to(this.circleFirst.scale, {
                   x:3,
                   y:3,
                   z:3,
                },"same");


                //Second Section------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleSecond.scale, {
                    x:3,
                    y:3,
                    z:3,
                 },"same");
                         
                //others animation
            },
                
        }); 
    }


    resize(){}

    update(){
        
        
        /*if(this.back){
            this.lerp.target-=0.001;
        }
        else{
            this.lerp.target+=0.001;
        }
        this.lerp.target=GSAP.utils.clamp(0,1,this.lerp.target);
        this.lerp.current=GSAP.utils.clamp(0,1,this.lerp.current);

        this.curve.getPointAt(this.lerp.current,this.position);
        this.curve.getPointAt(this.lerp.current+0.00001,this.lookAtPosition);
        
        this.camera.orthographicCamera.position.copy(this.position);
        this.camera.orthographicCamera.lookAt(this.lookAtPosition);

        //
        this.curve.getPointAt(this.lerp.current%1,this.position);
        this.camera.orthographicCamera.position.copy(this.position);

        this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current%1)+0.000001),this.position);
        this.directionalVector.normalize();
        this.crossVector.crossVectors(this.directionalVector,this.sataticVector);
        this.crossVector.multiplyScalar(100000);
        this.camera.orthographicCamera.lookAt(0,0,0);*/
    }
}