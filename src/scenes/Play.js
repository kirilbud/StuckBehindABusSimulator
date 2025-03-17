class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    create(){

        let bounds_offset = 150
        this.physics.world.setBounds( bounds_offset , 0, game.config.width - bounds_offset*2, game.config.height)

        //background
        
        //grass
        this.add.rectangle(0,game.config.height/2 -50, game.config.width, game.config.height/2+50, 0x699034).setOrigin(0,0)

        

        //game assets
        this.add.sprite(0, 0, 'car').setDepth(501).setOrigin(0)

        this.clickingOnWheel = false
        this.initX = 0
        this.initY = 0

        this.wheel = this.add.sprite(350, 440, 'wheel').setDepth(501).setOrigin(.5).setInteractive({useHandCursor: true,}).setScale(1)
        this.wheel.on('pointerdown', (pointer) =>{
            this.clickingOnWheel = true
            this.initX = pointer.downX
            this.initY = pointer.downY
            //console.log(pointer)
        })

        this.input.on('pointerup', ()=>{
            this.clickingOnWheel = false
            this.wheel.rotation = 0
        })
        

        this.bus = new Bus(this,game.config.width/2,game.config.height/2,'bus',0)
        this.bus.zValu = 100

        //player
        //this.player = new Player(this, game.config.width/2, game.config.height*5/6, 'player' , 0)
        
        //init road
        let roadCount = 500
        this.roads = []
        for (let i = 0; i < roadCount; i++) {
            let road
            //every other n switch from using the yellow road to the non yellow road
            if (Math.floor(i/25)%2 == 0) {
                road = new ThirdDimObj(this,game.config.width/2,game.config.height/2,'RoadYellow',0)
            }else{
                road = new ThirdDimObj(this,game.config.width/2,game.config.height/2,'Road',0)
            }
            road.xValu = 0
            road.zValu = i+1

            this.roads.push(road)
        }
        
        //init trees
        
        let treeCount = 500
        this.trees = []
        for (let i = 0; i < treeCount; i++) {
            let tree
            if (Math.random()>.5) {
                tree = new Tree(this,game.config.width/2+18000 + Math.random()*50000,game.config.height/2,'tree',0)
            }else{
                tree = new Tree(this,game.config.width/2-18000 - Math.random()*50000,game.config.height/2,'tree',0)
            }
            

            tree.zValu = Math.random()*500

            this.trees.push(tree)
        }
        

        //inputs
        keySTOP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //score stuff
        this.p1Score = 0
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FACADE',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth:100
        }
        //this.middleScore = this.add.text(game.config.width/2, 20, this.p1Score, this.scoreConfig).setOrigin(.5,.5)


        this.gameSpeed = 50
        this.gameAcceleration = .0

        this.gameOver = false
        

        this.startTime = game.getTime()
        this.deltaTime = 0

        this.globalXOffset = 0

        this.turnSpeed = 8000
        
        /*
        this.music = this.sound.add('music', {volume: .4 })
        this.music.loop = true;
        if (!this.music.isPlaying) {
            this.music.play();
        }
        */

        this.driving = this.sound.add('driving', {volume: 3 })
        this.driving.loop = true;
        
        if (!this.driving.isPlaying) {
            this.driving.play();
        }

        this.busSound = this.sound.add('bus')
        this.busSound.loop = true;
        if (!this.busSound.isPlaying) {
            this.busSound.play();
        }

        this.introSequence = 0
        this.peterDiolog = new DialogObj(this, 20, 20 , "sans", ["PeterLaph1","PeterLaph2","PeterLaph3"], "peter", "intro1")
        

        this.drift = -1000 + Math.random()*2000
        this.drifttimer = this.time.addEvent({
            delay:  400*Math.random(),
            callback: ()=> {
                this.drifttimer.delay =  40000*Math.random()
                this.drift = -1000 + Math.random()*2000
                console.log("yeah")
            },
            //args: [],
            callbackScope: this,
            loop: true
        });
    }

    update(){
        //intro sequence
        if(!this.peterDiolog.exists && this.introSequence == 0){
            this.peterDiolog = new DialogObj(this, 20, 20 , "sans", ["HummerTalk1","HummerTalk2","HummerTalk3"], "hummer", "intro2")
            this.introSequence++
        }else if (!this.peterDiolog.exists && this.introSequence == 1) {
            this.peterDiolog = new DialogObj(this, 20, 20 , "sans", ["PeterLaph1","PeterLaph2","PeterLaph3"], "peter", "intro3")
            this.introSequence++
        }

        if (this.clickingOnWheel) {
            let v1_x = this.wheel.x - this.initX
            let v1_y = this.wheel.y - this.initY

            let v1 = new Phaser.Math.Vector2(v1_x, v1_y)
            v1.normalize()
            //console.log(this.wheel.y - this.initY)

            let v2_x = this.wheel.x - this.game.input.mousePointer.x
            let v2_y = this.wheel.y - this.game.input.mousePointer.y

            let v2 = new Phaser.Math.Vector2(v2_x, v2_y)
            v2.normalize()
            //console.log(this.wheel.y - this.game.input.mousePointer.y)

            let dot = v2.dot(v1)
            let rot = Math.atan2(v2.y , v2.x ) - Math.atan2(v1.y , v1.x )
            //console.log(rot)
            
            this.wheel.rotation = rot
            
            let angle = v1
            //console.log(Math.atan2(v2.y , v2.x ) - Math.atan2(v1.y , v1.x ))
        }
        

        this.deltaTime =  (game.getTime() - this.startTime) /1000
        this.startTime = game.getTime()

        this.gameSpeed = this.gameSpeed + this.gameAcceleration* this.deltaTime

        

        //console.log(this.deltaTime)

        if (!document.hasFocus()) { // remember to remove this
            this.deltaTime = 0
            //console.log(this.obstacals[0].zValu)
        }

        /*
        if (keyLEFT.isDown) {
            this.globalXOffset += this.turnSpeed*this.deltaTime
            //console.log(this.obstacals[0].zValu)
        }
        if (keyRIGHT.isDown) {
            this.globalXOffset -= this.turnSpeed*this.deltaTime
            //console.log(this.obstacals[0].zValu)
        }
        */

        this.globalXOffset = this.globalXOffset - this.wheel.rotation*this.deltaTime *6000 - this.drift *this.deltaTime

        if (keySTOP.isDown) {
            this.gameAcceleration = 10
            //console.log(this.obstacals[0].zValu)
        }else{
            if (this.gameSpeed < 10) {
                this.gameSpeed = 10
                this.gameAcceleration = 0
            }else{
                this.gameAcceleration = -5
            }
            
        }

        if (keyRESET.isDown) {
            this.gameAcceleration = -20
        }
        

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }



        if (!this.gameOver) {
            this.p1Score += this.gameSpeed * this.deltaTime


            //this.player.update()
            //while game is still running
            for (let i = 0; i < this.roads.length; i++) {
                let road = this.roads[i]
                road.update()
            }

            
            for (let i = 0; i < this.trees.length; i++) {
                let tree = this.trees[i]
                tree.update()
            }
            
            this.bus.update()   
            //console.log(this.obstacals[0])
            this.driving.rate = this.gameSpeed/50
            if (700/(this.bus.zValu* this.bus.zValu) > 4) {
                this.busSound.volume = 4
            }else{
                this.busSound.volume = 700/(this.bus.zValu * this.bus.zValu)
            }
            


        }


        if (this.bus.zValu < 13 ) { // hit the bus
            //this.sound.play('hit')
            this.endGame()
        }

        if (this.bus.zValu > 350) { // hit by hummer guy
            this.endGame()
        }

        //whent off the side of the road
        if (this.globalXOffset < -13000) {
            this.endGame()
        }
        if (this.globalXOffset > 15000) {
            this.endGame()
        }
    }

    endGame(){
        console.log('crash')
        this.busSound.stop()
        this.driving.stop()


        this.gameOver = true


        this.add.text(game.config.width/2, game.config.height/4, 'oh no!', this.scoreConfig).setOrigin(0.5).setDepth(1000)
        this.add.text(game.config.width/2, game.config.height/4*2, 'Well at least you made it ' + (String(Math.floor(this.p1Score/6))+ "m"), this.scoreConfig).setOrigin(0.5).setDepth(1000)
        this.add.text(game.config.width/2, game.config.height/4*3, 'R to Restart or ← for menu', this.scoreConfig).setOrigin(0.5).setDepth(1000)
    }


}