export default class CreditsScene extends Phaser.Scene 
{
  constructor() {
    super({ key: 'credits' });
    this.puntuacion;
  }

  init(data)
  {
    this.puntuacion = data.int;
  }

  preload() {
    this.load.image('credits', './sprites/escena_creditos/creditos.png');
    this.load.image('fondo', './sprites/escena_creditos/fondo_creditos.png');
  }


  create() {
    this.fondo = this.add.sprite(700, 400, 'fondo');
    this.creditos = this.add.sprite(700, 1000, 'credits');
    //boton
    let menu = this.add.image(150,700, 'botonplaynormal').setInteractive();

    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    menu.on('pointerdown', event => {
      this.volvermenu();
  });
  };
  update() //Supongo que la imagen final tiene de tamaño 1000
  {
    if(this.creditos.y > -200)
    {
      this.creditos.y -= 0.6;
    }
    if(this.enter.isDown)
    {
      this.volvermenu();
    }
  }

  volvermenu()
  {
    this.scene.start('menu', {int:this.puntuacion});
  }
}
      