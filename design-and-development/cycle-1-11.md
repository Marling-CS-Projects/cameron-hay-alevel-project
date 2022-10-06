# 2.1.3 Cycle 11

## Design

### Objectives

Create a level that flashes with lightning to create an invisible block effect, this will make the user think about their next action - it will also be introducing a new level of depth to the game that I can use in future levels.

* [x] The lightning reveals the platforms every now and then.
* [x] There is a Moyai-face in the middle of the level that always faces the player but you cannot stand on it.
* [x] There is a reachable objective at the end of the level.

### Usability Features

The level is playable with different keybinds such as W/ Space /Up all can be used to jump and you can leave the webpage instantly by beating the level.

### Key Variables

| Variable Name            | Use                                                               |
| ------------------------ | ----------------------------------------------------------------- |
| lightningCount           | counts every frame and adds it to itself                          |
| renderer.setClearColor() | changes the colour of the background based on the inputted colour |
| lightning                | changes the colour based on the number lightning count has.       |

### Pseudocode

```
function lightning
  lightningCount += 1
  if lightningCount is more than 150
    change background colour to white
    if lightningCount is more than 225
      reset lightningCount
  else
    change colour back to blue
```

## Development

### Outcome

### Challenges

the background didn't want to change colour, so i had to re do the code a few times to make it work.

## Testing

{% embed url="https://youtu.be/owN2B5ho_zU" %}

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
function lightning(){
  lightningCount += 1
  //console.log(lightningCount)
  if(lightningCount > 150){
    renderer.setClearColor(0xffffff)
    moyaieye1.mesh.scale.set(1, 1, 1);
    moyaieye2.mesh.scale.set(1, 1, 1);
    if(lightningCount > 225){
      lightningCount = 0;
    }
  }else {
    renderer.setClearColor(0xb9ffff)
    moyaieye1.mesh.scale.set(1, 0.25, 1);
    moyaieye2.mesh.scale.set(1, 0.25, 1);
  }
}
```
