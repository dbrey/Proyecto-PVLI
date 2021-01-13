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
    this.load.image('credits', './sprites/menu_inicial/bar_atlas.png');
  }


  create() {

    this.fondo = this.add.sprite(700, 0, 'credits');
    this.fondo.setScale(1.5);
    //boton
    let menu = this.add.image(150,700, 'botonplaynormal').setInteractive();

    let enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    enter.on('down', () => 
     {
       this.volvermenu;
     })

    // this.input.keyboard.on('ENTER',() => 
    // {
    //   this.volvermenu;
    // });

    menu.on('pointerdown', event => {
      this.volvermenu();
  });
  };
  update() //Supongo que la imagen final tiene de tamaño 1000
  {
    if(this.fondo.y < 1000)
    {
      this.fondo.y++;
    }
    
  }

  volvermenu()
  {
    this.scene.start('menu', {int:this.puntuacion});
  }
}
      