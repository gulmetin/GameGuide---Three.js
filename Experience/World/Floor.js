import * as THREE from "three";
import Experience from "../Experience";

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircle();
    }

    setFloor(){
        this.geometry= new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color:0xffc9cd,
            side: THREE.BackSide,
        });
        this.plane=new THREE.Mesh(this.geometry,this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI/2;
        this.plane.position.y = -1;
        this.plane.receiveShadow = true;
    }

    setCircle(){
        const geometry = new THREE.CircleGeometry(8, 64);
        const geometry2 = new THREE.CircleGeometry(10, 100);
        const material = new THREE.MeshStandardMaterial({ color: 0xC38B8B});
        const material2 = new THREE.MeshStandardMaterial({ color: 0x8D6060});

        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry2, material2);

        this.circleFirst.position.y=-0.99;
        this.circleSecond.position.y=-0.98;
        this.circleSecond.position.x=4.5;
        this.circleSecond.position.z=1.5;

        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);

        this.circleFirst.rotation.x = this.circleSecond.rotation.x  = -Math.PI/2;
        this.circleFirst.receiveShadow = this.circleSecond.receiveShadow =  true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);

    }

    resize(){}

    update(){}
}