import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';
import utils from './utils';

const scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0xffffff, 0.15, 100);

const camera = utils.createCamera(scene.position, 30, 40, 30)

const renderer = utils.createRenderer();

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

const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
const boxMaterial = new THREE.MeshLambertMaterial({color: 0x123456});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.x = -10;
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

const myGeometry = new THREE.Geometry();
const myMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
const vertices = [
  new THREE.Vector3(4, 0, 0),
  new THREE.Vector3(0, 14, 0),
  new THREE.Vector3(-4, 0, 0),
  new THREE.Vector3(0, 0, 4),
];
const faces = [
  new THREE.Face3(0, 2, 1),
  new THREE.Face3(0, 3, 2),
  new THREE.Face3(1, 2, 3),
  new THREE.Face3(0, 1, 3),
];
myGeometry.vertices = vertices;
myGeometry.faces = faces;
myGeometry.computeFaceNormals();
myGeometry.computeVertexNormals();
const myBox = new THREE.Mesh(myGeometry, myMaterial);
// myBox.rotateX(-Math.PI / 2);
myBox.castShadow = true;
scene.add(myBox);

const lineGeometry = new THREE.Geometry();
const lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));
const line = new THREE.Line(lineGeometry, lineMaterial);

scene.add(line);

const stats = new Stats();
stats.showPanel(0);
document.getElementById('stats').appendChild(stats.dom);

let controls = new function () {
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.02;
}

let gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'bouncingSpeed', 0, 0.5);

let rotation = 0;
let step = 0;

const animate = () => {
  stats.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += controls.rotationSpeed;
  sphere.position.y = 4 + 10 * Math.abs(Math.sin(step));
  scene.rotation.y += (rotation - scene.rotation.y) * 0.02;

  step += controls.bouncingSpeed;
}

(function() {
  let mouseXOnMouseDown = 0;
  
  const onDocumentMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    let mouseX = event.clientX;
    rotation = rotation + (mouseX - mouseXOnMouseDown) * 0.001;
  }

  const onDocumentMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
  }

  const onDocumentMouseDown = (event: MouseEvent) => {
    if(event.target === renderer.domElement) {
      event.preventDefault();
      document.addEventListener('mousemove', onDocumentMouseMove, false);
      mouseXOnMouseDown = event.clientX;
    }
  }

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
}())
export default animate;