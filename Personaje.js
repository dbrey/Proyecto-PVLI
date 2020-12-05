

export default class Personaje extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim) {

    super(scene,x,y,anim);

    this.scene.add.existing(this);

    

    this.scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds();
  }

  preUpdate()
  {
    
  }  
}