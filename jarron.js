import obstaculo from"./obstaculo.js";

export default class jarron extends obstaculo
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);
    this.escenario = scene;
    this.inicio = false;
    this.setScale(0.85);
    this.body.setVelocityY(50);
  }
  
  preUpdate(t, d){

    if (this.escenario.sigoJugando())
    {
      // Si vuelve a jugar, nos aseguramos que lo primero que hace es reactivar las fisicas, solo 1 vez
      if(this.inicio)
      {
        this.scene.physics.resume();
        this.inicio = false;
      }

      // Chequeamos los lados y si el jarron toca la cabeza del player
      if((this.scene.player.body.touching.up && this.body.touching.down) ||(this.scene.player.body.touching.right && this.body.touching.left) || 
      (this.scene.player.body.touching.left && this.body.touching.right))
      {
        super.ralentizar(75);
      }
      // Si colisiona contra el suelo, se destruye
      else if (this.body.velocity.y <= 0 )
      {
        this.destroy();
      }
    }
    else
    {
      // Si no sigue jugando, pausamos el juego
      this.inicio = true;
      this.scene.physics.pause();
    }
    
  }

}