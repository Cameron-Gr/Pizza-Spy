class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture)

        scene.add.existing(this)

        scene.physics.add.existing(this)
        this.body.allowGravity = false

        this.setCollideWorldBounds(true)

        this.body.setSize(35, 90)
        this.setOffset(15, 10)

        this.velocity = 0
        this.acceleration = 0

        this.lives = 3
    }

    update(cursorKeys)
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
        if(cursorKeys.left.isDown || (cursorKeys.right.isUp && this.velocity > 0))
        {
            this.acceleration = -1

            this.rotation = -0.1
        }
        // Right movement (acceleration and deceleration)
        if(cursorKeys.right.isDown || (cursorKeys.left.isUp && this.velocity < 0))
        {
            this.acceleration = 1

            this.rotation = 0.1
        }

        this.play("playerVanAnim", true)



        switch (this.lives)
        {
            case 2:
                this.scene.life1.destroy()
                break
            case 1:
                this.scene.life2.destroy()
                break
            case 0:
                this.scene.life3.destroy()
                break
        }
    }
}

