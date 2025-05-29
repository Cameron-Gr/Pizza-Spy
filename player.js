class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)

        scene.physics.add.existing(this)
        this.body.allowGravity = false

        this.setCollideWorldBounds(true)

        this.body.setSize(45, 90)
        this.setOffset(10, 10)

        this.velocity = 0
        this.acceleration = 0
    }

    update(kb)
    {
        // When there are no keyboard inputs
        this.rotation = 0

        this.velocity += this.acceleration

        this.setVelocityX(this.velocity)


        // Velocity clamp
        if (this.velocity >= 200)
        {
            this.velocity = 200
        }
        else if (this.velocity <= -200)
        {
            this.velocity = -200
        }


        // Makes sure velocity can reach and stay at 0 (prevents jittering)
        if (this.velocity < 0.2 && this.velocity > -0.2)
        {
            this.acceleration = 0
            this.velocity = 0
        }


        // Left movement (acceleration and deceleration)
        if(kb.left.isDown || (kb.right.isUp && this.velocity > 0))
        {
            this.acceleration = -1

            this.rotation = -0.1
        }
        // Right movement (acceleration and deceleration)
        if(kb.right.isDown || (kb.left.isUp && this.velocity < 0))
        {
            this.acceleration = 1

            this.rotation = 0.1
        }

        this.play("playerVanAnim", true)


        // console.log(this.velocity)
    }
}

