class Projectile extends Phaser.Physics.Arcade.Image
{
    constructor(scene, x, y, texture)
    {
        super(scene, x, y, texture);

        //Add it to the current scene
        scene.add.existing(this)
        //Then we add physics
        scene.physics.add.existing(this)
        //Disable the gravity for the bullet
        this.body.setAllowGravity(false)
        //Set the initial velocity
        this.setVelocityY(-300)
    }

    update()
    {
        if(this.y < -40)
        {
            this.destroy()
        }

        this.rotation += Math.PI / 20

        if (this.rotation >= (Math.PI * 2))
        {
            this.rotation = 0
        }
    }
}

