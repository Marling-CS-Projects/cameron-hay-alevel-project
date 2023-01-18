# 2.1.1 Cycle 9

## Design

### Objectives

separate the win block from the platform and create a first level.

* [x] Create a collectable that wins you the level
* [x] Create a level on the second map

### Usability Features

once you click on the level, it loads a playable level with a start and an end

### Key Variables

| Variable Name     | Use                                                                          |
| ----------------- | ---------------------------------------------------------------------------- |
| all floor objects | to be positioned around the level in various ways                            |
| winCon            | once you interact with this one it sends you back to the level select screen |

### Pseudocode

```
function win 
    if player collides with the objective block
    change page to main menu screen
```

## Development

### Outcome

the level works as it should and it meets all the criteria

## Testing

{% embed url="https://youtu.be/iKf7eddF2oY" %}

### Evidence

[link to code](https://github.com/Ca-Hay/CollisionDetection3D)

```
const player1 = new player(0, 4, 0, 1, 1, 1);
const floor1 = new floor(0, -2, 0, 4, 1, 4, 0x808080);
const floor2 = new floor(16, -2 , 0, 2, 1, 2, 0x909090);
const floor3 = new floor(11, 1, -10, 2, 1, 2, 0x808080);
const floor4 = new floor(16, 4, 3, 2, 1, 2, 0x808080);
const floor5 = new floor(0, 4, 5, 2, 1, 2, 0x808080);
const floor6 = new floor(-30, 4, 10, 2, 1, 2, 0x808080);
const floor7 = new floor(-4, 8, -10, 2, 1, 2, 0x808080);
const winCon = new floor(-30, 5, 10, 0.5, 0.5, 0.5, 0xFF0000)
```
