class HowTo extends Phaser.Scene {
    constructor(){
        super("HowToScene")
    }

    preload(){

    }

    create(){

        this.add.rectangle(0,0,game.config.width, game.config.height, 0xDC5300).setOrigin(0)
        this.peterDiolog = new DialogObj(this, 20, 20 , "sans", ["PeterLaph1","PeterLaph2","PeterLaph3"], "peter", "how")
        

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

        this.hummer = this.add.sprite(game.config.width/2, game.config.height*2, 'hummer').setOrigin(.5).setScale(.6)
        this.wheel = this.add.sprite(game.config.width/2, game.config.height*2, 'wheel').setOrigin(.5).setScale(.6)
        this.bus = this.add.sprite(game.config.width/2, game.config.height*2, 'bus').setOrigin(.5).setScale(.6)
        this.logo = this.add.sprite(game.config.width/2, game.config.height*2, 'logo').setOrigin(.5).setScale(.6)

        this.logoTweenUp = this.tweens.add({
            targets: this.logo,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height/2,
            repeat: 0,
            paused: true,
        })
        this.logoTweenDown = this.tweens.add({
            targets: this.logo,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height*2,
            repeat: 0,
            paused: true,
        })


        this.hummerTweenUp = this.tweens.add({
            targets: this.hummer,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height/2,
            repeat: 0,
            paused: true,
        })
        this.hummerTweenDown = this.tweens.add({
            targets: this.hummer,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height*2,
            repeat: 0,
            paused: true,
        })


        this.wheelTweenUp = this.tweens.add({
            targets: this.wheel,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height/2,
            repeat: 0,
            paused: true,
        })
        this.wheelTweenDown = this.tweens.add({
            targets: this.wheel,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height*2,
            repeat: 0,
            paused: true,
        })


        this.busTweenUp = this.tweens.add({
            targets: this.bus,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height/2,
            repeat: 0,
            paused: true,
        })
        this.busTweenDown = this.tweens.add({
            targets: this.bus,
            ease: 'Sine.easeInOut',
            duration: 200,
            y: game.config.height*2,
            repeat: 0,
            paused: true,
        })

    }

    update(){
        if(!this.peterDiolog.exists){
            this.scene.start('menuScene')
        }
        

        if (this.peterDiolog.line == 1) {
            this.logoTweenUp.resume()
        }else{
            this.logoTweenDown.resume()
        }

        if (this.peterDiolog.line == 3) {
            this.busTweenUp.resume()
        }else if (this.peterDiolog.line > 3) {
            this.busTweenDown.resume()
        }

        if (this.peterDiolog.line == 4 || this.peterDiolog.line == 5) {
            this.wheelTweenUp.resume()
        }else if (this.peterDiolog.line > 5){
            this.wheelTweenDown.resume()
        }

        if (this.peterDiolog.line == 7) {
            this.hummerTweenUp.resume()
        }else if (this.peterDiolog.line > 7){
            this.hummerTweenDown.resume()
        }
    }
}