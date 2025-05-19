let gameConfig;
let game;

// ------------------------------------------------------------------------- //
// Front End Menu
class FrontEnd extends Phaser.Scene
{
    constructor()
    {
        super({key: "frontEnd"});
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
// Guide Menu
class Guide extends Phaser.Scene
{
    constructor()
    {
        super({key: "guide"});
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
        width: 640,
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
        scene: [FrontEnd, Guide, Gameplay, GameOver]
    }
    game = new Phaser.Game(gameConfig);
}

