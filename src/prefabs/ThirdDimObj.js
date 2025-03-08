//heavily inspired by this
//https://math.stackexchange.com/questions/2337183/one-point-perspective-formula

class ThirdDimObj extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        //console.log(texture)

        scene.add.existing(this)
        
        this.zValu = 0
        this.xValu = x
        this.newscale = 400
        
        //this.globalXOffset = 0

        this.setOrigin(.5,1)
    }

    update(){
        this.setDepth(500 - this.zValu)
        this.scale = 1/this.zValu*this.newscale 
        this.y = (1/this.zValu)*5000 + (game.config.height/2) -8 - 50
        this.x = (this.xValu + this.scene.globalXOffset)*(1/this.zValu)*1 + game.config.width/2 
        //console.log(this.zValu)

        this.zValu -= this.scene.gameSpeed * this.scene.deltaTime

        

        if (this.zValu <= 0) {//re gen obj
            this.reset()
        }
    }

    reset(){
        this.zValu = 500 + this.zValu 
    }
}