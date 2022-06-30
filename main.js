import * as THREE from './nodes/three.module.js'

//create scene
let scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

//create camera to view scene
//Left, Right, Top, Bottom, Near, Far
const scale = 8;
let orthCamera = new THREE.OrthographicCamera(
-1.72 * scale, 1.72 * scale, 1 * scale, -1 * scale,
-1000,
1000);

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
        ]
        this.mesh = new THREE.Mesh(this.geometry, this.playerTexture);
        this.mesh.castShadow = true;
        this.mesh.position.set(x, y, z);

        this.meshBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.meshBB.setFromArray(this.mesh);

        scene.add(this.mesh);
    }
}

const player1 = new player(0, 3, 0, 1, 1, 1);
const floor1 = new floor(0, 1, 0, 8, 1, 8);
const floor2 = new floor(0, -2, 0, 8, 1, 8);
//------------------------------------------------------------------------------
//functions
let listOfBoundingBoxes = [floor1.meshBB, floor2.meshBB];
function updateCamera(){
//orthCamera.position.set(player1.x, player1.y, player1.z);
};
function checkCollisions(){
    if (player1.meshBB.intersectsBox(listOfBoundingBoxes)) {
        console.log("ඞ")
    }
    else {
        console.log("aughh")
    }
}
//only use for moving things
function updateBoundingBoxes(){
    player1.meshBB.copy (player1.geometry.boundingBox).applyMatrix4(player1.matrixWorld);
}
//------------------------------------------------------------------------------
let keystate = [];

window.addEventListener('keydown', e => {
    e.preventDefault();
    if (!keystate[e.keyCode]) {
      keystate[e.keyCode] = true;
      push();
    }
});
  
window.addEventListener('keyup', e => {
    e.preventDefault();
    delete keystate[e.keyCode];
    push();
});

function push() {
    let jump = false;
    if (keystate[87]) {
        player1.position.y++;
    }
    if (keystate[65]) {
        player1.position.x--;
    }
    if (keystate[83]) {
        player1.position.y--;
    }
    if (keystate[68]) {
        player1.position.x++;
    }
    if (keystate[32]) {
        jump = true;
    }
}
//------------------------------------------------------------------------------

function animate() {
    renderer.render(scene, orthCamera);

    updateCamera();
    updateBoundingBoxes();
    checkCollisions();

    requestAnimationFrame(animate);
}
animate();

