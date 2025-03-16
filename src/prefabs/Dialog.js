//Inspired by the Dialog coding practice we did in class

class DialogObj extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, sfx, character){
        super(scene, x, y, texture, 0)
        scene.add.existing(this)

        this.isTalking = false
        this.finished = false

        this.sfx = sfx
        this.character = character

        
        this.NEXT_TEXT = '[SPACE]'
        
        let box_width = game.config.width  -x*2
        let box_height = game.config.height/5
        this.box = this.scene.add.rectangle(x,y,box_width,box_height,0xffffff).setInteractive({useHandCursor: true,})
        this.box.setOrigin(0).setDepth(600)

        this.pfp = this.scene.add.sprite(x+ box_height/2, y + box_height/2, texture).setOrigin(.5).setDepth(601)

        this.TEXT_X = x+ 30
        this.TEXT_Y = y + 30

        this.DBOX_FONT = 'dis_font'

        this.TEXT_SIZE = 22

        this.dialogText = scene.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE).setDepth(602)
        this.nextText = scene.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE).setDepth(603)

        this.box.on('pointerdown', () =>{
            if (this.isTalking) {
                this.nextPart()
            }
        })
        
    }

    nextPart(){
        console.log(this.dialog)
    }

    typeText(){

        this.dialogText.text = ''
        this.nextText.text = ''

        this.isTalking = true
    }

    
    setDialog(dialog){
        this.dialog = this.cache.json.get(dialog)
    }

    update(){

    }
}