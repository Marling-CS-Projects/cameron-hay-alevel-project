# 2.0.5 Cycle 3

## Design

### Objectives

Create a system where you can change the side the game is being viewed from with Q & E the game knows which side the scene is being viewed from and change the movement to accompany it.

* [x] Can change what side the 3d scene is being viewed from.
* [x] Constantly know what side the game is being viewed from.
* [x] Change the movement based on what side you are viewing the scene from.

### Usability Features

Q and E move the camera around the scene left and right respectively this allows the level to change uniquely and have the player learn this new mechanic.

### Key Variables

| Variable Name    | Use                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------- |
| cameraCounter    | keep count of what direction the camera is viewing from and store it in a variable.   |
| movementXpos     | movement for X positive                                                               |
| movementXneg     | movement for X negative                                                               |
| movementZpos     | movement for Z positive                                                               |
| movementZneg     | movement for Z negative                                                               |
| movementOverall  | is called every frame, decides which type of movement to allow based on cameraCounter |
| cCountController | if the number of cameraCounter goes to 4, set it to 0 if it gets to -1 set it to 3    |

### Pseudocode

```
when Q pressed turn on
when E pressed turn on

if Q pressed
    cameracounter -1
    rotate camera -90 degrees
if E pressed
    cameracounter +1
    rotate camera 90 degrees

if cameracounter is 0
    movementZpos
if cameracounter is 1
    movementXpos
if cameracounter is 2
    movementZneg
if cameracounter is 3
    movementXneg
    

```

## Development

### Outcome

The scene changes what perspective it is being viewed from when you press either Q or E, this also updates what "side" it is being viewed from, either 1, 2, 3 or 4.

### Challenges

Getting JavaScript nodes & imports to work

Getting the Array to display the correct side&#x20;

## Testing

Evidence for testing

![](<../.gitbook/assets/image (6) (1) (3).png>)

![](<../.gitbook/assets/image (2) (1) (2).png>)

![](<../.gitbook/assets/image (3) (2).png>)

![](<../.gitbook/assets/image (5) (2) (1).png>)

![](<../.gitbook/assets/image (7) (2).png>)

![](<../.gitbook/assets/image (10) (1).png>)

![](<../.gitbook/assets/image (9) (1).png>)

![](<../.gitbook/assets/image (8) (1).png>)

### Tests

| Test                    | Instructions | What I expect        | What actually happens | Pass/Fail |
| ----------------------- | ------------ | -------------------- | --------------------- | --------- |
| rotate by one           | press E      | console to display 2 | As expected           | Pass      |
| rotate by 2             | press E x 2  | console to display 3 | As expected           | Pass      |
| rotate counterclockwise | press Q      | console to display 4 | As expected           | ass       |

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```javascript
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
devCamera.position.set(0,0,0);
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
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiRight.png')}),         //Left   pz
        new THREE.MeshStandardMaterial({ map: textureLoader.load('../img/moyaiLeft.png')}),        //Right  nz
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
let qDown = false;
let eDown = false;
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

function movementZneg(){
  if(aDown === true) {
      player1.mesh.position.x += 1* speed;
  };
  if(dDown === true) {
      player1.mesh.position.x -= 1* speed;
  };
}

function movementXpos(){
  if(aDown === true) {
      player1.mesh.position.z += 1* speed;
  };
  if(dDown === true) {
      player1.mesh.position.z -= 1* speed;
  };
}

function movementXneg(){
  if(aDown === true) {
      player1.mesh.position.z -= 1* speed;
  };
  if(dDown === true) {
      player1.mesh.position.z += 1* speed;
  };
}

const cameraState = [1, 2, 3, 4];
let cameraCounter = 0;

function cCountController(){
if (cameraCounter === 4){
  cameraCounter = 0;
}
if (cameraCounter === -1){
  cameraCounter = 3;
}
console.log(cameraState[cameraCounter]);
}


//makes radians normal numbers instead of stuipid math
function radToDeg ( degrees ) {
  return degrees * (Math.PI / 180);
}

//activates gravity based on the variable
function gravity(){
  if (gravT){
  player1.mesh.position.y -= 0.25;
  }
}

//checks if the player has fallen off the map
function deathCheck(){
  if(player1.mesh.position.y < -20){
    player1.mesh.position.set(0, 4, 0);
  } 
}

//checks if the player is colliding with anything
function checkCollision(){
  grounded = false;
  gravT = true;
  floorObj.forEach(instance => {
    if (player1.meshBB.intersectsBox(instance) && !(player1.mesh.position.y < instance.max.y + 0.5)){
      console.log("im screamn")
      grounded = true;
      gravT = false;
    }
  })
}


//------------------------------------------------------------------------------

//on keydown it activates the variable for the key and on keyup it deactivates it
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
      case 81: // q
        qDown = false;    
        orthCamera.rotateY(radToDeg(-90));
        cameraCounter -= 1;
        console.log("q")
        break;
      case 69: // e
        eDown = false;
        orthCamera.rotateY(radToDeg(90));
        cameraCounter += 1;
        console.log("e")
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
      case 81: // q
        qDown = true;
        console.log("q")
        break;
      case 69: // e
        eDown = true;
        console.log("e")
        break;
    }
});

//based on the cameracounter, change the way it moves
function movementOverall(){
  if(cameraCounter == 0){
    movementZpos()
  }
  else if(cameraCounter == 1){
    movementXpos()
  }
  else if(cameraCounter == 2){
    movementZneg()
  }
  else if(cameraCounter == 3){
    movementXneg()
  }
}

//------------------------------------------------------------------------------
function animate() {
  renderer.render(scene, orthCamera);

  gravity();
  player1.meshBB.setFromObject(player1.mesh);

  checkCollision();
  movementOverall();
  
  cCountController();
  deathCheck();

  requestAnimationFrame(animate);
};
animate();
```
