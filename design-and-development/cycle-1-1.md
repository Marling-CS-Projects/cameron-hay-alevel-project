# 2.2.1 Cycle 1

## Design

### Objectives

get some objects to appear in the scene

* [x] create a floor class
* [x] make sure the floor class displays
* [x] light the floor

### Usability Features

the floor renders in the camera view

### Key Variables

| Variable Name | Use                                                                                |
| ------------- | ---------------------------------------------------------------------------------- |
| class floor   | creates a floor when it is given the coordinates, scale and position of the object |
| floor1        | creates a floor with a size and location                                           |
| floor2        | creates another floor with a size and location                                     |

### Pseudocode

```
procedure do_something
    
end procedure
```

## Development

### Outcome

### Challenges

Getting The orthographic camera to display the floors, near and far need to be large enough to contain the geometry and the position of it needs to be 0, 0, 0 due to the nature of the camera type.

## Testing

Evidence for testing

### Tests

| Test | Instructions | What I expect                                         | What actually happens | Pass/Fail |
| ---- | ------------ | ----------------------------------------------------- | --------------------- | --------- |
| 1    | Run code     | The blocks to display in the area where i designated. | As expected           | Pass      |

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
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
        this.meshBB.setFromObject(mesh);

        scene.add(this.mesh);
    }
}

const floor1 = new floor(0, 1, 0, 8, 1, 8);
const floor2 = new floor(0, -2, 0, 8, 1, 8);
//------------------------------------------------------------------------------

function animate() {
    renderer.render(scene, orthCamera);
    requestAnimationFrame(animate);
}
animate();
```
