import * as THREE from 'three'
import * as TWEEN from 'tween'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { ChaoInitHooksType } from './typing'
/**
 * author chao
 * Chao3d libray main class
 */
class Chao3d {

  el: HTMLElement 
  hooks: ChaoInitHooksType
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  renderer: THREE.Renderer
  loop: {}
  
  constructor(el: HTMLElement | string, hooks: ChaoInitHooksType ){
    if(typeof el == 'string'){
      this.el = document.getElementById(el)
    }else{
      this.el = el
    }
  }
}

export default Chao3d