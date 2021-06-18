import './style.css'


import * as THREE from 'three';
import { PointLight } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


// Creating a new scene object
const scene = new THREE.Scene();

// making the camera perspective the size of the window 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

// Uses WebGL to render the background with #bg
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const donutTexture = new THREE.TextureLoader().load('pictures/donut.jpg');
const donutMap = new THREE.TextureLoader().load('pictures/donutmap.jpg');

// Creating the DONUT :)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
//const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const material = new THREE.MeshStandardMaterial({map: donutTexture,
                                                 normalMap: donutMap});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(8,15,8)

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight)

// Shows the Light and shows the grid to help with CSS

/*
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
*/

const controls = new OrbitControls(camera, renderer.domElement);

// Creates the *Star* for the webpage 
function addStar() {

  // the circles made the stars feel weird
  //const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const geometry = new THREE.IcosahedronGeometry(0.2, 0);
  const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF})
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star)

}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('pictures/space2.jpg');
scene.background = spaceTexture;

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

}


// Testing out rubiks cube texture (not working out so well might need to create in blender and import)
/*const rubiksTexture = new THREE.TextureLoader().load('rubiks.png');

const rubiks = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: rubiksTexture })
);

scene.add(rubiks);*/


function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.004;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.003;

  controls.update();

  renderer.render(scene, camera);
}

animate();