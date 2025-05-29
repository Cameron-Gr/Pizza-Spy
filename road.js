class Road extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)

        this.speed = 1
    }

    update(isGameplay)
    {
        this.y += this.speed

        if (this.y >= gameConfig.height)
        {
            this.y = 0
        }

        if (isGameplay && this.speed < 3)
        {
            this.speed *= 1.00001
        }

        // console.log(this.speed)
    }
}

