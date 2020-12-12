export default class Personaje extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim) {

    super(scene,x,y,anim);

    this.scene.add.existing(this);

    this.scene.physics.world.enableBody(this);
    //this.body.setVelocityX(100); //Esto lo está usando Álvaro para probar. Por eso está comentado no lo borréis
  }

  preupdate(t, d){
    super.preUpdate(t, d);
  }

  saltar(){
    this.body.setVelocityY(-300);
  }

  agacharse(){
    //Cambio de hitbox

  }
}