import EventEmitter from "events";
import * as THREE from "three";
import Experience from "../Experience";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

export default class Resources extends EventEmitter{
    constructor(assets){
        //for using eventemitter
        super();
        const material = new THREE.MeshNormalMaterial()
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets= assets;
       
        this.items= {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.fbxLoader = new FBXLoader();
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
        //this.loaders.fbxLoader.setDRACOLoader(this.loaders.dracoLoader);

    }

    startLoading(){
        for(const assets of this.assets){
            if(assets.type==="glbModel"){
                this.loaders.gltfLoader.load(assets.path, (file)=>{
                    this.singleAssetLoade(assets,file);
                });
            }
            else if(assets.type==="fbxModel"){ 
                this.loaders.fbxLoader.load(assets.path, (file)=>{
                    object.traverse( function ( child ) {
                        if ( child.isMesh ) {
                            child.castShadow = true;
                            child.receiveShadow = false;
                            child.flatshading = true;
                        }
                    } );
                });
            }
            else if(assets.type==="videoTexture"){
                this.video={};
                this.videoTexture={};

                this.video[assets.name]= document.createElement("video");
                this.video[assets.name].src= assets.path;
                this.video[assets.name].muted= true;
                this.video[assets.name].playsInline= true;
                this.video[assets.name].autoplay= true;
                this.video[assets.name].loop= true;
                this.video[assets.name].play();

                this.videoTexture[assets.name] = new THREE.VideoTexture(this.video[assets.name]);
                this.videoTexture[assets.name].flipY = true;
                this.videoTexture[assets.name].minFilter = THREE.NearestFilter;
                this.videoTexture[assets.name].magFilter = THREE.NearestFilter;
                this.videoTexture[assets.name].generateMipmaps = false;
                this.videoTexture[assets.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoade(assets, this.videoTexture[assets.name]);
            }
        }

    }

    singleAssetLoade(asset,file){
        this.items[asset.name] = file;
        this.loaded++;

        console.log("assets is loading");
        if(this.loaded===this.queue){
            console.log("all  assets are done");
            this.emit("ready");
        }

    }

}