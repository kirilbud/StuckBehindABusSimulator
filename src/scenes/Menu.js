class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        //all the loading stuff goes here
        this.load.image('Road', './Assets/Road.png')
        this.load.image('RoadYellow', './Assets/RoadYellow.png')
        //this.load.image('tree', './Assets/Tree.png')

        //obsticals
        this.load.image('tree', './Assets/trees.png')
        this.load.image('bus', './Assets/bus.png')


        //player
        this.load.image('car', './Assets/car.png')

        //audio

        //music
        //this.load.audio('music', './Assets/RollinDownhill.wav') 

    }

    create(){

        
        

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#843605',
            alighn: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth:0
        }

        //menu text
        menuConfig.color = '#000000'
        this.add.text(game.config.width/2, game.config.height/3, 'Cubicle Collateral', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 , 'Use ← → arrows to move & space to stop', menuConfig).setOrigin(0.5)
        //menuConfig.backgroundColor = '#00ff00'
        menuConfig.color = '#000000'
        this.add.text(game.config.width/2, game.config.height/3*2, 'Press Space to play or → for credits', menuConfig).setOrigin(0.5)

        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySTOP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySTOP)){
            //easy

            //this.sound.play('select')
            this.scene.start('playScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start('creditsScene')
            //this.sound.play('select')
        }
    }
}