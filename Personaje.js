export default class Personaje extends Phaser.Physics.Arcade.Sprite 
{
  constructor(scene, x, y,anim) {

    // let aspecto = scene.physics.add.sprite(0, 0, 'playerSheet');
    super(scene,x,y,anim);

    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.setColliderWorldBounds(true);

    // scene.add.existing(this);

    // scene.physics.world.enableBody(this);
    // this.body.velocity.x = 100;
    // this.setVelocityX(160);

    // scene.Personaje.add(this);
  }

  preload()
  {
    this.load.spritesheet('playerSheet', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Characters/SpritesheetCorrer.png', { frameWidth: 161, frameHeight: 216 });
  }

  create()
  {
    this.player = this.physics.add.sprite(200,420, 'playerSheet');


  }

  
}