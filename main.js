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
    }


    create()
    {
        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "menuRoad")


        // Title
        let title = this.add.sprite(240, 110, "title")
        title.play("titleAnim")


        // Play Button ----------------------------------------------------------
        let playButton = this.add.sprite(240, 280, "play")

        playButton.setInteractive()

        playButton.on("pointerdown", () => {this.scene.start("gameplay")})
        playButton.on("pointerover", () => {playButton.play("playButtonOn")})
        playButton.on("pointerout", () => {playButton.play("playButtonOff")})


        // Help Button ----------------------------------------------------------
        let helpButton = this.add.sprite(240, 340, "help")

        helpButton.setInteractive()

        helpButton.on("pointerdown", () => {this.scene.start("howToPlay")})
        helpButton.on("pointerover", () => {helpButton.play("helpButtonOn")})
        helpButton.on("pointerout", () => {helpButton.play("helpButtonOff")})


        // Exit Button ----------------------------------------------------------
        let exitButton = this.add.sprite(240, 400, "exit")

        exitButton.setInteractive()

        exitButton.on("pointerdown", () => {window.close()})
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
    }


    create()
    {
        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "menuRoad")


        // Title
        let title = this.add.sprite(240, 110, "title")
        title.play("titleAnim")


        // Back Button ----------------------------------------------------------
        let backButton = this.add.sprite(240, 400, "back")

        backButton.setInteractive()

        backButton.on("pointerdown", () => {this.scene.start("main")})
        backButton.on("pointerover", () => {backButton.play("backButtonOn")})
        backButton.on("pointerout", () => {backButton.play("backButtonOff")})
    }

    update()
    {
        this.road.update(false)
    }

    setUpAnimations()
    {
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
    }


    create()
    {
        this.setUpAnimations()

        // Sets up keyboard
        this.cursors = this.input.keyboard.createCursorKeys()

        // Scrolling road
        this.road = new Road(this, gameConfig.width / 2, 0, "road")
        
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

        this.player = new Player(this, gameConfig.width / 2, 380, "playerVan")
    }

    
    update()
    {
        // Update road
        this.road.update(true)

        // Update player
        this.player.update(this.cursors)

        // Ends the game if the player leaves road boundaries
        if (this.player.x < 80 || this.player.x > gameConfig.width - 80)
        {
            this.scene.start("main")
        }
    }


    fireProjectile()
    {
        // Creates a new bullet object
        let projectile = this.projectiles.get(this.player.x, this.player.y, "projectile")

        // *Resetting physics body is good practice
        projectile.body.reset(this.player.x, this.player.y)

        // Unnaffected by gravity and travels upwards
        projectile.body.allowGravity = false
        projectile.setVelocityY(-300)
    }


    setUpAnimations()
    {
        // Title text anim
        this.anims.create(
        {
            key: "playerVanAnim",
            frames: this.anims.generateFrameNumbers("playerVan", {start: 0, end: 1}),
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

    }


    create()
    {

    }


    update()
    {

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
                debug: true
            }
        },
        scene: [Main, HowToPlay, Gameplay, GameOver]
    }
    game = new Phaser.Game(gameConfig);
}

