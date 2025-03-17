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

        

    }

    update(){
        if(!this.peterDiolog.exists){
            this.scene.start('menuScene')
        }
    }
}