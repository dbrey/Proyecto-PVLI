export default class Obstaculo extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y, anim, nombre) {

    super(scene,x,y, anim);

    this.scene.add.existing(this);

    this.nombre2 = anim;
    console.log (anim);   
    this.setDepth(5);
    this.scene.physics.world.enableBody(this);
    if(anim === "caja" || anim === "barril")
    {
      this.setScale(1); 
      this.resistencia = 200;

    }
    else if(anim === "botellavacia")
    {
      this.setScale(0.75);
      this.resistencia =  100;
    }
    else if (anim === "barriltop")
    {
      this.setScale(1); 
      this.resistencia = 400;
      this.body.setVelocityX(-100);
    }
    else if(anim === "coche" || anim === "cocheoscuro")
    {
      this.setScale(4); 
      this.body.setSize(27, 10);
      this.resistencia = 700;
      this.body.setVelocityX(-300);
    }
    else if(anim === "jarron")
    {
      this.setScale(1);
      this.body.setVelocityY(350);

    }
    
  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);
   
    if(this.scene.physics.collide(this, this.scene.player)) {
      
      if((this.scene.player.body.touching.right && this.body.touching.left) || 
        (this.scene.player.body.touching.left && this.body.touching.right))
      {
        this.ralentizar(this.resistencia);
      }
      else if (this.scene.player.body.touching.down && this.body.touching.up)
      {
        // Una vez crea el collider, no vuelve a detectar colision
        this.scene.physics.add.collider(this,this.scene.player);
        
      }
      
    }
    else if(this.prueba < 10 && this.anim === "jarron")
    {
      console.log("me cai wey");
      this.destroy();
    }
    else
    {
      this.scene.physics.add.collider(this, this.scene.groundlayer);
    }
  }

  ralentizar(dureza)
  {
    this.scene.player.ralentizar(dureza);
    this.destroy(); 
  }
  
}