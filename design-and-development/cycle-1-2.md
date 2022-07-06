# 2.2.2 Cycle 2

## Design

### Objectives

Get a player model to render and have collision with the floor blocks

* [x] create a player class that I can edit easily.
* [x] add bounding boxes to both the player and the floor so it can detect when the collide.
* [x] make the player character move so I can test if collision works.

### Usability Features

The system needs to be able to detect if objects are colliding, I will do this by checking every object against the player every frame, this is not scale able and I will have to have a better solution at some point.

### Key Variables

| Variable Name          | Use                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| class player           | sets up the player class with a mesh and a bounding box & texture                                         |
| class floor            | sets up the floor class with a mesh and bounding box                                                      |
| floor1, floor2, floor3 | instances of the class floor, contains position and size of the platforms.                                |
| player1                | the player, can be respawned and respawned at will                                                        |
| function gravity       | a function that makes the player character fall if the variable gravT is true.                            |
| function grounded      | useless at time being                                                                                     |
| updateCollisions       | moves the bounding box to the mesh of its respective owner every frame, this is used for things that move |
| aDown, dDown           | A and D move the character left and right in the stage.                                                   |
| deathCheck             | if the cube falls below a certain point it will be moved back to its starting position                    |

### Pseudocode

```
render scene
class floor (x, y, z, w, h, l)
    floor has mesh 
    mesh has position(x, y, z)
    mesh has size(w, h, l)
    set bounding box from mesh
    add floor to scene
    
class player (x, y, z, w, h, l)
    player has mesh 
    player has initial position(x, y, z)
    player has size(w, h, l)
    set bounding box from mesh
    add player to scene
    
floor1 position + size
floor2 position + size
floor3 position + size

when playerboundingbox touches floorboundingbox
    disable gravity
    enable grounded
    
when press A
    move player left
when press D
    move player right
```

## Development

### Outcome

### Challenges

Getting the bounding boxes to behave like they should instead of breaking the entire scene.

## Testing

While coding a few bugs arose, most notably the .copy function was not working as intended so I had to use .setFromObject instead this functioned almost identically and also worked.

There was also an issue involving the cube falling through the first floor and landing on the second, I expanded the list and it only landed on the third now, I figured out that it was checking against every object and saw it wasn't colliding with them, so it turned gravity on again, but when the code got to the end of the list of objects it stopped because it was at the end of the loop.

There was also an issue where the player would stick to the bottom of the platforms, this was because it was still technically "colliding" with them so gravity was still turned off, i fixed this by making the cube collide with the top of the cube and not the bottom for disabling gravity.&#x20;

### Tests

| Test                                                   | Instructions                                | What I expect                                 | What actually happens                                        | Pass/Fail |
| ------------------------------------------------------ | ------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ | --------- |
| does the cube collide with the floors and stop moving? | let the cube fall onto one of the platforms | the cube to stop when it reaches the platform | the cube detects collision and stops when it hits a platform | Pass      |
| does the scene render                                  | press "go live"                             | the scene to be visible                       | the scene displays                                           | Pass      |

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
import * as THREE from './node_modules/three/build/three.module.js'

//create scene
let scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

//create camera to view scene
//Left, Right, Top, Bottom, Near, Far
let scale = 24;
let aspectRatio = window.innerWidth / window.innerHeight;
let orthCamera = new THREE.OrthographicCamera(
-aspectRatio * scale / 2, aspectRatio * scale / 2, scale / 2, -scale / 2,
-1000,
1000);
orthCamera.position.set(0,0,0);

const devCamera = new THREE.PerspectiveCamera(
  75,
  aspectRatio,
  -20,
  1000
);
devCamera.position.set(8,8,8);
devCamera.lookAt(0,0,0);

//renderer settings
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor('#ADD8E6')
renderer.setSize(window.innerWidth, window.innerHeight);
//creates a cavanvas object with the renderer settings
document.body.appendChild(renderer.domElement);
//when the window resolution changes, change the render settings to the new size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    orthCamera.aspect = aspectRatio;
    orthCamera.updateProjectionMatrix();
})

//ambient light - lowest possible light level
//colour, intensity, distance, decay.
let ambient = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambient);

//------------------------------------------------------------------------------

class floor {
    constructor(x, y, z, w, h, l) {
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w, h, l),
            new THREE.MeshLambertMaterial( {color: 0xf0f0f0 } )
        );
        this.mesh.castShadow = true;
        this.mesh.recieveShadow = true;
        this.mesh.position.set(x, y, z);

        this.meshBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.meshBB.setFromObject(this.mesh);

        scene.add(this.mesh);
    }
}

class player {
    constructor(x, y, z, w, h, l) {
      this.geometry = new THREE.BoxGeometry(w, h, l),
      this.playerTexture = [
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiLeft.png')}),         //Left   pz
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiRight.png')}),        //Right  nz
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiTopandBottom.png')}), //Top    py
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiTopandBottom.png')}), //Bottom ny
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiFront.png')}),        //Front  px
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiBack.png')}),         //Back   nx
      ];
      this.mesh = new THREE.Mesh(this.geometry, this.playerTexture);
      this.mesh.castShadow = true;
      this.mesh.position.set(x, y, z);

      this.meshBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      this.meshBB.setFromArray(this.mesh);

      scene.add(this.mesh);
    }
}

const player1 = new player(0, 4, 0, 1, 1, 1);
const floor1 = new floor(-3, -3, 0, 3, 1, 3);
const floor2 = new floor(3, -3, 0, 3, 1, 3);
const floor3 = new floor(0, -5, 0, 3, 1, 3);

//------------------------------------------------------------------------------
//functions
const floorObj = [floor1.meshBB, floor2.meshBB, floor3.meshBB];

let gravT = false;
let grounded = false;
let wDown = false;
let sDown = false;
let aDown = false;
let dDown = false;
let spaceDown = false;
let speed = 0.2;


function movementZpos(){
  if(aDown === true) {
      player1.mesh.position.x -= 1* speed;
  };
  if(dDown === true) {
      player1.mesh.position.x += 1* speed;
  };
}

function gravity(){
  if (gravT){
  player1.mesh.position.y -= 0.25;
  }
}

function deathCheck(){
  if(player1.mesh.position.y < -20){
    player1.mesh.position.set(0, 4, 0);
  } 
}

function checkCollision(){
  grounded = false;
  gravT = true;
  floorObj.forEach(instance => {
    if (player1.meshBB.intersectsBox(instance)){
      console.log("im screamn")
      grounded = true;
      gravT = false;
    }
  })
}

//------------------------------------------------------------------------------

window.addEventListener('keyup', (e) => {
    switch (e.keyCode){
      case 87: // w
        wDown = false;
        break;
      case 65: // a
        aDown = false;
        break;
      case 83: // s
        sDown = false;
        break;
      case 68: // d
        dDown = false;
        break;
      case 32: // space
        spaceDown = false;
        break;
    }
});
  window.addEventListener('keydown', (e) => {
    switch (e.keyCode){
      case 87: // w
        wDown = true;
        console.log("w")
        break;
      case 65: // a
        aDown = true;
        console.log("a")
        break;
      case 83: // s
        sDown = true;
        console.log("s")
        break;
      case 68: // d
        dDown = true;
        console.log("d")
        break;
      case 32: // space
        spaceDown = true;
        console.log("space")
        break;
    }
});

//------------------------------------------------------------------------------
function animate() {
  renderer.render(scene, orthCamera);

  gravity();
  player1.meshBB.setFromObject(player1.mesh);

  checkCollision();
  movementZpos();
  
  deathCheck();

  requestAnimationFrame(animate);
};
animate();
```
