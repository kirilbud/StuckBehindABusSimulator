/*
Name: Kiril Saltz
Project title: Cubicle Collateral
Hours: 17
creative tilt: used 1 point perspective projection to emulate 3d
Sources:
Music: made in Beepbox
sfx: made in sfxr.me
Sprites: Made in Aseprite and Blender (textures used in blender are from wikicommons)
in game music and art is made by me
*/


//game/phaser config
let config = {
    type: Phaser.AUTO,
    width: 840,
    height: 640,
    pixelArt: true,
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
