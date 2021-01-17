export default class DeadMenu extends Phaser.Scene 
{
  constructor() {
    super({ key: 'deadmenu' });
    this.puntuacion;
    this.sonidoActivo;
  }

  init(data)
  {
    this.puntuacion = data.int;
    this.sonidoActivo = data.bool;
  }

  preload() {
    this.load.image('deadmenubg', './sprites/menu_muerte/menu_muerte.png');

    //imagenes botones:
    this.load.image('menuoff', './sprites/escena_creditos/main1.png');
    this.load.image('menuon', './sprites/escena_creditos/main2.png');

    this.load.image('soundoff', './sprites/menu_muerte/sonido_off.png');
    this.load.image('soundon', './sprites/menu_muerte/sonido_on.png');

    this.load.image('runagainoff', './sprites/escena_creditos/main1.png');
    this.load.image('runagainon', './sprites/escena_creditos/main2.png');
  }


  create() {
    this.scene.bringToTop();

    this.fondo = this.add.sprite(525, 300, 'deadmenubg');
    this.fondo.setDepth(2);
    this.fondo.setScale(0.75);
    //boton
    let menu = this.add.image(615,412, 'menuoff').setInteractive();
    let runagain = this.add.image(615,304, 'runagainoff').setInteractive();
    this.soundText;
    if (this.sonidoActivo) this.soundText = 'soundon';
    else this.soundText = 'soundoff';
    let sound = this.add.image(545,535, this.soundText).setInteractive();
    menu.setDepth(2);
    runagain.setDepth(2);
    sound.setDepth(2);
    menu.setScale(0.75);
    runagain.setScale(0.75);
    sound.setScale(0.4);
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    menu.on('pointerover', event => 
    {
      menu = this.add.image(615,412, 'menuon');
      menu.setDepth(2);
      menu.setScale(0.75);
    });
    menu.on('pointerout', event => 
    {
      menu = this.add.image(615,412, 'menuoff');
      menu.setDepth(2);
      menu.setScale(0.75);
    });
    menu.on('pointerdown', event => {
      this.volvermenu();
    });


    runagain.on('pointerover', event => 
    {
        runagain = this.add.image(615,304, 'runagainon');
        runagain.setDepth(2);
        runagain.setScale(0.75);
    });
    runagain.on('pointerout', event => 
    {
        runagain = this.add.image(615,304, 'runagainoff');
        runagain.setDepth(2);
        runagain.setScale(0.75);
    });
    runagain.on('pointerdown', event => {
      this.playagain();
    });

    this.iniFunctAudio(sound);
    
  };

  iniFunctAudio(sound){
    sound.on('pointerdown', event => 
      {
        this.sonidoActivo = !this.sonidoActivo;
        if(this.sonidoActivo)//Si se activa el sonido
        {
          sound.destroy();
          sound = null;
          sound = this.add.image(545,535, 'soundon').setInteractive();
          sound.setDepth(2);
          sound.setScale(0.4);
          this.iniFunctAudio(sound);
        }
        else //Si se desactiva
        {
          sound.destroy();
          sound = null;
          sound = this.add.image(545,535, 'soundoff').setInteractive();
          sound.setDepth(2);
          sound.setScale(0.4);
          this.iniFunctAudio(sound);
        }
      });
  }


  update() //Supongo que la imagen final tiene de tamaño 1000
  {
    if(this.enter.isDown)
    {
      this.volvermenu();
    }
    if(this.keyR.isDown)
    {
      this.playagain();
    }
  }

  volvermenu()
  {
    this.scene.start('menu', {int:this.puntuacion, bool:this.sonidoActivo});
  }

  playagain(){
      this.scene.start("game", {bool:this.sonidoActivo, int:this.puntuacion});
  }
}