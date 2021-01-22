import personaje from "./personaje.js";

export default class guardia extends personaje
{
  constructor(scene, x, y, speed) {

    super(scene,x,y,'guardiacorrersheet', speed * 60);
    this.setScale(0.2); 
    this.play('guardiacorrer',true);
    this.escenario = scene;
  }

  preUpdate(t,d)
  {
    if (this.escenario.sigoJugando()){
      super.preUpdate(t, d);
      this.moverse();
    }
    else this.body.setVelocityX(0);
  }  

  moverse(){
    super.moverse(0);
  }

  saltar(){
    super.saltar(-175); //potencia de salto del guardia (menos que el player porque "pesa" menos)
    //ANIMACIÓN DE SALTO DEL GUARDIA
    this.play('guardiacorrer',true);
  }
}