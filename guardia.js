import Personaje from "./personaje.js";

export default class Guardia extends Personaje
{
  constructor(scene, x, y) {

    super(scene,x,y,'guardia');
    this.setScale(0.25); 
  }

  preUpdate(t,d)
  {
    super.preUpdate(t, d);
    /*if (tiene que saltar)
    {
        this.body.setVelocityY(-300);
    }

    //else if (tiene que agacharse) 
    {
        se agacha :)
    }
    */
  }  
}