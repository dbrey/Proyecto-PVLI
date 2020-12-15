import Personaje from "./personaje.js";

export default class Guardia extends Personaje
{
  constructor(scene, x, y, speed) {

    super(scene,x,y,'guardia', speed * 60);
    this.setScale(0.25); 
  }

  preUpdate(t,d)
  {
    super.preUpdate(t, d);
    this.moverse();
    
    /*if (tiene que saltar)
    {
        saltar();
    }

    //else if (tiene que agacharse) 
    {
        agacharse();
    }
    */
  }  

  moverse(){
    super.moverse(0);
  }

  saltar(){
    super.saltar();
    /*
    En el caso de que cuando probemos este salto en el guardia, no salte
    será porque pesa más y hay que añadirle más fuerza. En ese caso al saltar() de Personaje
    se le meterá un parámetro que será la fuerza y, desde Player se llamará con una fuerza y desde
    Guardia con otra.
    */
    //ANIMACIÓN DE SALTO DEL GUARDIA
  }

  agacharse(){
    super.agacharse();

    //Animación agacharse del guardia
  }
}