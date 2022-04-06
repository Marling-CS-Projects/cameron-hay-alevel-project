# 2.2.1 Cycle 1

## Design

### Objectives

In this phase I made a scene and tested how collision works in THREE.js - it will draw two cubes in the scene and have them both be controllable using W/A/S/D and UP/LEFT/DOWN/RIGHT, when they collide they should display that they are colliding.

* [x] The Scene displays
* [x] The Cubes display
* [x] The Cubes are controllable
* [x] The Cubes show collision

### Usability Features

It works

### Key Variables

| Variable Name         | Use                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| cube                  | Is the mesh used for both cubes                                                                                             |
| material1 & material2 | Different Materials for use in both cubes                                                                                   |
| cube1 & cube2         | Is the object that combines the mesh and material                                                                           |
| cube1BB & cube2BB     | <p>The bounding boxes for either cube, it updates its location to cube  every frame:</p><p>cube2BB.setfromObject(cube2)</p> |
| function (e)          | detects if either WASD / UP RIGHT DOWN LEFT and moves the cubes accordingly                                                 |

### Pseudocode

```
procedure do_something
    
end procedure
```

## Development

### Outcome

### Challenges

Getting javascript nodes & imports to work

## Testing

Evidence for testing

### Tests

| Test | Instructions             | What I expect                                                 | What actually happens | Pass/Fail |
| ---- | ------------------------ | ------------------------------------------------------------- | --------------------- | --------- |
| 1    | Run code                 | Two Cubes of different colour appear on a plane in the scene. | As expected           | Pass      |
| 2    | Press WASD               | Cube 1 moves                                                  | As expected           | Pass      |
| 3    | Press UP RIGHT DOWN LEFT | Cube 2 moves                                                  |                       |           |
| 4    | Make Cubes collide       | Cubes Flash using a random colour.                            |                       |           |

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
import * as THREE from "./node_modules/three/build/three.module.js"
//SCENE
let scene = new THREE.Scene();
//CAMERA
 //create a camera to view the objects through 
 let camera = new THREE.PerspectiveCamera(
    75, //FOV
    window.innerWidth/ window.innerHeight, //Aspect Ratio
    0.1, //near and far plane
    1000
);
camera.position.set(0,5,5);
camera.lookAt(0,0,0)
//RENDERER
let renderer = new THREE.WebGLRenderer({antialias: true});
//set the background colour of the scene
renderer.setClearColor("#00FFFF");
//size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);

//create a canvas element with these renderer settings
document.body.appendChild(renderer.domElement);

//when the screen is streched, update
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
//LIGHTS
//colour, intensity, distance, decay.
let light = new THREE.PointLight(0xFFFFFF, 1.5, 500)
light.position.set(0,10,0);
scene.add(light);

//----------------------------------------------------------------------------

//Cube  1
let Cube = new THREE.BoxGeometry(1,1,1);
let Material1 = new THREE.MeshPhongMaterial( {color: "#92ABEA" });
let Material2 = new THREE.MeshPhongMaterial( {color: "#E86262" });
let cube1 = new THREE.Mesh(Cube, Material1)
cube1.position.set(3,0,0);
cube1.castShadow = true;

//Cube 1 Bounding box
let cube1BB = new THREE.Box3(new THREE.Vector3, new THREE.Vector3());
cube1BB.setFromObject(cube1)
//Cube 2 - Player Cube
let cube2 = new THREE.Mesh(Cube, Material2)
cube2.position.set(-3,0,0);
cube2.castShadow = true
//Cube 2 Bounding box
let cube2BB = new THREE.Box3(new THREE.Vector3, new THREE.Vector3());
cube2BB.setFromObject(cube2)
//Floor
let floor = new THREE.PlaneGeometry(150, 150);
let greenFloor = new THREE.MeshStandardMaterial( { color:'grey' } )
let plane1 = new THREE.Mesh(floor, greenFloor);
plane1.position.set(0,-0.5,0);
plane1.rotateX(-Math.PI / 2)
//add all objects to the scene
scene.add(cube1, cube2, plane1)
//----------------------------------------------------------------------------
//KEY CONTROLs

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        //if left arrowkey pressed
        cube2.position.x -= 0.1;
        //left
    } else 
    if (e.keyCode === 39) {
        //if right arrowkey pressed
        cube2.position.x += 0.1;
        //right
    } else
    if (e.keyCode === 38) {
        //if up arrowkey pressed
        cube2.position.z -= 0.1;
        //forward
    } else 
    if (e.keyCode === 40) {
        //if down arrowkey pressed
        cube2.position.z += 0.1;
        //backwards
    } else     
    if (e.keyCode === 65) {
        //if A pressed
        cube1.position.x -= 0.1;
        //left
    } else 
    if (e.keyCode === 68) {
        //if D arrowkey pressed
        cube1.position.x += 0.1;
        //right
    } else
    if (e.keyCode === 87) {
        //if W pressed
        cube1.position.z -= 0.1;
        //forward
    } else 
    if (e.keyCode === 83) {
        //if S pressed
        cube1.position.z += 0.1;
        //backwards
    }
};

//Orbit controls exist NO THEY DONT LOL
//let controls = new OrbitControls ( camera, domElement)

//----------------------------------------------------------------------------
//TEXT
//----------------------------------------------------------------------------
function animation1 (){
    cube1.material.transparent = true;
    cube1.material.opacity = 0.5;
    cube1.material.color = new THREE.Color(Math.random() * 0xffffff)

    cube2.material.transparent = true;
    cube2.material.opacity = 0.5;
    cube2.material.color = new THREE.Color(Math.random() * 0xffffff)
}


function checkCollisions(){
    if (cube2BB.intersectsBox(cube1BB)) {
        console.log("i am colliding")
        animation1();
    } else {
        cube1.material.opacity = 1.0;
    }
}

function animate() {
    cube2BB.copy( cube2.geometry.boundingBox).applyMatrix4(cube2.matrixWorld);
    cube1BB.copy( cube1.geometry.boundingBox).applyMatrix4(cube1.matrixWorld);
    checkCollisions()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
```
