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
    this.load.image('barra_alcohol1', './barra_alcohol/barra_alcohol/healthbar1.png');
    this.load.image('barra_alcohol2', './barra_alcohol/barra_alcohol/healthbar2.png');
    this.load.image('barra_alcohol3', './barra_alcohol/barra_alcohol/healthbar3.png');
    this.load.image('barra_alcohol4', './barra_alcohol/barra_alcohol/healthbar4.png');
    this.load.image('barra_alcohol4', './barra_alcohol/barra_alcohol/healthbar4.png');
    this.load.image('barra_alcohol5', './barra_alcohol/barra_alcohol/healthbar5.png');
    this.load.image('barra_alcohol6', './barra_alcohol/barra_alcohol/healthbar6.png');
    this.load.image('barra_alcohol7', './barra_alcohol/barra_alcohol/healthbar7.png');
    this.load.image('barra_alcohol8', './barra_alcohol/barra_alcohol/healthbar8.png');
    this.load.image('barra_alcohol9', './barra_alcohol/barra_alcohol/healthbar9.png');
    this.load.image('barra_alcohol10', './barra_alcohol/barra_alcohol/healthbar10_normal.png');
    this.load.image('barra_alcohol11', './barra_alcohol/barra_alcohol/healthbar11.png');
    this.load.image('barra_alcohol12', './barra_alcohol/barra_alcohol/healthbar12.png')
    this.load.image('barra_alcohol13', './barra_alcohol/barra_alcohol/healthbar13.png')
    this.load.image('barra_alcohol14', './barra_alcohol/barra_alcohol/healthbar14.png')
    this.load.image('barra_alcohol15', './barra_alcohol/barra_alcohol/healthbar15_full.png')
    this.load.spritesheet('corrersheet', './sprites/characters/spritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('agacharsesheet', './sprites/characters/spritesheetagacharse.png', { frameWidth: 218, frameHeight: 218 })
    this.load.audio('mainsoundtrack', './sonidos/queviva.mp3');


    this.load.image('city','./sprites/tiles/citytileset.png');
    this.load.image('rowhouse','./sprites/tiles/rowhousetileset.png');
    this.load.image('devil','./sprites/tiles/devil.png');
    this.load.tilemapTiledJSON('block1','./sprites/tiles/block1.json');
  }


  create() {
// -------------------------- ANIMACIONES --------------------------
this.anims.create({
  key: 'correr',
  frames: this.anims.generateFrameNumbers('corrersheet', { start:0, end: 5}),
  frameRate: 7,
  repeat: -1
}); 
this.anims.create({
  key: 'agacharse',
  frames: this.anims.generateFrameNumbers('agacharsesheet', { start:0, end: 8}),
  frameRate: 6,
  repeat: 0
});
this.anims.create({
  key: 'agacharse1',
  frames: this.anims.generateFrameNumbers('agacharsesheet', { start:0, end: 2}),
  frameRate: 6,
  repeat: 0
});
this.anims.create({
  key: 'agacharse2',
  frames: this.anims.generateFrameNumbers('agacharsesheet', { start:3, end: 5}),
  frameRate: 6,
  repeat: 0
});
this.anims.create({
  key: 'agacharse3',
  frames: this.anims.generateFrameNumbers('agacharsesheet', { start:6, end: 8}),
  frameRate: 6,
  repeat: 0
}); 
// ------------------------------------------------------------------
// ---------------------- ELEMENTOS DEL JUEGO -----------------------
    this.fondoimg = this.add.tileSprite(0,0,1400, 800, 'fondo1');
    this.fondoimg.setScale(1.7);
    this.fondoimg.setOrigin(0,0);
    this.fondoimg.setScrollFactor(0);

    //let music = this.sound.add('mainsoundtrack', {loop: true});
    //music.play();

    // this.calimoimg = this.physics.add.sprite(1100,210, 'botellacalimocho');
    // this.calimoimg.setScale(0.04);

    // this.barrilimg = this.physics.add.sprite(1100,300, 'barril');
    // this.barrilimg.setScale(0.15);

    this.worldSpeed = 1;

    this.player = new Player(this, 200,580, this.worldSpeed);
    this.physics.add.collider(this.player, this.plataformasuelo);

    this.guardia = new Guardia(this, 10,565, this.worldSpeed);
    this.physics.add.collider(this.guardia, this.plataformasuelo);
    

    this.cameramain = this.cameras.main;
// ------------------------  MAPA  ---------------------------------

   this.map = this.make.tilemap({ 
      key: 'block1', 
      tileWidth: 32, 
      tileHeight: 32 
    });

    const tileset1 = this.map.addTilesetImage('suelo', 'city'); //1-Como llama al tile en TILES, 2- el nombre del tile en phaser
    const tileset2 = this.map.addTilesetImage('edificios','rowhouse');
    const tileset3 = this.map.addTilesetImage('extra','devil');

    this.groundlayer =  this.map.createStaticLayer('suelo', [tileset1]);

    this.farlayer =  this.map.createStaticLayer('fondo', [tileset3]);

    this.behindlayer =  this.map.createStaticLayer('decorado', [tileset2, tileset3]);
    
    this.behindlayer2 =  this.map.createStaticLayer('decorado2', [tileset1,tileset2,tileset3]);

    this.platformlayer = this.map.createStaticLayer('plataformas', [tileset2, tileset3]);

    this.platformlayer.layer.data.forEach((row) => { // here we are iterating through each tile.
		 	row.forEach((Tile) => {
				
          Tile.collideDown = false;
		 			Tile.collideLeft = false;
          Tile.collideRight = false;
        
		 	})
    });

    
    this.physics.add.collider(this.player, this.platformlayer);
    this.physics.add.collider(this.player, this.groundlayer);
    this.physics.add.collider(this.guardia, this.groundlayer);

    // this.platformlayer.setCollision(false, false, true, false); // left, right, up, down

    this.groundlayer.setCollision(15);
    this.platformlayer.setCollisionBetween(0, 1000);


// ------------------------------------------------------------------
  };

  volverCorrer()
  {
    this.anims.play('correr',true);
  }

  sizeAgachado()
  {
    this.body.setSize(200, 120);
    this.body.setOffset(0, 125);
  }

  sizeLevantado()
  {
    this.body.setSize(150, 220);
    this.body.setOffset(0, 20);
  }

  falsear()
  {
    this.stAgachado = false;
  }


  
  update(time, delta) 
  {
    this.cameramain.scrollX += this.worldSpeed;
    this.fondoimg.tilePositionX = this.cameramain.scrollX * 0.25;
    console.log(this.cameras.main.worldView.x);
    if(this.cameras.main.worldView.x === 2000)
    {
      this.cameramain.scrollX= 0;
      this.player.x = this.player.x - this.guardia.x; //se mantiene la distancia entre el jugador y el guardia
      this.guardia.x = 10;
    }
  }
}