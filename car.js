class Car extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)

        scene.physics.add.existing(this)
        this.body.allowGravity = false

        this.setCollideWorldBounds(false)

        this.body.setSize(35, 80)
        this.setOffset(5, 0)

        this.speed = Phaser.Math.Between(2, 2.5)
    }

    update()
    {   
        this.y += this.scene.road.speed + this.speed

        this.play("carAnim", true)

        if (this.y > 580)
        {
            this.destroy()
        }
    }
}

