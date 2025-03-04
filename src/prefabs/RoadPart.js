//heavily inspired by this
//https://math.stackexchange.com/questions/2337183/one-point-perspective-formula

class RoadPart extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        //this.sfxShot = scene.sound.add('sfx-shot',{volume: 0.3})
        this.zValu = 0

        //this.currentScene = scene

        this.setOrigin(.5,0)
        
    }

    update(){
        this.setDepth(500 - this.zValu)
        this.scale = 1/this.zValu*200
        this.y = (1/this.zValu)*5000 + (game.config.height/2) -10
        //console.log(this.scene.gameSpeed)

        this.zValu -= this.scene.gameSpeed * this.scene.deltaTime
        if (this.zValu <= 0) {
            this.zValu = 500
        }
    }
}