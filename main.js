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
        this.load.image("road", "Assets/Sprites/Gameplay/Road.png")

        this.load.spritesheet("title", "Assets/Sprites/Menu/GameTitle.png", {frameWidth: 340, frameHeight: 130})

        this.load.spritesheet("play", "Assets/Sprites/Menu/PlayButton.png", {frameWidth: 160, frameHeight: 50})
        this.load.spritesheet("help", "Assets/Sprites/Menu/HelpButton.png", {frameWidth: 160, frameHeight: 50})
        this.load.spritesheet("exit", "Assets/Sprites/Menu/ExitButton.png", {frameWidth: 160, frameHeight: 50})
    }


    create()
    {
        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "road")


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
        this.road.update()
    }

    setUpAnimations()
    {
        //Lets set up our player idle
        this.anims.create(
        {
            //The name of the animation we want to play
            key: "titleAnim",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("title", {start: 0, end: 3}),
            frameRate: 2,
            //-1 = loop, 0 = no loop
            repeat: -1
        })


        this.anims.create(
        {
            //The name of the animation we want to play
            key: "playButtonOn",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("play", {start: 1, end: 1}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
            repeat: 0
        })

        this.anims.create(
        {
            //The name of the animation we want to play
            key: "playButtonOff",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("play", {start: 0, end: 0}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
            repeat: 0
        })


        this.anims.create(
        {
            //The name of the animation we want to play
            key: "helpButtonOn",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("help", {start: 1, end: 1}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
            repeat: 0
        })

        this.anims.create(
        {
            //The name of the animation we want to play
            key: "helpButtonOff",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("help", {start: 0, end: 0}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
            repeat: 0
        })
        

        this.anims.create(
        {
            //The name of the animation we want to play
            key: "exitButtonOn",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("exit", {start: 1, end: 1}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
            repeat: 0
        })

        this.anims.create(
        {
            //The name of the animation we want to play
            key: "exitButtonOff",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("exit", {start: 0, end: 0}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
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
        this.load.image("road", "Assets/Sprites/Gameplay/Road.png")

        this.load.spritesheet("title", "Assets/Sprites/Menu/GameTitle.png", {frameWidth: 340, frameHeight: 130})

        this.load.spritesheet("exit", "Assets/Sprites/Menu/ExitButton.png", {frameWidth: 160, frameHeight: 50})
    }


    create()
    {
        this.setUpAnimations()

        this.road = new Road(this, gameConfig.width / 2, 0, "road")


        // Title
        let title = this.add.sprite(240, 110, "title")
        title.play("titleAnim")


        // Back Button ----------------------------------------------------------
        let backButton = this.add.sprite(240, 400, "exit")

        backButton.setInteractive()

        backButton.on("pointerdown", () => {this.scene.start("main")})
        backButton.on("pointerover", () => {backButton.play("backButtonOn")})
        backButton.on("pointerout", () => {backButton.play("backButtonOff")})
    }

    update()
    {
        this.road.update()
    }

    setUpAnimations()
    {
        //Lets set up our player idle
        this.anims.create(
        {
            //The name of the animation we want to play
            key: "titleAnim",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("title", {start: 0, end: 3}),
            frameRate: 2,
            //-1 = loop, 0 = no loop
            repeat: -1
        })


        this.anims.create(
        {
            //The name of the animation we want to play
            key: "backButtonOn",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("exit", {start: 1, end: 1}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
            repeat: 0
        })

        this.anims.create(
        {
            //The name of the animation we want to play
            key: "backButtonOff",
            //The frames that we want to loop through - check out the overall spritesheet called player!
            frames: this.anims.generateFrameNumbers("exit", {start: 0, end: 0}),
            frameRate: 8,
            //-1 = loop, 0 = no loop
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

    }


    create()
    {

    }

    
    update()
    {

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
                debug: false
            }
        },
        scene: [Main, HowToPlay, Gameplay, GameOver]
    }
    game = new Phaser.Game(gameConfig);
}

