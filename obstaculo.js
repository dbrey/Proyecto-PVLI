export default class Obstaculo extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim,speed, dureza) {

    super(scene,x,y,anim);

    this.resistencia = dureza;
    this.worldSpeed = speed;
    this.scene.add.existing(this);

    this.setScale(0.1); 
    this.setDepth(5);
    this.scene.physics.world.enableBody(this);
  }

  preupdate(t, d){
    super.preUpdate(t, d);
    this.body.setVelocityX(this.worldSpeed)
  }
}