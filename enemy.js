class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)

        scene.physics.add.existing(this)
        this.body.allowGravity = false

        this.setCollideWorldBounds(false)

        this.body.setSize(45, 80)
        this.setOffset(10, 10)

        this.velocity = 200
        this.deceleration = 1

        this.dropTimer = Phaser.Math.Between(5, 10) / 10
    }

    update()
    {   
        this.velocity -= this.deceleration

        this.setVelocityY(this.velocity)


        if (this.velocity <= 1)
        {
            this.deceleration = 0
            this.velocity = 0
            this.y = 80


            if (this.dropTimer <= 0)
            {
                this.scene.dropObstacle(this.x, this.y + 30)
                this.dropTimer = Phaser.Math.Between(30, 50) / 10
            }
            else
            {
                this.dropTimer -= 0.01
            }
        }

        this.play("enemyVanAnim", true)
    }
}

