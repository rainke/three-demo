import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';
import utils from './utils';

const scene = new THREE.Scene();

const camera = utils.createCamera(scene.position, 0, 0, 100)

const renderer = utils.createRenderer();

const root = document.getElementById('root');
root.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(60, 20, 2, 2);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

let controls = new function () {
  this.rotationX = 0.1;
  this.rotationY = 0.1;
}

let gui = new dat.GUI();
gui.add(controls, 'rotationX', 0, Math.PI * 2.0);
gui.add(controls, 'rotationY', 0, Math.PI * 2.0);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  plane.rotation.x = controls.rotationX;
  plane.rotation.y = controls.rotationY;
}
export default animate;