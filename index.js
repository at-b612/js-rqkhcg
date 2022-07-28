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
  camera.position.z = 200;
  scene.add(camera);

  rectangle = new THREE.Object3D();
  rectangle.receiveShadow = true;
  scene.add(rectangle);

  //box = new THREE.Object3D();
  //box.castShadow = true;
  //box.receiveShadow = true;
  //scene.add(box);

  light1 = new THREE.SpotLight(0x62a9af, 1);
  light1.position.set(-50, 0, 15);
  light1.angle = Math.PI / 1;
  light1.penumbra = 0.7;
  light1.decay = 2;
  light1.distance = 300;
  light1.castShadow = true;
  light1.shadow.mapSize.width = 512; // default
  light1.shadow.mapSize.height = 512; // default
  light1.shadow.camera.near = 1; // default
  light1.shadow.camera.far = 500; // default
  light1.shadow.focus = 1; // default
  scene.add(light1);

  light2 = new THREE.SpotLight(0x0700b2, 1);
  light2.position.set(50, 0, 20);
  light2.angle = Math.PI / 1;
  light2.penumbra = 0.7;
  light2.decay = 2;
  light2.distance = 300;
  light2.castShadow = true;
  scene.add(light2);

  light3 = new THREE.SpotLight(0x05ebe3, 1);
  light3.position.set(0, 100, 25);
  light3.angle = Math.PI / 1;
  light3.penumbra = 0.7;
  light3.decay = 2;
  light3.distance = 300;
  light3.castShadow = true;
  scene.add(light3);

  light4 = new THREE.SpotLight(0xd800ff, 1);
  light4.position.set(0, -100, 30);
  light4.angle = Math.PI / 1;
  light4.penumbra = 0.7;
  light4.decay = 2;
  light4.distance = 300;
  light4.castShadow = true;
  scene.add(light4);

  var geometry1 = new THREE.PlaneGeometry(5, 10);
  //var geometry2 = new THREE.BoxGeometry(1,3,.5);

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

  //var planet2 = new THREE.Mesh(geometry2, mat);
  //planet2.scale.x = planet2.scale.y = planet2.scale.z = 8;
  //box.add(planet2);

  var object_material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const objLoader = new OBJLoader();
  const object = objLoader.parse(obj.default);

  object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      //child.material = object_material;
    }
  });
  object.add(planet);
  object.position.z = 10;
  object.scale.set( 20, 20, 20 );
  scene.add(object);

  var ambientLight = new THREE.AmbientLight(0x999999, 0.1);
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

  const time = Date.now() * 0.001;

  light1.position.y = Math.cos(time * 0.9) * 40;
  light1.position.z = Math.cos(time * 0.7) * -40;
  light2.position.y = Math.sin(time * 0.7) * -20;
  light2.position.z = Math.sin(time * 0.7) * 20;
  light3.position.x = Math.cos(time * 0.8) * 20;
  light3.position.z = Math.cos(time * 0.3) * 20;
  light4.position.x = Math.sin(time * 0.85) * -20;
  light4.position.z = Math.sin(time * 0.3) * 20;
  //box.position.z = 10
  //box.rotation.x = .3
  //box.rotation.y = .2

  renderer.clear();

  renderer.render(scene, camera);
}
