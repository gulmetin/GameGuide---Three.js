import * as  THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";

import Camera from "./Camera";
import Theme from "./Theme";
import Renderer from "./Renderer";
import Preloader from "./Preloader";

import World from "./World/World";
import Controls from "./World/Controls";
import assets from "./Utils/assets";

export default class Experience {
    static instance;
    constructor(canvas){
      if(Experience.instance){
        return Experience.instance;
      }
      Experience.instance=this;
      this.canvas=canvas;
      this.scene = new THREE.Scene();
      this.time = new Time();
      this.sizes = new Sizes();
      this.camera= new Camera();
      this.renderer= new Renderer();
      this.resources = new Resources(assets);
      this.theme = new Theme();
      this.world = new World();
      this.preloader = new Preloader();

      this.time.on("update", ()=>{
        this.update();
      });
      this.sizes.on("resize", ()=>{
        this.resize();
      });
    }

    update(){
      this.camera.update();
      this.renderer.update();
      this.world.update();
    }
    resize(){
      this.camera.resize();
      this.renderer.resize();
      this.world.resize();
    }
}