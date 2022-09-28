# 2.7 Cycle 7

## Design

### Objectives

add a main menu / level select to my game, this should help expand expand the scope of the game.

* [x] the main webpage has a button that takes you to the level
* [x] the level doesn't break when you navigate to it in this way
* [x] add a return button that takes you back to the level select

### Usability Features

the buttons are clearly labelled with where they should go

### Pseudocode

```
when press on the main menu button move the webpage to a level select page
when press on the different levels move to a webpage with the javascript linked
when on the levels you can click in the top corner to navigate back to level select
```

## Development

### Outcome

a main menu screen that has a logo and buttons, along with a level select, currently only the tutorial is finished.

### Challenges

using css to get the buttons into place was difficult

## Testing

I clicked through the different webpages and it worked

{% embed url="https://youtu.be/6XOgoihB82w" %}

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Menu</title>
</head>
<body>
    <a id= "logo" href="index.html"><img src= "public/Moyai jump.png" height="100%" width="100%"></a>
    <a id="butt" href="levelselect.html">Start</a>
</body>
</html>
------------------------
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style2.css">
    <title>Level Select</title>
</head>
<body>
    <a id= "logo" href="index.html"><img src= "public/Moyai jump.png" height="100%" width="100%"></a>
    <a id="BTut" href="tutorial.html">Tutorial</a>
    <a id="B1" href="level1.html">Level 1</a>
    <a id="B2" href="level2.html">Level 2</a>
    <a id="B3" href="">Level 3</a>
    <a id="B4" href="">Level 4</a>
</body>
</html>
-----------------------------
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
</body>
</html>
```
