let gameConfig;
let game;

let score = 0;
let highScore = 0;

// ------------------------------------------------------------------------- //
// Front End Menu

class Main extends Phaser.Scene
{
    constructor()
    {
        super({key: "main"});
    }


    preload()
    {
        this.load.image("menuRoad", "Assets/Sprites/Menu/MenuRoad.png")

        this.load.spritesheet("title", "Assets/Sprites/Menu/GameTitle.png", {frameWidth: 330, frameHeight: 130})

        this.load.spritesheet("play", "Assets/Sprites/Menu/PlayButton.png", {frameWidth: 160, frameHeight: 50})
        this.load.spritesheet("help", "Assets/Sprites/Menu/HelpButton.png", {frameWidth: 160, frameHeight: 50})
        this.load.spritesheet("exit", "Assets/Sprites/Menu/ExitButton.png", {frameWidth: 160, frameHeight: 50})

        this.load.audio("buttonSelect", "Assets/Audio/buttonSelect.wav")
    }


    create()
    {
        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "menuRoad")


        // Title
        let title = this.add.sprite(240, 110, "title")
        title.play("titleAnim")


        this.buttonSelect = this.sound.add("buttonSelect")

        // Play Button ----------------------------------------------------------
        let playButton = this.add.sprite(240, 280, "play")

        playButton.setInteractive()

        playButton.on("pointerdown", () => {this.scene.start("gameplay"), this.buttonSelect.play()})
        playButton.on("pointerover", () => {playButton.play("playButtonOn")})
        playButton.on("pointerout", () => {playButton.play("playButtonOff")})


        // Help Button ----------------------------------------------------------
        let helpButton = this.add.sprite(240, 340, "help")

        helpButton.setInteractive()

        helpButton.on("pointerdown", () => {this.scene.start("howToPlay"), this.buttonSelect.play()})
        helpButton.on("pointerover", () => {helpButton.play("helpButtonOn")})
        helpButton.on("pointerout", () => {helpButton.play("helpButtonOff")})


        // Exit Button ----------------------------------------------------------
        let exitButton = this.add.sprite(240, 400, "exit")

        exitButton.setInteractive()

        exitButton.on("pointerdown", () => {window.close(), this.buttonSelect.play()})
        exitButton.on("pointerover", () => {exitButton.play("exitButtonOn")})
        exitButton.on("pointerout", () => {exitButton.play("exitButtonOff")})


        // Text
        if (highScore > 0)
        {
            this.highScoreText = this.add.text(240, 210, "High Score: " + highScore,
                {
                    fontFamily: "Tiny5-Regular",
                    fontSize: "40px",
                    color: "#FF2323"
                }
            )
            this.highScoreText.setOrigin(0.5)
        }
    }

    
    update()
    {
        this.road.update(false)
    }

    setUpAnimations()
    {
        // Title text anim
        this.anims.create(
        {
            key: "titleAnim",
            frames: this.anims.generateFrameNumbers("title", {start: 0, end: 3}),
            frameRate: 2,
            repeat: -1
        })


        // Play button anim
        this.anims.create(
        {
            key: "playButtonOn",
            frames: this.anims.generateFrameNumbers("play", {start: 1, end: 1}),
            frameRate: 8,
            repeat: 0
        })

        this.anims.create(
        {
            key: "playButtonOff",
            frames: this.anims.generateFrameNumbers("play", {start: 0, end: 0}),
            frameRate: 8,
            repeat: 0
        })


        // Help button anim
        this.anims.create(
        {
            key: "helpButtonOn",
            frames: this.anims.generateFrameNumbers("help", {start: 1, end: 1}),
            frameRate: 8,
            repeat: 0
        })

        this.anims.create(
        {
            key: "helpButtonOff",
            frames: this.anims.generateFrameNumbers("help", {start: 0, end: 0}),
            frameRate: 8,
            repeat: 0
        })
        

        // Exit button anim
        this.anims.create(
        {
            key: "exitButtonOn",
            frames: this.anims.generateFrameNumbers("exit", {start: 1, end: 1}),
            frameRate: 8,
            repeat: 0
        })

        this.anims.create(
        {
            key: "exitButtonOff",
            frames: this.anims.generateFrameNumbers("exit", {start: 0, end: 0}),
            frameRate: 8,
            repeat: 0
        })
    }
}


// ------------------------------------------------------------------------- //
// Guide Menu
class HowToPlay extends Phaser.Scene
{
    constructor()
    {
        super({key: "howToPlay"});
    }


    preload()
    {
        this.load.spritesheet("back", "Assets/Sprites/Menu/BackButton.png", {frameWidth: 160, frameHeight: 50})

        this.load.spritesheet("arrowKeys", "Assets/Sprites/Menu/ArrowKeys.png", {frameWidth: 120, frameHeight: 55})
        this.load.spritesheet("spaceBar", "Assets/Sprites/Menu/SpaceBar.png", {frameWidth: 120, frameHeight: 55})
    }


    create()
    {
        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "menuRoad")


        // Title
        let title = this.add.sprite(240, 110, "title")
        title.play("titleAnim")


        // Menu Symbols --------------------------------------------------
        // Arrow keys symbol
        let arrowKeys = this.add.sprite(180, 240, "arrowKeys")
        arrowKeys.play("arrowKeysAnim")

        // Arrow keys text
        this.arrowKeyText = this.add.text(310, 240, ": Steer",
            {
                fontFamily: "Tiny5-Regular",
                fontSize: "40px",
                color: "#FF2323"
            }
        )
        this.arrowKeyText.setOrigin(0.5)

        // Space bar symbol
        let spaceBar = this.add.sprite(180, 320, "spaceBar")
        spaceBar.play("spaceBarAnim")

        // Space bar text
        this.spaceBarText = this.add.text(310, 320, ": Shoot",
            {
                fontFamily: "Tiny5-Regular",
                fontSize: "40px",
                color: "#FF2323"
            }
        )
        this.spaceBarText.setOrigin(0.5)


        // Sounds
        this.buttonSelect = this.sound.add("buttonSelect")

        // Back Button ----------------------------------------------------------
        let backButton = this.add.sprite(240, 400, "back")

        backButton.setInteractive()

        backButton.on("pointerdown", () => {this.scene.start("main"), this.buttonSelect.play()})
        backButton.on("pointerover", () => {backButton.play("backButtonOn")})
        backButton.on("pointerout", () => {backButton.play("backButtonOff")})
    }

    update()
    {
        this.road.update(false)
    }

    setUpAnimations()
    {
        // Arrow keys anim
        this.anims.create(
        {
            key: "arrowKeysAnim",
            frames: this.anims.generateFrameNumbers("arrowKeys", {start: 0, end: 1}),
            frameRate: 2,
            repeat: -1
        })

        // Space bar anim
        this.anims.create(
        {
            key: "spaceBarAnim",
            frames: this.anims.generateFrameNumbers("spaceBar", {start: 0, end: 1}),
            frameRate: 1,
            repeat: -1
        })


        // Back button anim
        this.anims.create(
        {
            key: "backButtonOn",
            frames: this.anims.generateFrameNumbers("back", {start: 1, end: 1}),
            frameRate: 8,
            repeat: 0
        })

        this.anims.create(
        {
            key: "backButtonOff",
            frames: this.anims.generateFrameNumbers("back", {start: 0, end: 0}),
            frameRate: 8,
            repeat: 0
        })
    }
}


// ------------------------------------------------------------------------- //
// Gameplay Screen
class Gameplay extends Phaser.Scene
{
    constructor()
    {
        super({key: "gameplay"});
    }


    preload()
    {
        // Background
        this.load.image("road", "Assets/Sprites/Gameplay/Road.png")


        // Objects
        this.load.spritesheet("playerVan", "Assets/Sprites/Gameplay/PlayerVan.png", {frameWidth: 60, frameHeight: 100})
        this.load.image("projectile", "Assets/Sprites/Gameplay/PlayerProjectile.png")

        this.load.spritesheet("enemyVan", "Assets/Sprites/Gameplay/EnemyVan.png", {frameWidth: 60, frameHeight: 100})
        this.load.image("obstacle", "Assets/Sprites/Gameplay/EnemyObstacle.png")

        this.load.spritesheet("car", "Assets/Sprites/Gameplay/Car.png", {frameWidth: 45, frameHeight: 90})
        this.load.spritesheet("bike", "Assets/Sprites/Gameplay/Bike.png", {frameWidth: 35, frameHeight: 90})

        this.load.spritesheet("explosion", "Assets/Sprites/Gameplay/Explosion.png", {frameWidth: 80, frameHeight: 80})


        // UI
        this.load.image("life", "Assets/Sprites/Gameplay/Life.png")
        this.load.image("lifeContainer", "Assets/Sprites/Gameplay/LifeContainer.png")


        // Sounds
        this.load.audio("pizzaFling", "Assets/Audio/pizzaFling.wav")
        this.load.audio("boneDrop", "Assets/Audio/boneDrop.wav")
        this.load.audio("vehicleHit", "Assets/Audio/vehicleHit.wav")
        this.load.audio("vehicleExplode", "Assets/Audio/vehicleExplode.wav")
    }


    create()
    {
        // Resets score
        score = 0

        // Animation set-up
        this.setUpAnimations()

        // Sets up keyboard
        this.cursors = this.input.keyboard.createCursorKeys()

        // Sound effects
        this.pizzaFling = this.sound.add("pizzaFling")
        this.boneDrop = this.sound.add("boneDrop")
        this.vehicleHit = this.sound.add("vehicleHit")
        this.vehicleExplode = this.sound.add("vehicleExplode")


        // Scrolling road background
        this.road = new Road(this, gameConfig.width / 2, 0, "road")

        // Road boundaries
        this.roadEdges = this.physics.add.staticGroup()

        let leftEdge = this.add.rectangle(60, gameConfig.height / 2, 5, gameConfig.height)
        this.roadEdges.add(leftEdge)

        let rightEdge = this.add.rectangle(gameConfig.width - 60, gameConfig.height / 2, 5, gameConfig.height)
        this.roadEdges.add(rightEdge)


        // Player ------------------------------------------------------------------------------
        this.player = new Player(this, gameConfig.width / 2, 370, "playerVan")

        // Group for player projectiles
        this.projectiles = this.physics.add.group(
            {
                classType: Projectile,
                runChildUpdate: true
            }
        )

        // The player shoots a projectile when the space bar is pressed
        this.input.keyboard.on('keydown-SPACE', () =>
        {
            this.fireProjectile()
        })


        // Enemy ------------------------------------------------------------------------------
        this.enemySpawnTimer = 5

        // Enemy group
        this.enemies = this.physics.add.group(
            {
                classType: Enemy,
                runChildUpdate: true
            }
        )

        // Group for obstacles dropped by enemies
        this.obstacles = this.physics.add.group(
            {
                classType: Obstacle,
                runChildUpdate: true
            }
        )


        // Passive Vehicles ------------------------------------------------------------------------------
        this.passiveVehicleSpawnTimer = 2

        // Car group
        this.cars = this.physics.add.group(
            {
                classType: Car,
                runChildUpdate: true
            }
        )

        // Bike group
        this.bikes = this.physics.add.group(
            {
                classType: Bike,
                runChildUpdate: true
            }
        )


        // Colliders ------------------------------------------------------------------------------
        // Player / Road Edges
        this.physics.add.collider(this.player, this.roadEdges, (player, edge) => 
        {
            this.vehicleHit.play()

            // Ensures that this code is only called once
            edge.destroy()

            player.lives = 0

            player.visible = false

            // Explosion at player location
            let explosion = this.add.sprite(player.x, player.y, "explosion")
            explosion.play("explosionAnim")
            // Then destroy explosion
            explosion.on("animationcomplete", () => {explosion.destroy(), this.scene.start("gameOver")})
        })

        // Player / Obstacles
        this.physics.add.collider(this.player, this.obstacles, (player, obstacles) =>
        {
            this.vehicleHit.play()
            player.lives -= 1
            obstacles.destroy()

            // Player death
            if (player.lives <= 0)
            {
                player.visible = false

                // Explosion at player location
                let explosion = this.add.sprite(player.x, player.y, "explosion")
                explosion.play("explosionAnim")
                // Then destroy explosion
                explosion.on("animationcomplete", () => {explosion.destroy(), this.scene.start("gameOver")})
            }
        })

        // Projectiles / Enemies
        this.physics.add.collider(this.projectiles, this.enemies, (projectile, enemy) =>
        {
            score += 100
            this.scoreText.setText(score)

            this.vehicleExplode.play()
            projectile.destroy()
            enemy.destroy()

            // Explosion at enemy location
            let explosion = this.add.sprite(enemy.x, enemy.y, "explosion")
            explosion.play("explosionAnim")
            // Then destroy explosion
            explosion.on("animationcomplete", () => {explosion.destroy()})
        })

        // Player / Cars
        this.physics.add.collider(this.player, this.cars, (player, car) =>
        {
            score -= 50
            // Score cannot go below 0
            if (score < 0)
            {
                score = 0
            }
            this.scoreText.setText(score)
            
            this.vehicleHit.play()
            player.lives -= 1
            car.destroy()

            // Explosion at car location
            let explosion = this.add.sprite(car.x, car.y, "explosion")
            explosion.play("explosionAnim")
            // Then destroy explosion
            explosion.on("animationcomplete", () => {explosion.destroy()})

            // Player death
            if (player.lives <= 0)
            {
                player.visible = false

                // Explosion at player location
                let explosion = this.add.sprite(player.x, player.y, "explosion")
                explosion.play("explosionAnim")
                // Then destroy explosion
                explosion.on("animationcomplete", () => {explosion.destroy(), this.scene.start("gameOver")})
            }
        })

        // Player / Bikes
        this.physics.add.collider(this.player, this.bikes, (player, bike) =>
        {
            score -= 100
            // Score cannot go below 0
            if (score < 0)
            {
                score = 0
            }
            this.scoreText.setText(score)

            this.vehicleHit.play()
            bike.destroy()

            // Explosion at bike location
            let explosion = this.add.sprite(bike.x, bike.y, "explosion")
            explosion.play("explosionAnim")
            // Then destroy explosion
            explosion.on("animationcomplete", () => {explosion.destroy()})
        })

        // Projectiles / Cars
        this.physics.add.collider(this.projectiles, this.cars, (projectile, car) =>
        {
            score -= 50
            // Score cannot go below 0
            if (score < 0)
            {
                score = 0
            }
            this.scoreText.setText(score)

            this.vehicleHit.play()
            projectile.destroy()
            car.destroy()

            // Explosion at car location
            let explosion = this.add.sprite(car.x, car.y, "explosion")
            explosion.play("explosionAnim")
            // Then destroy explosion
            explosion.on("animationcomplete", () => {explosion.destroy()})
        })

        // Projectiles / Bikes
        this.physics.add.collider(this.projectiles, this.bikes, (projectile, bike) =>
        {
            score -= 50
            // Score cannot go below 0
            if (score < 0)
            {
                score = 0
            }
            this.scoreText.setText(score)

            this.vehicleHit.play()
            projectile.destroy()
            bike.destroy()

            // Explosion at bike location
            let explosion = this.add.sprite(bike.x, bike.y, "explosion")
            explosion.play("explosionAnim")
            // Then destroy explosion
            explosion.on("animationcomplete", () => {explosion.destroy()})
        })


        // UI ------------------------------------------------------------------------------
        // Life container
        this.lifeContainer = this.add.image(40, 390, "lifeContainer")

        // Lives are made invisible one-by-one in the player class
        this.life1 = this.add.image(40, 345, "life")
        this.life2 = this.add.image(40, 390, "life")
        this.life3 = this.add.image(40, 435, "life")

        // Score text
        this.scoreText = this.add.text(100, 420, score,
            {
                fontFamily: "Tiny5-Regular",
                fontSize: "40px",
                color: "#FF2323"
            }
        )
    }

    
    update()
    {
        // Update road
        this.road.update(true)


        // Update player
        this.player.update(this.cursors)
        

        // Adds new enemies when timer reaches 0
        if (this.enemySpawnTimer <= 0)
        {
            this.spawnEnemyFormation()
            this.enemySpawnTimer = Phaser.Math.Between(50, 80) / 10
        }
        // Spawn timer only counts down if no enemies exist
        else if (this.enemies.getLength() <= 0)
        {
            this.enemySpawnTimer -= 0.01

            // Spawns a passive vehicle periodically if there are no enemies
            if (this.passiveVehicleSpawnTimer <= 0 && this.enemySpawnTimer > 1)
            {
                this.spawnPassiveVehicle()
                this.passiveVehicleSpawnTimer = Phaser.Math.Between(10, 20) / 10
            }
            else
            {
                this.passiveVehicleSpawnTimer -= 0.01
            }
        }
    }


    spawnEnemyFormation()
    {
        // Creates a new enemy
        let enemy1 = this.enemies.get(0, 0, "enemyVan")
        let enemy2 = this.enemies.get(0, 0, "enemyVan")

        let spawnFormation = Phaser.Math.Between(1, 10)

        switch(spawnFormation)
        {
            case 1:
                enemy1.body.reset(150, -43)
                enemy2.body.reset(240, -43)
                break
            case 2:
                enemy1.body.reset(240, -43)
                enemy2.body.reset(330, -43)
                break
            case 3:
                enemy1.body.reset(150, -43)
                enemy2.body.reset(330, -43)
                break
            default:
                enemy1.body.reset(Phaser.Math.Between(150, 330), -43)
                enemy2.destroy()
                break
        }
    }

    spawnPassiveVehicle()
    {
        let randVehicle = Phaser.Math.Between(1, 3)

        // Spawns a bike
        if (randVehicle === 1)
        {
            let bike = this.bikes.get(0, 0, "bike")
            let randLane = Phaser.Math.Between(1, 3)
            switch (randLane)
            {
                case 1:
                    bike.body.reset(Phaser.Math.Between(140, 160), -40)
                    break
                case 2:
                    bike.body.reset(Phaser.Math.Between(230, 250), -40)
                    break
                case 3:
                    bike.body.reset(Phaser.Math.Between(320, 340), -40)
                    break
            }
            
            bike.body.allowGravity = false
        }
        // Spawns a car
        else
        {
            let car = this.cars.get(0, 0, "car")
            let randLane = Phaser.Math.Between(1, 2)
            if (randLane === 1)
            {
                car.body.reset(Phaser.Math.Between(140, 160), -40)
            }
            else
            {
                car.body.reset(Phaser.Math.Between(320, 340), -40)
            }

            car.body.allowGravity = false
        }
    }


    fireProjectile()
    {
        // Creates a new bullet object
        let projectile = this.projectiles.get(this.player.x, this.player.y, "projectile")

        // *Resetting physics body is good practice
        projectile.body.reset(this.player.x, this.player.y - 40)

        // Unnaffected by gravity and travels upwards
        projectile.body.allowGravity = false

        projectile.setVelocityY(-300)
        // Projectile x velocity is determines by player x velocity
        projectile.setVelocityX(this.player.velocity)
        
        this.pizzaFling.play()
    }


    dropObstacle(enemyX, enemyY)
    {
        // Creates a new bullet object
        let obstacle = this.obstacles.get(enemyX, enemyY, "obstacle")

        // *Resetting physics body is good practice
        obstacle.body.reset(enemyX, enemyY)

        // Unnaffected by gravity and travels upwards
        obstacle.body.allowGravity = false
        
        this.boneDrop.play()
    }


    setUpAnimations()
    {
        // Player van anim
        this.anims.create(
        {
            key: "playerVanAnim",
            frames: this.anims.generateFrameNumbers("playerVan", {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        })

        // Enemy van anim
        this.anims.create(
        {
            key: "enemyVanAnim",
            frames: this.anims.generateFrameNumbers("enemyVan", {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        })

        // Car anim
        this.anims.create(
        {
            key: "carAnim",
            frames: this.anims.generateFrameNumbers("car", {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        })

        // Bike anim
        this.anims.create(
        {
            key: "bikeAnim",
            frames: this.anims.generateFrameNumbers("bike", {start: 0, end: 1}),
            frameRate: 8,
            repeat: -1
        })


        // Explosion anim
        this.anims.create(
        {
            key: "explosionAnim",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 3}),
            frameRate: 12,
            repeat: 0
        })
    }
}


// ------------------------------------------------------------------------- //
// Game Over Menu
class GameOver extends Phaser.Scene
{
    constructor()
    {
        super({key: "gameOver"});
    }


    preload()
    {
        this.load.spritesheet("gameOver", "Assets/Sprites/Menu/GameOver.png", {frameWidth: 315, frameHeight: 100})

        this.load.spritesheet("back", "Assets/Sprites/Menu/BackButton.png", {frameWidth: 160, frameHeight: 50})

        this.load.audio("gameOverSting", "Assets/Audio/gameOverSting.wav")
        this.load.audio("fishMock", "Assets/Audio/fishMock.wav")
    }


    create()
    {
        // Determines high score
        if (highScore < score)
        {
            highScore = score
        }

        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "menuRoad")

        let gameOverSting = this.sound.add("gameOverSting")
        gameOverSting.play()


        // Game Over title
        this.gameOver = this.add.sprite(240, 110, "gameOver")
        this.gameOver.play("gameOverAnim")

        // Sound effects
        this.buttonSelect = this.sound.add("buttonSelect")
        this.fishMock = this.sound.add("fishMock")
        // Boolean to make mocking sound fire only once when condition is met
        this.fishSoundFire = true


        

        // Play Button ----------------------------------------------------------
        let playButton = this.add.sprite(240, 340, "play")

        playButton.setInteractive()

        playButton.on("pointerdown", () => {this.scene.start("gameplay"), this.buttonSelect.play()})
        playButton.on("pointerover", () => {playButton.play("playButtonOn")})
        playButton.on("pointerout", () => {playButton.play("playButtonOff")})


        // Back Button ----------------------------------------------------------
        let backButton = this.add.sprite(240, 400, "back")

        backButton.setInteractive()

        backButton.on("pointerdown", () => {this.scene.start("main"), this.buttonSelect.play()})
        backButton.on("pointerover", () => {backButton.play("backButtonOn")})
        backButton.on("pointerout", () => {backButton.play("backButtonOff")})


        // Text ----------------------------------------------------------
        // Score text
        this.scoreText = this.add.text(240, 220, "Your Score: " + score,
            {
                fontFamily: "Tiny5-Regular",
                fontSize: "40px",
                color: "#FF2323"
            }
        )
        this.scoreText.setOrigin(0.5)

        // High score text
        this.highScoreText = this.add.text(240, 260, "High Score: " + highScore,
            {
                fontFamily: "Tiny5-Regular",
                fontSize: "40px",
                color: "#FF2323"
            }
        )
        this.highScoreText.setOrigin(0.5)
    }

    update()
    {
        this.road.update(false)


        // Plays fish mocking sound and checks if the sound has played already
        if (this.gameOver.anims.currentFrame.index === 2 && this.fishSoundFire)
        {
            this.fishMock.play()
            this.fishSoundFire = false
        }
        else if (this.gameOver.anims.currentFrame.index !== 2)
        {
            this.fishSoundFire = true
        }
    }

    setUpAnimations()
    {
        // Title text anim
        this.anims.create(
        {
            key: "gameOverAnim",
            frames: this.anims.generateFrameNumbers("gameOver", {start: 0, end: 1}),
            frameRate: 1,
            repeat: -1
        })


        // Back button anim
        this.anims.create(
        {
            key: "backButtonOn",
            frames: this.anims.generateFrameNumbers("back", {start: 1, end: 1}),
            frameRate: 8,
            repeat: 0
        })

        this.anims.create(
        {
            key: "backButtonOff",
            frames: this.anims.generateFrameNumbers("back", {start: 0, end: 0}),
            frameRate: 8,
            repeat: 0
        })
    }
}



// ------------------------------------------------------------------------- //
// Game Setup
window.onload = function ()
{
    gameConfig =
    {
        width: 480,
        height: 480,
        backgroundColor: 0x110248,
        physics:
        {
            default: "arcade",
            arcade:
            {
                gravity: { y: 200 },
                debug: false
            }
        },
        scene: [Main, HowToPlay, Gameplay, GameOver]
    }
    game = new Phaser.Game(gameConfig);
}

