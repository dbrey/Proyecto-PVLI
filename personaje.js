export default class personaje extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim, speed) {

    super(scene,x,y,anim);

    this.worldSpeed = speed;
    this.scene.add.existing(this);
    this.setDepth(5);
    this.scene.physics.world.enableBody(this);
    //this.body.setVelocityX(100); //Esto lo está usando Álvaro para probar. Por eso está comentado no lo borréis
  }

  preupdate(t, d){
    super.preUpdate(t, d);
  }

  //Suma la velocidad del mapa (speed) más la velocidad del personaje (el guardia siempre será 0)
  moverse(velocidadAparte){
    this.body.setVelocityX(this.worldSpeed + velocidadAparte); //el player se mueve a la velocidad del mundo + la suya individual marcada por input
  }

  saltar(fuerza){
    this.body.setVelocityY(fuerza); //fuerza de salto
  }

  agacharse(){
    //Cambio de hitbox

  }
}