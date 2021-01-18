export default class Obstaculo extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y, anim) {

    super(scene,x,y, anim);

    this.scene.add.existing(this);
    
    this.nombre2 = anim;
    this.setDepth(5);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, this.scene.player);
    this.scene.physics.add.collider(this, this.scene.groundlayer);

    if(anim !== "jarron")
    {
      this.scene.physics.add.collider(this, this.scene.platform);
    }

    if(anim === "caja" || anim === "barril")
    {
      this.setScale(0.8); 
      this.resistencia = 200;

    }
    else if(anim === "botellavacia")
    {
      this.setScale(0.65);
      this.resistencia =  100;
    }

    
  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    if(((this.scene.player.body.touching.right && this.body.touching.left) || 
        (this.scene.player.body.touching.left && this.body.touching.right)) && (this.nombre2 !== "jarron"))
     {
       this.ralentizar(this.resistencia);
     }
     
  }

  ralentizar(dureza)
  {
    this.scene.player.ralentizar(dureza, this.nombre2);
    this.destroy(); 
  }
  
  chocarobsmov()
  {
   /*if((this.body.touching.up && this.scene.player.body.touching.down))
    {
      this.ralentizar(10);
    }*/
  }

  chocarjarron()
  {
    /*if(this.body.touching.down && this.scene.player.body.touching.up)
    {
      this.ralentizar(10);
    }
    else if(this.body.velocity.y <= 0)
    {
      this.destroy();
    }*/
  }
}