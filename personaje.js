export default class Personaje extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim, speed) {

    super(scene,x,y,anim);

    this.worldSpeed = speed;
    this.scene.add.existing(this);

    this.scene.physics.world.enableBody(this);
    //this.body.setVelocityX(100); //Esto lo está usando Álvaro para probar. Por eso está comentado no lo borréis
  }

  preupdate(t, d){
    super.preUpdate(t, d);
  }

  //Suma la velocidad del mapa (speed) más la velocidad del personaje (el guardia siempre será 0)
  moverse(velocidadAparte){
    this.body.setVelocityX(this.worldSpeed + velocidadAparte);
  }

  saltar(){
    this.body.setVelocityY(-300);
  }

  agacharse(){
    //Cambio de hitbox

  }
}