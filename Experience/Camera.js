import * as THREE from "three";
import Experience from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();

    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom=true;
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            5,this.sizes.aspect,0.1,1000
        );
        this.scene.add(this.perspectiveCamera);
        //this.perspectiveCamera.position.set(0,20,50);
        this.perspectiveCamera.position.set(1,65,40);
        //this.perspectiveCamera.position.y=10;
    }

    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect*this.sizes.frustrum)/2,
            (this.sizes.aspect*this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -50,
            50
        );

        this.orthographicCamera.position.set(1.5,4,10);
        this.orthographicCamera.enableZoom=true;
        //this.orthographicCamera.rotation.y = -Math.PI/4;
        this.orthographicCamera.lookAt(0,0,0);
        //this.orthographicCamera.rotation.x = Math.PI;
        //console.log(this.orthographicCamera.position,this.orthographicCamera.rotation);

        // this.orthographicCamera = new THREE.PerspectiveCamera(
        //     15,this.sizes.aspect,0.1,1000
        // );

    

        this.scene.add(this.orthographicCamera);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        
        //this.orthographicCamera.position.z=0;

        const size=20;
        const divisions = 20;

        // const gridHelper = new THREE.GridHelper(size,divisions);
        // this.scene.add(gridHelper);

        //const axesHelper = new THREE.AxesHelper(10);
        //this.scene.add(axesHelper);


    }

    resize(){
        //updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
        
        //updating Orthographic Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthographicCamera.right =(this.sizes.aspect*this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update(){
        this.controls.update();
        //console.log(this.perspectiveCamera.position);

        //this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);

    }
}