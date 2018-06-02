import * as THREE from 'three';
import Stats from 'stats.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, innerWidth/ innerHeight, 0.1, 1000);
camera.position.x = 30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);
// scene.rotation.y = Math.PI / 2;
console.log(scene.rotation.y)

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
const material = new THREE.MeshLambertMaterial({color: 0x123456});
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

const lineGeometry = new THREE.Geometry();
const lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));
const line = new THREE.Line(lineGeometry, lineMaterial);

scene.add(line);

const stats = new Stats();
stats.showPanel(1);
document.getElementById('stats').appendChild(stats.dom);

let rotation = 0;

const animate = () => {
  stats.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.2;
  sphere.rotation.y += 0.1;
  scene.rotation.y += (rotation - scene.rotation.y) * 0.02;
}
(function() {
  let mouseXOnMouseDown = 0;
  
  const onDocumentMouseMove = (event: MouseEvent) => {
    console.dir(event);
    event.preventDefault();
    let mouseX = event.clientX;
    rotation = rotation + (mouseX - mouseXOnMouseDown) * 0.01;
  }

  const onDocumentMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
  }

  const onDocumentMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    mouseXOnMouseDown = event.clientX;
  }

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
}())
export default animate;