import obstaculo from"./obstaculo.js";

export default class jarron extends obstaculo
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);
    
    this.setScale(0.85);
    this.body.setVelocityY(50);
  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);
    if((this.scene.player.body.touching.up && this.body.touching.down) ||(this.scene.player.body.touching.right && this.body.touching.left) || 
     (this.scene.player.body.touching.left && this.body.touching.right))
    {
      super.ralentizar(1000);
    }
    else if (this.body.velocity.y <= 0)
    {
      this.destroy();
    }
  }

}