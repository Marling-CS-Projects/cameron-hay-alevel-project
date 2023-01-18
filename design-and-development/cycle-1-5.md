# 2.0.7 Cycle 5

### Objectives

allow the player to land on different platforms regardless of perspective issues

* [x] the player can jump to each platform regardless of perspective issues created by the 3d level
* [x] the player can reach the end of the test level via playing the game

### Usability Features

when the player falls onto a platform they stop falling and are able to jump again

### Key Variables

| Variable Name                                                   | Use                                                                          |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| <p>this.x<br>this.y<br>this.z<br>this.w<br>this.h<br>this.l</p> | to be able to have platforms be usable I need information on every platform. |
| cameraState                                                     | keeps track of the camera orientation                                        |
| floorObj                                                        | has each floor object inside of it                                           |
| instance                                                        | applies it to every floor                                                    |
| <p>max<br>min</p>                                               | refers to the bounding box maximum and minimum values                        |

### Pseudocode

```
when camera is facing so Z is on screen
    stretch X in both directions
    unstretch Z and return to its normal size

when camera is facing so X is on screen
    stretch Z in both directions
    unstretch X and return to its normal size
    

```

## Development

### Outcome

### Challenges

Getting JavaScript nodes & imports to work

figuring out how to scale the bounding boxes

## Testing

during development i was constantly moving around my character testing different situations and bug fixing code when things didn't work

### Tests

| Test | Instructions | What I expect | What actually happens | Pass/Fail |
| ---- | ------------ | ------------- | --------------------- | --------- |
|      |              |               | As expected           | Pass      |

### Evidence

{% embed url="https://youtu.be/hmavjzuWbNI" %}

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```javascript
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
```
