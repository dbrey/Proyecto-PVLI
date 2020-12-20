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

   /* this.scene.physics.add.collider(this,this.scene.player, function () {
      this.scene.ralentizar(9000)
      this.destroy();
    })*/

    /*this.scene.physics.add.collider(this, this.scene.player, function (player) {
      //if (player.body.y + player.body.height) - this.body.y < 10) { };
      .ralentizar(9000);
      obs.destroy();
    }*/

  }

  preupdate(t, d){
    super.preUpdate(t, d);
    this.body.setVelocityX(this.worldSpeed)
  }
}