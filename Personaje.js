class Personaje extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim) {

    super(scene,x,y,anim);

    scene.physics.world.enable(this);
    this.setColliderWorldBounds(true);

    this.scene.add.existing(this);

    this.scene.physics.world.enableBody(this);
    this.body.setColliderWorldBounds(true);
    this.body.velocity.x = 100;
    
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload()
  {
    this.load.spritesheet('playerSheet', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Characters/SpritesheetCorrer.png', { frameWidth: 161, frameHeight: 216 });

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-50);
    }


  }

  
}