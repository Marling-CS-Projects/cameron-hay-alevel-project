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
```
