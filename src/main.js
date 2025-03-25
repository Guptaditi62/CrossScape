import * as THREE from "three";
import { Renderer } from "./components/Renderer.js";
import { Camera } from "./components/Camera.js";
import { DirectionalLight } from "./components/DirectionalLight.js";
import { player,initializePlayer } from "./components/Player.js";
import { map, initializeMap } from "./components/Map.js";
import { animateVehicles } from "./animateVehicles.js";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";

import "./style.css";
import "./collectUserInput.js";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

// const dirLight = new THREE.DirectionalLight();
// dirLight.position.set(-100, -100, 200);
const dirLight = DirectionalLight();
//scene.add(dirLight);
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
//scene.add(camera);
player.add(camera);

const scoreDOM = document.getElementById("score");
const resultDOM = document.getElementById("result-container");
initializeGame();

document
  .querySelector("#retry")
  ?.addEventListener("click", initializeGame);

function initializeGame() {
  initializePlayer();
  initializeMap();
  
  // Initialize UI
  if (scoreDOM) scoreDOM.innerText = "0";
  if (resultDOM) resultDOM.style.visibility = "hidden";
}

const renderer = Renderer();
//renderer.render(scene, camera);
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles();
  animatePlayer();
  hitTest();
  renderer.render(scene, camera);
}