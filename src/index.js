import * as three from "three";

// render that streams to html node
const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera that its POV from the render to display
const camera = new three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 200);
camera.lookAt(0, 0, 0);

// scene to render
const scene = new three.Scene();

// Actual webgl figures to inject in scene
const material = new three.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new three.Vector3(-10, 0, 0));
points.push(new three.Vector3(0, 10, 0));
points.push(new three.Vector3(10, 0, 0));
const geometry = new three.BufferGeometry().setFromPoints(points);
const line = new three.Line(geometry, material);
scene.add(line);

renderer.render(scene, camera);
