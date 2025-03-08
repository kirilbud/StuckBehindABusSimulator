/*
Name: Kiril Saltz
Project title: Stuck Behind a Bus
Hours: 10
Sources:
Music: 
sfx: 
Sprites: Made in Krita
in game music* and art is made by me
*music not done yet
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
    scene: [Menu, Play, Credits]
}


let game = new Phaser.Game(config)

//ui stuff


//keyboard
let keySTOP, keyRESET, keyLEFT, keyRIGHT
