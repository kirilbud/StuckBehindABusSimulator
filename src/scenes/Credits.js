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
            fontSize: '28px',
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
        this.add.text(game.config.width/2, game.config.height/8, 'CREDITS:', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*2, 'Made by Kiril Saltz', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*3, 'Art assets made in Krita', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*5, 'Music comming soon', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*6, 'Sfx made with Adobe Audition using creative commons', menuConfig).setOrigin(0.5)
        //this.add.text(game.config.width/2, game.config.height/7*6 , 'Use ← → arrows to move & space to stop', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*7, 'Press Space to go back to menu', menuConfig).setOrigin(0.5)

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