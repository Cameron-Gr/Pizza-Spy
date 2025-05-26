class Road extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)
    }

    update()
    {
        this.y += 1

        if (this.y >= gameConfig.height)
        {
            this.y = 0
        }
    }
}

