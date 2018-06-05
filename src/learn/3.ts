// bufferGeometry
/// <reference types="three" />
/// <reference path="../index.d.ts" />

import * as THREE from 'three';
import utils from './utils';
import { Geometry, BufferGeometry, LineBasicMaterial } from 'three';

const scene = new THREE.Scene();
const camera = utils.createCamera(scene.position, 0, 0, 1000)
const renderer = utils.createRenderer();
window.scene = scene;
window.renderer = renderer;

const root = document.getElementById('root');
root.appendChild(renderer.domElement);

const MAX_POINTS = 500;
const positions = new Float32Array(MAX_POINTS * 3);
const geometry = new THREE.BufferGeometry();
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
let drawCount = 2;
geometry.setDrawRange(0, drawCount);

const material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } );
const line = new THREE.Line(geometry, material);
updatePostions();
scene.add(line); 


function updatePostions() {
  let positions = (line.geometry as any).attributes.position.array;
  console.log(positions.needsUpdate);

  let x, y, z, index;
  x = y = z = index = 0;

  for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {

    positions[ index ++ ] = x;
    positions[ index ++ ] = y;
    positions[ index ++ ] = z;

    x += ( Math.random() - 0.5 ) * 30;
    y += ( Math.random() - 0.5 ) * 30;
    // z += ( Math.random() - 0.5 ) * 30;

  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  (line.geometry as BufferGeometry).setDrawRange(0, ++drawCount);
  if(drawCount === MAX_POINTS) {
    drawCount = 2;
    updatePostions();
    (line.material as LineBasicMaterial).color.setHSL(Math.random(), 1, 0.5);
  }
}

export default animate;
