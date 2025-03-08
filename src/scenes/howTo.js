class HowTo extends Phaser.Scene {
    constructor(){
        super("HowToScene")
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
        this.add.text(game.config.width/2, game.config.height/8, 'HOW TO PLAY:', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*2, 'You are stuck behind a bus', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*3, 'Press Space to accelrate and R to break!', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*4, 'Arrow keys to move left or right!', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*5, 'Dont go off the road or hit the bus', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/8*6 , 'Dont go to far from the bus', menuConfig).setOrigin(0.5)
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