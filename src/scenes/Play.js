class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    create(){

        let bounds_offset = 150
        this.physics.world.setBounds( bounds_offset , 0, game.config.width - bounds_offset*2, game.config.height)

        //this.add.text(20, 20, "Rocket Patrol Menu")

        //background
        
        //grass
        this.add.rectangle(0,game.config.height/2 -50, game.config.width, game.config.height/2+50, 0x699034).setOrigin(0,0)

        

        //game assets
        this.add.sprite(0, 0, 'car').setDepth(501).setOrigin(0)

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

        this.driving = this.sound.add('driving', {volume: .7 })
        this.driving.loop = true;
        if (!this.driving.isPlaying) {
            this.driving.play();
        }

        this.busSound = this.sound.add('bus')
        this.busSound.loop = true;
        if (!this.busSound.isPlaying) {
            this.busSound.play();
        }
    }

    update(){

        this.deltaTime =  (game.getTime() - this.startTime) /1000
        this.startTime = game.getTime()

        this.gameSpeed = this.gameSpeed + this.gameAcceleration* this.deltaTime

        

        //console.log(this.deltaTime)

        if (!document.hasFocus()) { // remember to remove this
            this.deltaTime = 0
            //console.log(this.obstacals[0].zValu)
        }

        if (keyLEFT.isDown) {
            this.globalXOffset += this.turnSpeed*this.deltaTime
            //console.log(this.obstacals[0].zValu)
        }
        if (keyRIGHT.isDown) {
            this.globalXOffset -= this.turnSpeed*this.deltaTime
            //console.log(this.obstacals[0].zValu)
        }

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
            if (400/(this.bus.zValu* this.bus.zValu) > 1.5) {
                this.busSound.volume = 1.5
            }else{
                this.busSound.volume = 400/(this.bus.zValu * this.bus.zValu)
            }
            


            //console.log(this.trees[2].x)
        }
        //console.log(game.loop.actualFps)
        console.log(this.globalXOffset)
        if (this.bus.zValu < 13 || this.bus.zValu > 200) {
            //this.sound.play('hit')
            this.endGame()
        }

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
    /*
    checkCollision(player, object){
        //console.log(player.x-object.x)
        let dist = player.x-object.x
        dist = Math.abs(dist)
        if (dist < object.width) {
            this.sound.play('hit')
            //console.log('crash')
            this.music.stop()
            this.gameOver = true
            this.player.anims.stop()
            this.player.rolling.stop()


            this.add.text(game.config.width/2, game.config.height/4, 'oh no!', this.scoreConfig).setOrigin(0.5).setDepth(1000)
            this.add.text(game.config.width/2, game.config.height/4*2, 'Well at least you made it ' + (String(Math.floor(this.p1Score/6))+ "m"), this.scoreConfig).setOrigin(0.5).setDepth(1000)
            this.add.text(game.config.width/2, game.config.height/4*3, 'R to Restart or ← for menu', this.scoreConfig).setOrigin(0.5).setDepth(1000)
        }
        
    }
    */

}