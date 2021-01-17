import Obstaculo from"./obstaculo.js";

export default class jarron extends Obstaculo
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);
    
    this.setScale(0.85);
    this.body.setVelocityY(50);
  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    /*if(this.scene.player.body.touching.up && this.body.touching.down && this.nombre2 === "jarron")
    {
      super.ralentizar(10);

    }
    else if (this.body.velocity.y <= 0 && this.nombre2 === "jarron")
    {
      this.destroy();
    }*/
  }

}