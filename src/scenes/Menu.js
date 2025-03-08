class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        //for this menue
        this.load.image('play', './Assets/play.png')
        this.load.image('credits', './Assets/credits.png')
        this.load.image('how', './Assets/howTo.png')


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
        this.load.audio('driving', './Assets/sounds/driving.wav') 
        this.load.audio('bus', './Assets/sounds/bus.wav')

        //music
        //this.load.audio('music', './Assets/RollinDownhill.wav') 

    }

    create(){
        this.add.rectangle(0,0,game.config.width, game.config.height, 0xDC5300).setOrigin(0)

        this.how = this.add.sprite(80, 80, 'how').setOrigin(0).setScale(1.2).setInteractive({
            useHandCursor: true,
        })

        this.how.on('pointerdown', () =>{this.scene.start('HowToScene')})

        this.play = this.add.sprite(500, 80, 'play').setOrigin(0).setScale(.9).setInteractive({
            useHandCursor: true,
        })

        this.play.on('pointerdown', () =>{this.scene.start('playScene')})

        this.credits = this.add.sprite(500, 275+50, 'credits').setOrigin(0).setScale(.85).setInteractive({
            useHandCursor: true,
        })

        this.credits.on('pointerdown', () =>{this.scene.start('creditsScene')})
        

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
        this.add.text(game.config.width/2, 40, 'Virtual Stuck Behind A Bus', menuConfig).setOrigin(0.5)

        //keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySTOP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    }

    update(){
        
    }
}