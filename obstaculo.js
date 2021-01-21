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
    this.chocar = this.scene.sound.add('choq', {volume: 0.2}, {loop: false});

    // Dependiendo del objeto que recibamos, lo escalamos debidamente y le damos su resistencia correspondiente
    if(anim === "caja" || anim === "barril")
    {
      this.setScale(0.8); 
      this.resistencia = 110;

    }
    else if(anim === "botellavacia")
    {
      this.setScale(0.65);
      this.resistencia =  75;
    }

    
  }
  
  preUpdate(t, d){
    super.preUpdate(t, d);

    // Chequeamos si hay colision al lado izquierdo o derecho del obstaculo

    // Algunos obstaculos (obstaculos en movimiento y jarrones) chequean ellos mismos sus colisiones particulares
    // si se usa este chequeo tambien, produce errores
    if((this.scene.player.body.touching.right && this.body.touching.left) || 
        (this.scene.player.body.touching.left && this.body.touching.right))
     {
       this.ralentizar(this.resistencia);
     }
     
  }

  // Dependiendo de la resistencia del obstaculo, lo ralentiza mas o menos tiempo
  ralentizar(dureza)
  {
    if(this.scene.sonidoactive)
    {
      this.chocar.play();
    }
    this.scene.player.ralentizar(dureza);

    this.destroy(); 
  }
  
}