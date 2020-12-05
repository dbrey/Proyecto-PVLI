import Personaje from "./personaje.js";

export default class Guardia extends Personaje
{
  constructor(scene, x, y) {

    super(scene,x,y, 'guardia');
    
  }

  preUpdate()
  {
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