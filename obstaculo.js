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
    //this.scene.physics.add.collider(this,this.scene.player);

  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    // Hace lo que el quiere por alguna razon
    if(this.scene.physics.collide(this, this.scene.player)) {
      this.ralentizar(400);

    }
    // Produce error raro al colisionar con varios objetos a la vezthis.body.setVelocityX(this.worldSpeed)
  }

  ralentizar(dureza)
  {
    this.scene.player.ralentizar(dureza);
    this.destroy(); 
  }
  
}