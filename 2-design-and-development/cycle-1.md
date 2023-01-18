# 2.0.2 Cycle 0

## Design

### Objectives

In this phase I want the webpage to display anything other than a blank white page, I want to be able to render a scene and a camera in THREE.JS

* [x] The Scene displays
* [x] The Scene displays a different colour
* [x] The Camera works

### Usability Features

A graphical display is required for the game to be played, in my "first" cycle I have made an empty 3D space with a coloured background.

### Key Variables

| Variable Name | Use                                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| scene         | creates an empty 3D world that i can add things to.                                                                                      |
| orthCamera    | creates an orthographic camera that is added to the scene that we can view the scene through and is what ends up displaying the webpage. |
| renderer      | a built in webGLRenderer in the THREE.js library that renders the scene, ideally has the height and width of the camera.                 |
| ambient       | a light that makes the default lowest light level a value.                                                                               |

### Pseudocode

```javascript
create scene
create camera
    camera values here

create renderer
create canvas with render settings
when the screen is stretched, update the screen resolution
create light
add light to scene

animate function 
    render( scene & camera )
call animate
```

## Development

### Outcome

### Challenges

Getting javascript nodes & imports to work, got it in the end

## Testing

Evidence for testing

### Tests

| Test | Instructions | What I expect                                 | What actually happens | Pass/Fail |
| ---- | ------------ | --------------------------------------------- | --------------------- | --------- |
| 1    | Run code     | The background of the scene displays a colour | as expected           | pass      |

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```javascript
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

function animate() {
    renderer.render(scene, orthCamera);
    requestAnimationFrame(animate);
}
animate();
```
