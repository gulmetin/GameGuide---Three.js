import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;

        this.actualRoom = this.room.scene;

        this.lerp={
            current:-49.4,
            target:-49.4,
            ease:0.1,
        };
        
        this.setModel();
        //animation
        //this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        const width = 3;
        const height = 1.5;
        const intensity = 1.5;
        const rectLight = new THREE.RectAreaLight( 0xf09f24, intensity,  width, height );
        rectLight.position.set( -600, 300, 900);
        rectLight.rotation.set( 150, 0, 0);
        // rectLight.position.set( 0, 400, 40);
        // rectLight.rotation.set( 0, 0, 0);
        this.actualRoom.add( rectLight );

        const rectLightwall = new THREE.RectAreaLight( 0xf09f24, 2,  0.5, 2);
        rectLightwall.position.set( -50, 500, 300);
        rectLightwall.rotation.set( 50, 0, 0);
        // rectLight.position.set( 0, 400, 40);
        // rectLight.rotation.set( 0, 0, 0);
        this.actualRoom.add( rectLightwall );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x212F3D } );
        const cube = new THREE.Mesh( geometry, material );
        this.actualRoom.add( cube );


        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            /* DESIGN CHİLD MATERIAL
            if(child.name =="child_name"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness =0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission =1;
                child.material.opacity =1;
            }
            
             if(child.name =="Screen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
            */
           /*child.scale.set(0,0,0);
            if(child.type === "Mesh"){
                child.scale.set(1,1,1);
                child.position.set(-0.5,0,-1);
                child.rotation.y = Math.PI/4;
            }*/
        });

        

        //const rectLightHelper = new RectAreaLightHelper( rectLightwall );
       // rectLightwall.add( rectLightHelper );

        //transport 
        this.scene.add(this.actualRoom);
        console.log(this.actualRoom);
        this.actualRoom.scale.set(0.003,0.003,0.003);
        //this.actualRoom.rotation.y = -49.4;
        this.actualRoom.position.z=-1;
        this.actualRoom.position.x=-0.5;
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        console.log(this.room);
        //örnek olarak balık animasyonu, 0.indexte olduğu için onu aldık ve oynattık
        this.swim =this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();


    }

    onMouseMove(){
        //mouse  movement
        window.addEventListener("mousemove",(e)=>{          
            //mouse değerlerinin 1 ve 0 arasında olması için hesaplama
            this.rotation = ((e.clientX-window.innerWidth/2)*2)/window.innerWidth;
            this.lerp.target = -49.4+this.rotation*0.03;
        });
    }


    resize(){}

    update(){
        this.lerp.current=GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        //console.log(this.lerp.target,this.lerp.current);

        this.actualRoom.rotation.y = this.lerp.current;

        //animation
        //çok hızlı olduğu zaman delta*0,0009 gibi küçük değerle çarpıyoruz.
        //this.mixer.update(this.time.delta*0,0009);
    }
}