export default class Obstaculo extends Phaser.GameObjects.Sprite 
{
  constructor(scene, x, y,anim,speed, dureza) {

    super(scene,x,y,anim);

    this.resistencia = dureza;
    this.worldSpeed = speed;
    this.scene.add.existing(this);

    this.setScale(0.1); 
    this.setDepth(5);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, this.scene.groundlayer);
    this.scene.physics.add.collider(this, this.scene.platformlayer);


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
        // Esto es probablemente es tremendamente feo, revisar
            this.scene.physics.add.collider(this,this.scene.player);
      }
      
    }
    
  }

  ralentizar(dureza)
  {
    this.scene.player.ralentizar(dureza);
    this.destroy(); 
  }
  
}