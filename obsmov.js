import obstaculo from"./obstaculo.js";

export default class obsmov extends obstaculo
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);
    if (anim === "barriltop")
    {
      this.setScale(0.8); 
      this.resistencia = 2500;
      this.body.setVelocityX(-100);
    }
    else if(anim === "coche" || anim === "cocheoscuro")
    {
      this.setScale(2.5); 
      this.body.setSize(27, 8);
      this.resistencia = 20000;
      this.body.setVelocityX(-300);
      if (anim === "cocheoscuro")
      {
        this.flipX = true;
        this.body.setSize(27, 10);
        this.body.setOffset(7, 11);
      }
    }

    /*else if(anim === "botellavacia")
    {

      this.setScale(0.65);
      this.resistencia =  100;
      console.log(this.scale);

    }*/

  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    if((this.scene.player.body.touching.down && this.body.touching.up) ||(this.scene.player.body.touching.right && this.body.touching.left) || 
     (this.scene.player.body.touching.left && this.body.touching.right))
    {
      super.ralentizar(this.resistencia);
    }


    else if (this.body.velocity.x === 0 )
    {
      this.destroy();
    }
  }

}