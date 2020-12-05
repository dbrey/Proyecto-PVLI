//import Personaje from './personaje.js'
import Player from './Player.js';
import Guardia from './guardia.js';

export default class Game extends Phaser.Scene 
{
  constructor() {
    super({ key: "main" });
  }


  preload() {

    this.load.image('botellacalimocho', './sprites/items/calimocho.png');
    this.load.image('fondo1', './sprites/background/fondo_tras_del_todo.png');
    this.load.image('barril', './sprites/obstaculos/barril.png');
    this.load.image('plataforma', './sprites/background/plataforma.png');
    this.load.image('guardia', './sprites/characters/guardia.png');
    this.load.spritesheet('playersheet', './sprites/characters/spritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.audio('mainsoundtrack', './sonidos/queviva.mp3');
    // CAMBIAR VALORES DEL SPRITESHEET
    //El 4 y el 37 son las dimensiones de cada frame por separado (4x37), y el 234 es la CANTIDAD de frames que hay en el spriteSheet

    //this.load.image('botellaChampan', 'sprites/Champan CG.png');

    // Mayusculas, ñ , tildes, espacios no
  }


  create() {

    this.fondoimg = this.add.tileSsprite(0,0,1400, 800, 'fondo1');
    this.fondoimg.setScale(1.7);
    this.fondoimg.setOrigin(0,0);
    this.fondoimg.setScrollFactor(0);

    //let music = this.sound.add('mainsoundtrack', {loop: true});
    //music.play();

    this.calimoimg = this.physics.add.sprite(1100,210, 'botellacalimocho');
    this.calimoimg.setScale(0.04);
    this.barrilimg = this.physics.add.sprite(1100,300, 'barril');
    this.barrilimg.setScale(0.15);

    this.plataformasuelo = this.physics.add.staticGroup();


    this.plataformasuelo.create(100,490, 'plataforma');
    this.plataformasuelo.create(400,490, 'plataforma');
    this.plataformasuelo.create(700,490, 'plataforma');
    this.plataformasuelo.create(1000,490, 'plataforma');
    this.plataformasuelo.create(1300,490, 'plataforma');

    this.anims.create({
      key: 'correr',
      frames: this.anims.generateFrameNumbers('playersheet', { start:0, end: 5}),
      frameRate: 6,
      repeat: -1
    }); 
    this.physics.add.collider(this.barrilimg, this.plataformasuelo);
    this.physics.add.collider(this.calimoimg, this.plataformasuelo);

    this.player = new Player(this, 200,300);
    this.physics.add.collider(this.player, this.plataformasuelo);

    this.guardia = new Guardia(this, 10,300);
    this.physics.add.collider(this.guardia, this.plataformasuelo);
    

    this.cameramain = this.cameras.main;

    /*this.cameramain.add(this.player);
    this.add.existing(this.cameramain);*/

  };


  update(time, delta) 
  {
    this.cameramain.scrollX += 0.7;
    this.fondoimg.tilePositionX = this.cameramain.scrollX *3;
  }
}