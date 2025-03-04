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
        this.add.rectangle(0,game.config.height/2, game.config.width, game.config.height/2, 0x3f9b0b).setOrigin(0,0)

        

        //game assets


        //player
        this.player = new Player(this, game.config.width/2, game.config.height*5/6, 'player' , 0)
        
        //init road
        let roadCount = 500
        this.roads = []
        for (let i = 0; i < roadCount; i++) {
            let road
            //every other n switch from using the yellow road to the non yellow road
            if (Math.floor(i/25)%2 == 0) {
                road = new RoadPart(this,game.config.width/2,game.config.height/2,'RoadYellow',0)
            }else{
                road = new RoadPart(this,game.config.width/2,game.config.height/2,'Road',0)
            }
            

            road.zValu = i+1

            this.roads.push(road)
        }
        
        //init trees
        let treeCount = 500
        this.trees = []
        for (let i = 0; i < treeCount; i++) {
            let tree
            if (Math.random()>.5) {
                tree = new TreePart(this,game.config.width/2+10000 + Math.random()*50000,game.config.height/2,'tree',0)
            }else{
                tree = new TreePart(this,game.config.width/2-10000 - Math.random()*50000,game.config.height/2,'tree',0)
            }
            

            tree.zValu = Math.random()*500

            this.trees.push(tree)
        }

        //init trees
        let obstacalCount = 25
        this.obstacals = []
        for (let i = 0; i < obstacalCount; i++) {
            let obstacal
            
            obstacal = new ObstaclePart(this,game.config.width/2+5000 - Math.random()*10000,game.config.height/2,'paper',0)
            obstacal.zValu = Math.random()*450+50

            this.obstacals.push(obstacal)
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
        this.middleScore = this.add.text(game.config.width/2, 20, this.p1Score, this.scoreConfig).setOrigin(.5,.5)


        this.gameSpeed = 20
        this.gameAcceleration = .3

        this.gameOver = false
        

        this.startTime = game.getTime()
        this.deltaTime = 0
        
        this.music = this.sound.add('music', {volume: .4 })
        this.music.loop = true;
        if (!this.music.isPlaying) {
            this.music.play();
        }
        
    }

    update(){

        this.deltaTime =  (game.getTime() - this.startTime) /1000
        this.startTime = game.getTime()

        this.gameSpeed = this.gameSpeed + this.gameAcceleration* this.deltaTime

        

        //console.log(this.deltaTime)

        if (keyRESET.isDown) {
            this.deltaTime = 0
            //console.log(this.obstacals[0].zValu)
        }
        

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }



        if (!this.gameOver) {
            this.p1Score += this.gameSpeed * this.deltaTime
            this.middleScore.text = (String(Math.floor(this.p1Score/6))+ "m")

            this.player.update()
            //while game is still running
            for (let i = 0; i < this.roads.length; i++) {
                let road = this.roads[i]
                road.update()
            }

            for (let i = 0; i < this.trees.length; i++) {
                let tree = this.trees[i]
                tree.update()
            }

            for (let i = 0; i < this.obstacals.length; i++) {
                let obstacal = this.obstacals[i]
                obstacal.update()
                if (obstacal.zValu <=24 && obstacal.zValu >=20) {
                    this.checkCollision(this.player, obstacal)
                }
            }
            //console.log(this.obstacals[0])

            //console.log(this.trees[2].x)
        }
        //console.log(game.loop.actualFps)

    }

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


}