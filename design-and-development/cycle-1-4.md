# 2.0.6 Cycle 4

## Design

### Objectives

get the game character to jump.

* [x] The Scene displays
* [x] the level has a "puzzle" tutorial that uses jumps
* [x] the player character can jump with a smooth up and down motion

### Usability Features

on a keypress, if you are grounded, make the character move up and down independently from the arrow keys

### Key Variables

| Variable Name | Use                                                                                   |
| ------------- | ------------------------------------------------------------------------------------- |
| onGround      | to check if the player is on the floor                                                |
| jumpCount     | the amount of "charges" the jump has before it begins to go down                      |
| isJumping     | checks if the player is currently jumping                                             |
| gravity       | activates grav                                                                        |
| grav          | if the player isn't on the ground and isn't jumping it makes the character moves down |
| yump          | all of the jump logic                                                                 |

### Pseudocode

```
when on floor
    isjumping = false;
    grounded = true;
    gravity = false;
    
jump
    if on ground and pressing space
        isjumping = true
    if jump "charges" are less than 15 && space is being pressed && is jumping
        move the player up
        +1 to jump charges
    else if jumpcount is more than 15 or space is no longer being pressed
        isjumping = false
    
grav
    if onground && isjumping = false
        move position down
        
animate
    jump
    grav
```

## Development

### Outcome

on pressing space the character moves up until all charges are expended or space stops being held.

### Challenges

I went through many iterations and it had to be the longest part of the project so far, trying to figure out a way of smoothly getting a jump up and down without any plugins was difficult but in the end I was able to figure it out.

## Testing

![](<../.gitbook/assets/image (1) (3).png>)

this is a picture of the moyai mid jump

### Tests

| Test             | Instructions                        | What I expect           | What actually happens | Pass/Fail |
| ---------------- | ----------------------------------- | ----------------------- | --------------------- | --------- |
| do a short jump  | hold down spacebar for 0.25 seconds | player1 to jump         | As expected           | Pass      |
| do a longer jump | hold down spacebar for 1.5 seconds  | player 1 to jump higher | as expected           | pass      |

### Evidence

{% embed url="https://youtu.be/cerDqc491E4" %}

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
function yump(){
  if(onGround === true && spaceDown === true){
    isJumping = true;
  }
  if(jumpCount<15 && isJumping === true && spaceDown === true){
    player1.mesh.position.y += 0.25
    jumpCount +=1
  } else if(jumpCount >= 15 || spaceDown === false){
    isJumping = false;
  }
}

function grav(){
  if(onGround === false && isJumping === false){
    player1.mesh.position.y -= 0.25
  }
}
```
