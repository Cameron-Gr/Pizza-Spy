class Road extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)

        this.speed = 2.75
    }

    update(isGameplay)
    {
        this.y += this.speed

        if (this.y >= gameConfig.height)
        {
            this.y = 0
        }

        if (isGameplay && this.speed < 8)
        {
            this.speed *= 1.0001
        }

        console.log(this.speed)
    }
}

