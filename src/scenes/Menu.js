class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        //all the loading stuff goes here
        this.load.image('Road', './Assets/Road.png')
        this.load.image('RoadYellow', './Assets/RoadYellow.png')
        this.load.image('tree', './Assets/Tree.png')

        //obsticals
        this.load.image('waterCooler', './Assets/WaterCooler.png')
        this.load.image('paper', './Assets/Paper.png')
        this.load.image('trash', './Assets/Trash.png')


        //player
        this.load.spritesheet('player', './Assets/FullSpritesheet.png',{
            frameWidth: 126,
            frameHeight: 100,
        })

        //audio
        this.load.audio('idle', './Assets/idle.wav')
        this.load.audio('push', './Assets/push.wav')
        this.load.audio('stop', './Assets/stop_01.wav')
        this.load.audio('select', './Assets/select.wav')
        this.load.audio('hit', './Assets/hit.wav')


        //music
        this.load.audio('music', './Assets/RollinDownhill.wav') //not my best work but i tried :(

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

            this.sound.play('select')
            this.scene.start('playScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start('creditsScene')
            this.sound.play('select')
        }
    }
}