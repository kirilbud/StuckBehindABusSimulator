//Inspired by the Dialog coding practice we did in class

class DialogObj extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, sfx, character, dialog){
        super(scene, x, y, texture, 0)
        scene.add.existing(this)

        this.isTalking = true
        this.finished = false

        this.sfx = sfx
        this.character = character

        
        this.NEXT_TEXT = '[SPACE]'
        this.LETTER_TIMER = 10
        
        let box_width = game.config.width  -x*2
        let box_height = game.config.height/5
        this.box = this.scene.add.rectangle(x,y,box_width,box_height,0xffffff).setInteractive({useHandCursor: true,})
        this.box.setOrigin(0).setDepth(600)

        this.pfp = this.scene.add.sprite(x+ box_height/2, y + box_height/2, this.character).setOrigin(.5).setDepth(601).setScale(.3)

        this.TEXT_X = x + 120
        this.TEXT_Y = y + 10

        this.DBOX_FONT = 'dis_font'

        this.TEXT_SIZE = 22

        this.dialogText = scene.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE).setDepth(602).setOrigin(0)
        this.dialogText.setMaxWidth(box_width - 100)
        this.nextText = scene.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE).setDepth(603)

        this.box.on('pointerdown', () =>{
            if (this.isTalking) {
                this.nextPart()
            }
        })

        this.dialog = scene.cache.json.get(dialog)

        this.line = 0
        console.log(this.dialog)
    }

    nextPart(){
        console.log(this.dialog.length)
        if (this.line < this.dialog.length) {
            console.log(this.dialog[this.line]['dialog'])
            this.dialogText.text = this.dialog[this.line]['dialog']
            this.line++
        }
        
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