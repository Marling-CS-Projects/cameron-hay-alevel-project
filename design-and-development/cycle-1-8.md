# 2.1.0 Cycle 8

## Design

### Objectives

create a working tutorial, explaining the keys and objective to the user.

* [x] text on the tutorial level explaining the objective and what the keybinds are
* [x] once you reach the red platform, change the page to the level select screen

### Usability Features

the user can reach the red platform through the use of the games mechanics

### Key Variables

| Variable Name  | Use                                              |
| -------------- | ------------------------------------------------ |
| haswon         | checks if the player has won                     |
| objectiveBlock | is the block the player has to get to, it is red |

### Pseudocode

```
function win 
    if player collides with the objective block
    change page to main menu screen
```

## Development

### Outcome

a working tutorial and objective

### Challenges

figuring out how javascript can influence html

## Testing

{% embed url="https://youtu.be/JSAtZ0NLZtw" %}

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="style2.css">
    <title>Tutorial</title>
</head>
<body>
    <script src="main.js" type="module"></script>
    <a id="inLevelButt" href="levelselect.html">Level Select</a>
    <div id="foont">
    <p1 id="info1">Controls are:</p1>
        <ul id="info2">            
            <li>Space = Jump (hold for longer jump)</li>
            <li>Q = Rotate Left</li>
            <li>E = Rotate Right</li>
            <li>A = Move Left</li>
            <li>D = Move Right</li>
        </ol>
        <p1 id="info3">in order to "beat" the level get to the red</p1>
    </div>
</body>
</html>

function win(){
  if(player1.meshBB.intersectsBox(floor4.meshBB)){
    window.location.href = "./levelselect.html"
  }
}
```
