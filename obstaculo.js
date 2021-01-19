export default class obstaculo extends Phaser.GameObjects.Sprite 
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
      this.resistencia = 2000;

    }
    else if(anim === "botellavacia")
    {
      this.setScale(0.65);
      this.resistencia =  1000;
    }

    
  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    if((this.nombre2 !== "jarron") && (this.nombre2 !== "coche" && this.nombre2 !== "cocheoscuro" && this.nombre2 !== "barriltop") && ((this.scene.player.body.touching.right && this.body.touching.left) || 
        (this.scene.player.body.touching.left && this.body.touching.right)))
     {
       this.ralentizar(this.resistencia);
     }
     
  }

  ralentizar(dureza)
  {
    this.scene.player.ralentizar(dureza);
    this.destroy(); 
  }
  
}