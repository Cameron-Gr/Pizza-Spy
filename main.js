let gameConfig;
let game;

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


        // Menu Symbols
        let arrowKeys = this.add.sprite(180, 240, "arrowKeys")
        arrowKeys.play("arrowKeysAnim")

        let spaceBar = this.add.sprite(180, 320, "spaceBar")
        spaceBar.play("spaceBarAnim")


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
        this.load.image("road", "Assets/Sprites/Gameplay/Road.png")

        this.load.spritesheet("playerVan", "Assets/Sprites/Gameplay/PlayerVan.png", {frameWidth: 60, frameHeight: 100})
        this.load.image("projectile", "Assets/Sprites/Gameplay/PlayerProjectile.png")

        this.load.spritesheet("enemyVan", "Assets/Sprites/Gameplay/EnemyVan.png", {frameWidth: 60, frameHeight: 100})
        this.load.image("obstacle", "Assets/Sprites/Gameplay/EnemyObstacle.png")

        this.load.image("life", "Assets/Sprites/Gameplay/Life.png")
        this.load.image("lifeContainer", "Assets/Sprites/Gameplay/LifeContainer.png")

        this.load.audio("pizzaFling", "Assets/Audio/pizzaFling.wav")
        this.load.audio("boneDrop", "Assets/Audio/boneDrop.wav")
    }


    create()
    {
        this.setUpAnimations()

        // Sets up keyboard
        this.cursors = this.input.keyboard.createCursorKeys()

        // Scrolling road
        this.road = new Road(this, gameConfig.width / 2, 0, "road")
        
        // Life UI
        this.lifeContainer = this.add.image(40, 90, "lifeContainer")
        this.life1 = this.add.image(40, 45, "life")
        this.life2 = this.add.image(40, 90, "life")
        this.life3 = this.add.image(40, 135, "life")

        this.pizzaFling = this.sound.add("pizzaFling")
        this.boneDrop = this.sound.add("boneDrop")


        // Player ------------------------------------------------------------------------------
        this.player = new Player(this, gameConfig.width / 2, 380, "playerVan")

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


        // Colliders ------------------------------------------------------------------------------
        this.physics.add.collider(this.player, this.obstacles, (player, obstacles) =>
        {
            player.lives -= 1
            obstacles.destroy()
        })

        this.physics.add.collider(this.projectiles, this.enemies, (projectile, enemy) =>
        {
            projectile.destroy()
            enemy.destroy()
        })
    }

    
    update()
    {
        // Update road
        this.road.update(true)


        // Update player
        this.player.update(this.cursors)

        // Ends the game if the player runs out of lives or leaves road boundaries
        if (this.player.lives <= 0 || (this.player.x < 80 || this.player.x > gameConfig.width - 80))
        {
            this.scene.start("gameOver")
        }


        // Adds new enemies when none exist
        if (this.enemies.getLength() <= 0)
        {
            this.spawnEnemyFormation()
        }
    }


    spawnEnemyFormation()
    {
        // Creates a new enemy
        let enemy1 = this.enemies.get(0, 0, "enemyVan")
        let enemy2 = this.enemies.get(0, 0, "enemyVan")

        let spawnFormation = Phaser.Math.Between(1, 4)

        switch(spawnFormation)
        {
            case 1:
                enemy1.body.reset(Phaser.Math.Between(150, 330), -43)
                enemy2.destroy()
                break
            case 2:
                enemy1.body.reset(150, -43)
                enemy2.body.reset(240, -43)
                break
            case 3:
                enemy1.body.reset(240, -43)
                enemy2.body.reset(330, -43)
                break
            case 4:
                enemy1.body.reset(150, -43)
                enemy2.body.reset(330, -43)
                break
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
        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "menuRoad")

        let gameOverSting = this.sound.add("gameOverSting")
        gameOverSting.play()

        // Game Over title
        this.gameOver = this.add.sprite(240, 110, "gameOver")
        this.gameOver.play("gameOverAnim")

        // Fish mocking sound
        this.fishMock = this.sound.add("fishMock")
        // Boolean to make mocking sound fire only once when condition is met
        this.fishSoundFire = true


        this.buttonSelect = this.sound.add("buttonSelect")
        
        // Play Button
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

