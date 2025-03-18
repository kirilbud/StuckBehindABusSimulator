class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene")
    }

    preload(){

    }

    create(){

        this.add.rectangle(0,0,game.config.width, game.config.height, 0xDC5300).setOrigin(0)
        
        

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#e6d526',
            color: '#000000',
            alighn: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0
        }

        //menu text
        menuConfig.color = '#000000'


        this.text1 = this.add.text(game.config.width/2, game.config.height/7, 'CREDITS:', menuConfig).setOrigin(0.5)
        this.text1 = this.add.text(game.config.width/2, game.config.height*2/7, "Made by Kiril Saltz", menuConfig).setOrigin(0.5)
        this.text1 = this.add.text(game.config.width/2, game.config.height*3/7, 'Art assets made in Krita', menuConfig).setOrigin(0.5)
        this.text1 = this.add.text(game.config.width/2, game.config.height*4/7, 'profile Pictures, Logo and Bus traced from Family guy', menuConfig).setOrigin(0.5)
        this.text1 = this.add.text(game.config.width/2, game.config.height*5/7, 'Sfx using creative commons and clips from Family Guy', menuConfig).setOrigin(0.5)
        this.text1 = this.add.text(game.config.width/2, game.config.height*6/7, 'Press Space to go back to menu', menuConfig).setOrigin(0.5)

        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySTOP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySTOP)){
            this.scene.start('menuScene')
            //this.sound.play('select')
        }
    }
}