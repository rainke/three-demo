import * as THREE from 'three';
import { WebGLShadowMap } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth/ innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMapEnabled = true;

const root = document.getElementById('root');
root.appendChild(renderer.domElement);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight)

const axes = new THREE.AxesHelper(20);
scene.add(axes)

const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.receiveShadow = true;
scene.add(plane);

const geometry = new THREE.BoxGeometry(4, 4, 4);
const material = new THREE.MeshLambertMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
cube.castShadow = true;
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;
sphere.castShadow = true;
scene.add(sphere);

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);
console.log(scene.position)

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.2;
  // sphere.rotation.y += 0.1;
}

export default animate;