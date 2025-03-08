//heavily inspired by this
//https://math.stackexchange.com/questions/2337183/one-point-perspective-formula

class Bus extends ThirdDimObj{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        //console.log(texture)

        scene.add.existing(this)

        this.newscale = 20
        
        //this.globalXOffset = 0

        this.setOrigin(.5,1.05)

        this.speed = 45
        this.turnspeed = 200
        this.turnAccel = 2000

        this.followDist = 450
    }

    update(){
        this.setDepth(500 - this.zValu)
        this.scale = 1/this.zValu*this.newscale 
        this.y = (1/this.zValu)*5000 + (game.config.height/2) -8 - 50
        this.x = (this.xValu + this.scene.globalXOffset)*(1/this.zValu)*1 + game.config.width/2 
        //console.log(this.zValu)

        this.zValu -= this.scene.gameSpeed * this.scene.deltaTime

        this.zValu += this.speed * this.scene.deltaTime

        if (this.zValu <= 0) {//re gen obj
            this.reset()
        }

        if (this.xValu + this.followDist< -this.scene.globalXOffset) {//re gen obj
            this.xValu += this.turnspeed * this.scene.deltaTime
            this.turnspeed +=  this.turnAccel * this.scene.deltaTime
        }else if (this.xValu - this.followDist > -this.scene.globalXOffset) {
            this.xValu -= this.turnspeed * this.scene.deltaTime
            this.turnspeed +=  this.turnAccel * this.scene.deltaTime
        }else{
            this.turnspeed = 2000
        }
    }

    reset(){
        console.log("somethings wrong")
    }
}