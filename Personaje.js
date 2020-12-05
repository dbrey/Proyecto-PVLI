export default class Personaje extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim) {

    super(scene,x,y,anim);

    scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds();
    this.body.velocity.x = 100;
  }

  preUpdate()
  {
    
  }  
}