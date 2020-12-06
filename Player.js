import Personaje from "./personaje.js";

export default class Player extends Personaje
{
  constructor(scene, x, y) {

    super(scene,x,y,'corrersheet');

    this.setScale(0.6);

    this.speed = 0;
    this.maxspeed = 50;
    this.minspeed = -50;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }
  'agacharse'
  preUpdate(t, d)
  {
    super.preUpdate(t, d);
    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.body.setVelocityY(-300);
        this.play('correr',true);
    }
    else if (this.cursors.left.isDown) //Izquierda reducir vel
    {
      this.speed--;
      this.body.setVelocityX(-100); //this.speed
    }
    else if (this.cursors.right.isDown) //Derecha aumentar vel
    {
      this.speed++;
      this.body.setVelocityX(100); //this.speed
    }
    else if (this.cursors.down.isDown) //Abajo
    {
      this.play('agacharse', true);
    }
  }  
}