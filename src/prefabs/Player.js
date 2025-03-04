
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {

        super(scene, x, y, texture, frame)
        scene.add.existing(this)           
        scene.physics.add.existing(this)   

        this.setOrigin(.5,1)

        this.body.setSize(this.width/2, this.height)
        this.body.setCollideWorldBounds(true)
        this.body.setDamping(.5)
        //this.body.setOffset(.5, .5)

        this.setDepth(477)
        
        
        //vars
        this.pushForce = 200

        
        //create animations for player
        this.anims.create({
            key: 'idle',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 11 }),
        })
        this.anims.create({
            key: 'push',
            frameRate: 24,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 23 }),
        })
        this.anims.create({
            key: 'stop',
            frameRate: 24,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 35 }),
        })

        console.log(this.x)

        this.play('idle', true)

        this.rolling = this.scene.sound.add('idle', {volume: .7 })
        this.rolling.loop = true
        this.rolling.play()

        this.pushSound = this.scene.sound.add('push', {volume: .2 })
        this.stopSound = this.scene.sound.add('stop', {volume: .5 })
    }

    update(){
        //this.body.velocity.x

        //console.log(keyLEFT.JustDown)
        if (this.body.velocity.length() == 0 && this.anims.currentAnim.key != 'stop') {
            this.play('idle', true)
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.flipX = false
            this.play('push')
            this.pushSound.play()
            this.body.setVelocityX(this.pushForce)
        }

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)  ) {
            this.flipX = true
            this.play('push')
            this.pushSound.play()
            this.body.setVelocityX(-this.pushForce)
        }

        if (Phaser.Input.Keyboard.JustDown(keySTOP) && this.body.velocity.length()>0) {
            this.stopSound.play()
            this.play('stop').once('animationcomplete', () =>{
                if (this.body.velocity.length() == 0) {
                    this.play('idle')
                }
            })
            this.body.setVelocityX(0)
        }
    }
}