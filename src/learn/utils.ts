import * as THREE from 'three';

const utils = {
  createCamera(lookAt, x: number, y: number, z: number) {
    const camera = new THREE.PerspectiveCamera(45, innerWidth/ innerHeight, 0.01, 1000);
    camera.position.set(x, y, z);
    camera.lookAt(lookAt);
    return camera;
  },
  createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
  }
};

export default utils;