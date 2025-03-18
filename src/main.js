/*
Name: Kiril Saltz
Project title: Stuck Behind a Bus
Hours: 30
Phaser's major components:
1) particle effects - for clouds
2) text objects- for Dialog
3) he animation manager - for Dialog
4) the tween manager - for tutorial
5) timers - for Dialog
Sprites: Made in Krita
Sound effects: found in creative commons
3D math heavily inspired by this
https://math.stackexchange.com/questions/2337183/one-point-perspective-formula
Note:
*/


//game/phaser config
let config = {
    type: Phaser.AUTO,
    width: 840,
    height: 580,
    pixelArt: false,
    backgroundColor: '#67C3FC',
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [Menu, Play, Credits, HowTo]
}


let game = new Phaser.Game(config)

//ui stuff


//keyboard
let keySTOP, keyRESET, keyLEFT, keyRIGHT
