// Import necessary modules
import { ARButton } from "https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/loaders/GLTFLoader.js";
// import { FBXLoader } from "https://unpkg.com/three@0.126.0/examples/js/loaders/FBXLoader.js";

// import {GLBLoader} from "https://cdn.jsdelivr.net/npm/three-gltf-loader@1.111.0/index.min.js";
const modelURL =
  "https://ecommerce3d.blob.core.windows.net/3d-models/Bunker.glb";

// Declare global variables
let camera, scene, renderer;
let loader, model;

// Initialize the scene and start the animation loop
init();
animate();

function init() {
  // Create container for the scene
  const container = document.createElement("div");
  document.body.appendChild(container);

  // Create the scene
  scene = new THREE.Scene();

  // Set up the camera
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    40
  );

  // Set up the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true; // Enable WebXR
  container.appendChild(renderer.domElement);

  // Add lighting to the scene
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  // Add AR button to the page
  document.body.appendChild(ARButton.createButton(renderer));

  // Handle window resizing
  window.addEventListener("resize", onWindowResize, false);

  // Load 3D model

  loader = new GLTFLoader();
  // loader.position.z = -1;

  loader.load(
    modelURL,
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
      // model.position.z = -3;
      // model.position.y = -.3;

      //................................................
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);

      // Center the model
    //   const center = new THREE.Vector3();
    //   box.getCenter(center);
    //   model.position.sub(center); // Translate to center
    //   model.position.z = -size.z / 0.5; // Adjust z position based on depth
    //   model.position.y = -size.y / 3; // Adjust y position based on height

      // ........................................................
      console.log("Model loaded successfully");

      // Light to the object
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(2, 2, 2);
      model.add(pointLight);

      // Second light to the object
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);
    },

    function (event) {
      console.log("Loading progress:", event);
    },
    function (error) {
      console.error("Error loading model:", error);
    }
  );
}
// ............................................................................................................................
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
  }

function render() {
  renderer.render(scene, camera);
}

console.log("Initialization complete");
