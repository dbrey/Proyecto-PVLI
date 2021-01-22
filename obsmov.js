import obstaculo from"./obstaculo.js";

export default class obsmov extends obstaculo
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);
    this.escenario = scene;
    if (anim === "barriltop")
    {
      this.setScale(0.8); 
      this.resistencia = 200;
      this.body.setVelocityX(-100);
      this.vel = -100;
    }
    else if(anim === "coche" || anim === "cocheoscuro")
    {
      this.setScale(2.5); 
      this.body.setSize(27, 8);
      this.resistencia = 1000;
      this.body.setVelocityX(-250);
      if (anim === "cocheoscuro")
      {
        this.flipX = true;
        this.body.setSize(27, 10);
        this.body.setOffset(7, 11);
      }
    }
    
  }
  
  preUpdate(t, d){
    //Chequeamos los lados y si el jugador lo ha tocado desde abajo
    
    if(this.escenario.sigoJugando())
    {

      if((this.scene.player.body.touching.down && this.body.touching.up) ||(this.scene.player.body.touching.right && this.body.touching.left) || 
      (this.scene.player.body.touching.left && this.body.touching.right))
      {
        super.ralentizar(this.resistencia);
      }
 
     // Si choca con algo que no sea el jugador y reduce su velocidad, lo destruimos
     else if (this.body.velocity.x === 0 )
     {
        this.destroy();
     }
    }


    
  }

}