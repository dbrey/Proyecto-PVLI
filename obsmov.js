import Obstaculo from"./obstaculo.js";

export default class Obsmov extends Obstaculo
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);
    if (anim === "barriltop")
    {
      this.setScale(0.8); 
      this.resistencia = 400;
      this.body.setVelocityX(-100);
    }
    else if(anim === "coche" || anim === "cocheoscuro")
    {
      this.setScale(2.5); 
      this.body.setSize(27, 8);
      this.resistencia = 1000;
      this.body.setVelocityX(-300);
    }

  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    super.chocarobsmov();
  }

}