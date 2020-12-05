import Personaje from "./personaje.js";

export default class Player extends Personaje
{
  constructor(scene, x, y,anim) {

    super(scene,x,y,anim);

    this.setScale(0.4);

    var speed = 0;
    var maxspeed = 50;
    var minspeed = -50;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preUpdate()
  {
    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.body.setVelocityY(-300);
    }
    else if (this.cursors.left.isDown) //Izquierda reducir vel
    {
      this.speed--;
      this.body.setVelocityX(-100); //this.speed
    }
    else if (this.cursors.right.isDown) //Derecha aumentar vel
    {
      this.speed++;
      this.body.setVelocityX(100); //this.dpeed
    }
  }  
}