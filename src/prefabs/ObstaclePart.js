//heavily inspired by this
//https://math.stackexchange.com/questions/2337183/one-point-perspective-formula

class ObstaclePart extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        //super(scene, x, y, texture, frame)
        
        let random = Math.random()
        
        if (random < .3) {
            
            super(scene, x, y, "waterCooler", frame)
        }else if(random<.6){
            super(scene, x, y, 'trash', frame)
        }else{
            super(scene, x, y, 'paper', frame)
        }
        

        //this.setOrigin(.5,1)

        scene.add.existing(this)
        
        this.zValu = 0
        this.xValu = x
        

        this.setOrigin(.5,1)
    }

    update(){
        this.setDepth(500 - this.zValu)
        this.scale = 1/this.zValu*30 
        this.y = (1/this.zValu)*5000 + (game.config.height/2) -10
        this.x = this.xValu*(1/this.zValu)*1 + game.config.width/2
        //console.log(this.zValu)

        this.zValu -= this.scene.gameSpeed * this.scene.deltaTime
        if (this.zValu <= 0) {
            this.alpha = 0
            this.clock = this.scene.time.delayedCall(900*Math.random(), () => {
                this.alpha = 1
                this.zValu = 500
                this.xValu = game.config.width/2+5000 - Math.random()*10000
            }, null, this)
        }
    }
}