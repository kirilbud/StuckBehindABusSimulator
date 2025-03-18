//Inspired by the Dialog coding practice we did in class

class DialogObj extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, sfx, character, dialog){
        super(scene, x, y, texture, 0)
        scene.add.existing(this)
        this.alpha = 0
        this.isTalking = false
        this.disabled = false

        this.sfx = sfx
        this.character = character

        
        this.NEXT_TEXT = '[SPACE]'
        this.LETTER_TIMER = 60
        
        let box_width = game.config.width  -x*2
        let box_height = game.config.height/5
        this.box = this.scene.add.rectangle(x,y,box_width,box_height,0xffffff).setInteractive({useHandCursor: true,})
        this.box.setOrigin(0).setDepth(600)

        this.pfp = this.scene.add.sprite(x+ box_height/2, y + box_height/2, this.character).setOrigin(.5).setDepth(601).setScale(.3)

        this.TEXT_X = x + 120
        this.TEXT_Y = y + 10

        this.NEXT_X = x + box_width
        this.NEXT_Y = y + box_height

        this.DBOX_FONT = 'dis_font'

        this.TEXT_SIZE = 22

        this.dialogText = scene.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE).setDepth(602).setOrigin(0)
        this.dialogText.setMaxWidth(box_width - 140)
        this.nextText = scene.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '[Click to continue]', this.TEXT_SIZE).setDepth(603).setOrigin(1,2)

        this.box.on('pointerdown', () =>{
            if (!this.isTalking) {
                this.nextPart()
            }
        })

        this.dialog = scene.cache.json.get(dialog)

        this.line = 0
        console.log(this.dialog)



        console.log(sfx[0])
        this.Sound1 = scene.sound.add(sfx[0])
        this.Sound1.volume = 0.5
        this.Sound2 = scene.sound.add(sfx[1])
        this.Sound2.volume = 0.5
        this.Sound3 = scene.sound.add(sfx[2])
        this.Sound3.volume = 0.5
        this.nextPart()

        this.exists = true

        

    }

    nextPart(){
        console.log(this.dialog.length)
        if (this.line < this.dialog.length) {
            console.log(this.dialog[this.line]['dialog'])
            //this.dialogText.text = this.dialog[this.line]['dialog']
            this.typeText(this.dialog[this.line]['dialog'])
            this.line++
        }else{
            this.removeTime()
        }
        
    }

    typeText(text){
        console.log(text)
        this.dialogText.text = ''
        this.nextText.text = ''

        this.isTalking = true
        let currentText = ''

        let currentChar = 0
        this.timer = this.scene.time.addEvent({
            delay: this.LETTER_TIMER,
            callback: ()=> {
                if (this.disabled) {
                    return
                }
                this.pfp.play(this.character + "Talking",true)
                this.isTalking = true
                this.playSound()
                this.dialogText.text +=  text[currentChar]
                //console.log(text[currentChar])
                currentChar++
                if (this.timer.getRepeatCount() == 0) {
                    this.isTalking = false
                    this.nextText.text = '[Click to continue]'
                    this.pfp.play(this.character,true)
                }
            },
            //args: [],
            callbackScope: this,
            repeat: text.length -1
        });
    }

    playSound(){
        let rand = Math.random()
        if (rand < 1/3) {
            this.Sound1.play()
            
        }else if (rand < 2/3) {
            this.Sound2.play()
        }else{
            this.Sound3.play()
        }
    }

    
    setDialog(dialog){
        this.dialog = this.cache.json.get(dialog)
    }

    removeTime(){
        console.log("remove time")
        this.box.destroy()
        this.pfp.destroy()
        this.dialogText.destroy()
        this.nextText.destroy()
        this.Sound1.destroy()
        this.Sound2.destroy()
        this.Sound3.destroy()
        this.exists = false
        //this.timer
        this.destroy()

    }

    hide(){
        
        this.box.alpha = 0
        this.pfp.alpha = 0
        this.dialogText.alpha = 0
        this.nextText.alpha = 0
        this.Sound1.stop()
        this.Sound2.stop()
        this.Sound3.stop()
        this.exists = false
        //this.timer


    }

    update(){

    }
}