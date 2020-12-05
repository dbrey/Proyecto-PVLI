import Personaje from "./personaje.js";

export default class Player extends Personaje
{
  constructor(scene, x, y,anim) {

    super(scene,x,y,anim);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preUpdate()
  {
    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.body.setVelocityY(-300);
    }
    else if (this.cursors.left.isDown && this.body.touching.down) //Izquierda reducir vel
    {
        this.body.setVelocityX(-200);
    }
    else if (this.cursors.right.isDown && this.body.touching.down) //Derecha aumentar vel
    {
        this.body.setVelocityX(200);
    }
  }  
}