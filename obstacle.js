class Obstacle extends Phaser.Physics.Arcade.Image
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);

        scene.add.existing(this)

        scene.physics.add.existing(this)
        this.body.allowGravity = false

        this.body.setSize(35, 80)
        this.setOffset(5, 0)
    }

    update()
    {
        // sets the obstacle speed to match the road speed
        this.y += this.scene.road.speed

        if(this.y > 520)
        {
            this.destroy()
        }
    }
}

