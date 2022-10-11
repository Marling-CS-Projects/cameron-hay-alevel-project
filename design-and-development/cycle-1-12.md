# 2.1.4 Cycle 12

## Design

### Objectives

Create a level that utilises teleporters it will also be introducing a new level of depth to the game that I can use in future levels. This allows the player to learn another feature.

* [x] When you touch one green block it takes you to the other green block
* [ ] The level successfully utilises the portals to expand on the players learning
* [ ] There is a reachable objective at the end of the level

### Usability Features

The level is playable with different keybinds such as W/ Space /Up all can be used to jump and you can leave the webpage instantly by beating the level.

### Key Variables

| Variable Name    | Use                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| teleportA        | logic to teleport between the pair of teleporters A1 and A2                                              |
| teleportSickness | after teleporting it turns off the ability to teleport and once you hit the floor you can teleport again |

### Pseudocode

```
function TeleportA
    if colliding with portalA1 and isnt teleport sick
        move to portalA2
        become teleport sick
    if colliding with portalA2 and isnt teleport sick
        move to portalA1
        become teleport sick
    
when i am colliding with a floor object
    teleportsickness = false
```

## Development

### Outcome

### Challenges

Getting JavaScript nodes & imports to work

## Testing

Evidence for testing

### Tests

| Test | Instructions | What I expect | What actually happens | Pass/Fail |
| ---- | ------------ | ------------- | --------------------- | --------- |
|      |              |               | As expected           | Pass      |

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
function teleportA(){
  if(player1.meshBB.intersectsBox(portalA1.meshBB) && teleportSickness === false){
    player1.mesh.position.x = portalA2.x;
    player1.mesh.position.z = portalA2.z;
    player1.mesh.position.y = portalA2.y;
    teleportSickness = true;
  }
  if(player1.meshBB.intersectsBox(portalA2.meshBB) && teleportSickness === false){
    player1.mesh.position.x = portalA1.x;
    player1.mesh.position.z = portalA1.z;
    player1.mesh.position.y = portalA1.y;
    teleportSickness = true;
  }
}

function checkCollision(){
  onGround = false;
  gravity = true;
  floorObj.forEach(instance => {
    if (player1.meshBB.intersectsBox(instance.meshBB) && !(player1.mesh.position.y < instance.meshBB.max.y)){
      if(cameraState[cameraCounter] == 1 || cameraState[cameraCounter] == 3){
      player1.mesh.position.z = instance.z
      }
      if(cameraState[cameraCounter] == 2 || cameraState[cameraCounter] == 4){
        player1.mesh.position.x = instance.x
      }
      onGround = true;
      gravity = false;
      teleportSickness = false;
      if(isJumping == false){
        jumpCount = 0;
      }
    }
  })
}
```
