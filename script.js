// Importing AR Button through CDN
import { ARButton } from "./arbutton.js";

// declre the variables
let camera, scene, renderer;
let mesh;

// 3D model........................
const modelUrl =
  "https://raw.githubusercontent.com/immersive-web/webxr-samples/main/media/gltf/space/space.gltf";
// function to initialize the scene
init();
// function to animate the scene
animate();

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  // adding light to the scene
  var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  //Add 3d model
  const geometry = new THREE.IcosahedronGeometry(0.1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(226,35,213)"),
    shininess: 6,
    flatShading: true,
    transparent: 1,
    opacity: 0.8,
  });

  // add mesh
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -0.5);
  scene.add(mesh);

  // Add the AR button to the body of the DOM
  document.body.appendChild(ARButton.createButton(renderer));

  window.addEventListener("resize", onWindowResize, false);
}
// ........................................................................

//window resize function..................................................
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// add animation.........................................................
function animate() {
  renderer.setAnimationLoop(render);
}
// .......................................................................
function render() {
  renderer.render(scene, camera);
}
