//heavily inspired by this
//https://math.stackexchange.com/questions/2337183/one-point-perspective-formula

class bus extends ThirdDimObj{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        //console.log(texture)

        scene.add.existing(this)

        this.newscale = Math.random()*17 + 17
        
        //this.globalXOffset = 0

        this.setOrigin(.5,1)
    }

    reset(){
        console.log("this be printing")
        this.zValu = 500 + this.zValu
        this.alpha = 0
        this.clock = this.scene.time.delayedCall(900*Math.random(), () => {
            this.alpha = 1
            this.zValu = 500
            if (Math.random() > .5) {
                this.xValu = game.config.width/2+18000 + Math.random()*50000
            }else{
                this.xValu = game.config.width/2-18000 - Math.random()*50000
            }
            this.newscale = Math.random()*17 + 17
        }, null, this) 
    }
}