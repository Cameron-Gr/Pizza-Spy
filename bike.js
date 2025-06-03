class Bike extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)

        scene.physics.add.existing(this)
        this.body.allowGravity = false

        this.setCollideWorldBounds(false)

        this.body.setSize(15, 60)
        this.setOffset(10, 10)

        this.speed = Phaser.Math.Between(3.5, 4)
    }

    update()
    {   
        this.y += this.scene.road.speed + this.speed

        this.play("bikeAnim", true)

        if (this.y > 580)
        {
            this.destroy()
        }
    }
}

