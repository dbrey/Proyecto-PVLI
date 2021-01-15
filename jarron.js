import "./obstaculo.js";

export default class jarron extends Obstaculo
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);
    this.setScale(0.8);
    this.body.setVelocityY(350);
  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    if(this.scene.player.body.touching.up && this.body.touching.down && this.nombre2 === "jarron")
    {
      ralentizar(this.resistencia);
    } 
    else if(this.body.velocity.y <= 0)
    {
      this.destroy();
    }
  }

}