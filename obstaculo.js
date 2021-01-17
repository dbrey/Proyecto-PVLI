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
    else if (anim === "barriltop")
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
    if((this.scene.player.body.touching.right && this.body.touching.left) || 
        (this.scene.player.body.touching.left && this.body.touching.right) || (this.scene.player.body.touching.up && this.body.touching.down && this.nombre2 === "jarron"))
     {
       //console.log(this.scene.player.body);
       this.ralentizar(this.resistencia);
     }
     else if(this.body.velocity.y <= 0 && this.nombre2 === "jarron") // Por que aqui pilla el body pero en otro lado no?
     {
       this.destroy();
     }
  }

  ralentizar(dureza)
  {
    this.scene.player.ralentizar(dureza);
    this.destroy(); 
  }
  
}