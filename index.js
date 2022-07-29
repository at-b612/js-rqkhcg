// Import stylesheets
import './style.css';
import * as THREE from 'three';
import { TWEEN } from 'tween';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as obj from './STL/Human.js';
//import { STLLoader } from 'three-stl-net-loader';

var renderer, scene, camera, rectangle, box, light1, light2, light3, light4;

// window.onload = function () {
// console.log('his"');

init();
animate();
// };

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  //renderer.outputEncoding = THREE.sRGBEncoding;
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 100;
  scene.add(camera);

  rectangle = new THREE.Object3D();
  rectangle.receiveShadow = true;
  scene.add(rectangle);

  //box = new THREE.Object3D();
  //box.castShadow = true;
  //box.receiveShadow = true;
  //scene.add(box);

  light1 = new THREE.SpotLight(0x62a9af, 1);
  light1.position.set(-100, 0, 101);
  light1.angle = Math.PI / 1;
  light1.penumbra = 0.7;
  light1.decay = 2.5;
  light1.distance = 400;
  light1.castShadow = true;
  scene.add(light1);

  light2 = new THREE.SpotLight(0x0700b2, 1);
  light2.position.set(100, 0, 121);
  light2.angle = Math.PI / 1;
  light2.penumbra = 0.7;
  light2.decay = 2.5;
  light2.distance = 400;
  light2.castShadow = true;
  scene.add(light2);

  light3 = new THREE.SpotLight(0x05ebe3, 1);
  light3.position.set(0, 160, 111);
  light3.angle = Math.PI / 1;
  light3.penumbra = 0.7;
  light3.decay = 2.5;
  light3.distance = 400;
  light3.castShadow = true;
  scene.add(light3);

  light4 = new THREE.SpotLight(0xd800ff, 1);
  light4.position.set(0, -160, 131);
  light4.angle = Math.PI / 1;
  light4.penumbra = 0.7;
  light4.decay = 2.5;
  light4.distance = 400;
  light4.castShadow = true;
  scene.add(light4);

  var geometry1 = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: THREE.FlatShading,
  });

  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(geometry1, material);
    mesh.position
      .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize();
    mesh.position.multiplyScalar(90 + Math.random() * 700);
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  }

  var mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: THREE.FlatShading,
  });

  var planet = new THREE.Mesh(geometry1, mat);
  planet.scale.x = planet.scale.y = planet.scale.z = 16;
  rectangle.add(planet);

  var object_material = new THREE.MeshPhongMaterial({ color: 0xffffff });

  const objLoader = new OBJLoader();
  const object = objLoader.parse(obj.default);

  object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      //child.material = object_material;
    }
  });
  object.add(object_material);
  object.position.z = 40;
  object.position.y = -10
  object.scale.set( 4, 4, 4 );
  object.castShadow = true;
  scene.add(object);

  var ambientLight = new THREE.AmbientLight(0x999999, 0);
  scene.add(ambientLight);

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.0005;

  light1.position.y = Math.cos(time * 0.9) * 100;
  light1.position.z = Math.cos(time * 0.7) * 100;
  light2.position.y = Math.sin(time * 0.7) * -100;
  light2.position.z = Math.sin(time * 0.7) * 100;
  light3.position.x = Math.cos(time * 0.8) * 100;
  light3.position.z = Math.cos(time * 0.3) * 100;
  light4.position.x = Math.sin(time * 0.85) * -100;
  light4.position.z = Math.sin(time * 0.3) * 100;

  renderer.clear();

  renderer.render(scene, camera);
}
