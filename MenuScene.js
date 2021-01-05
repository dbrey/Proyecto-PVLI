import Game from '../game';

export class LoadScene extends Phaser.Scene 
{
  constructor() {
    super({ key: 'menu' });
  }


  preload() {
    this.load.image('mainmenu', './imagenes/menu.jpg');

    this.load.image('botonplay', './sprites/obstaculos/32x32/coche.png');
  }


  create() {
    this.scene.bringToTop();

    this.add.image(0,0, 'mainmenu').setOrigin(0);

    //boton
    const play = this.add.image(this.cameras.main.centerX - this.cameras.main.width/4,
      this.cameras.main.centerY + (this.cameras.main.height/10), 'botonplay').setInteractive();

    //Acciones
    play.on('pointerover', event => {play.setScale(1.2);});
    play.on('pointerout', event => {play.setScale(1);});

    play.on('pointerdown', event => {
      this.scene.start('game');
  });

  };

}
      