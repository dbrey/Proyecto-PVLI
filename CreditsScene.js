export default class creditsscene extends Phaser.Scene 
{
  constructor() {
    super({ key: 'credits' });
    this.puntuacion;
  }

  init(data)
  {
    this.puntuacion = data.int;
    this.sonido = data.bool
  }

  preload() {
    this.load.image('credits', './sprites/escena_creditos/creditos.png');
    this.load.image('fondo', './sprites/escena_creditos/fondo_creditos.png');

    this.load.image('menuoff', './sprites/escena_creditos/main1.png');
    this.load.image('menuon', './sprites/escena_creditos/main2.png');

    this.load.audio('click', './sonidos/menu1.mp3');
  }


  create() {
    this.click = this.sound.add('click', {volume: 0.2});

    this.fondo = this.add.sprite(525, 300, 'fondo');
    this.fondo.setDepth(2);
    this.fondo.setScale(0.75);

    this.creditos = this.add.sprite(525, 1130, 'credits');
    //boton
    let menu = this.add.image(180,525, 'menuoff').setInteractive();
    menu.setScale(0.8,0.75);
    menu.setDepth(3);
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    menu.on('pointerover', event => 
    {
      menu.setTexture('menuon');
    });
    menu.on('pointerout', event => 
    {
      menu.setTexture('menuoff');
    });

    menu.on('pointerdown', event => {
      if(this.sonido)
      {
        this.click.play();
      }
      this.volvermenu();
    });
  };



  
  update() //Supongo que la imagen final tiene de tamaño 1000
  {
    if(this.creditos.y > -200)
    {
      this.creditos.y -= 0.7;
    }
    if(this.enter.isDown)
    {
      this.volvermenu();
    }
  }

  volvermenu()
  {
    this.scene.start('menu', {int:this.puntuacion, bool:this.sonido});
  }
}
      