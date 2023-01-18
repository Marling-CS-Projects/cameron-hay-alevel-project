# 2.1.2 Cycle 10

## Design

### Objectives

add more functionality to the first level requiring you to get to a button before the red objective reveals itself

* [x] add a secondary objective to the level
* [x] make it so platforms can move

### Usability Features

you can get to and from the start and the button and then from the button to the end of the level, if you fal off it should reset the level.

### Key Variables

| Variable Name | Use                                           |
| ------------- | --------------------------------------------- |
| button        | on collide it should reveal the red objective |
| objective     | on collide it should move to a different page |

### Pseudocode

```
if button has not been pressed
    keep object at y = 100
if button has been pressed
    move objects to place where they should be
```

## Development

### Outcome

The level has a functioning button class that upon touching reveals the final platform that you need to get to progress the level.

### Challenges

I coded a whole new class for the button before realising i could just reuse the floor class and have you not collide with it to make a button and call it something other than floor#no.&#x20;

## Testing

{% embed url="https://youtu.be/BX2J1mO7Fv4" %}

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```javascript
function buttonLogic(){
  if(player1.meshBB.intersectsBox(button1.meshBB)){
    buttonPressed = true;
  }if(buttonPressed == true){
    //floor6(-16, 4, 7, 2, 1, 2, 0x808080);
    floor6.mesh.position.y = 4
    floor6.meshBB.setFromObject(floor6.mesh);
    winCon.mesh.position.y = 5
    winCon.meshBB.setFromObject(winCon.mesh);
  } else if(buttonPressed == false){
    floor6.mesh.position.y = 100
    floor6.meshBB.setFromObject(floor6.mesh);
    winCon.mesh.position.y = 100
    winCon.meshBB.setFromObject(winCon.mesh);
  }
}
```
