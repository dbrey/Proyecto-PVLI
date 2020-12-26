import Player from './Player.js';
import Guardia from './guardia.js';
import Obstaculo from './obstaculo.js';
import Barra_Alcohol from './barra_alcohol.js';
import Agua from './agua.js';
import Cerveza from './cerveza.js';

export default class Game extends Phaser.Scene 
{
  constructor() {
    super({ key: "main" });
  }


  preload() {
    this.load.image('fondo1', './sprites/background/fondo_tras_del_todo.png');

    this.load.image('botellacalimocho', './sprites/items/calimocho.png');
    this.load.image('botella_agua', './sprites/items/waterbottle.png');
    this.load.image('cerveza', './sprites/items/mugofbeer.png');

    this.load.image('barril', './sprites/obstaculos/32x32/barril.png');
    this.load.image('caja', './sprites/obstaculos/32x32/caja.png');
    this.load.image('barriltop', './sprites/obstaculos/32x32/barriltop.png');
    this.load.image('botellavacia', './sprites/obstaculos/32x32/botellavacia.png');
    this.load.image('cocheoscuro', './sprites/obstaculos/32x32/cocheoscuro.png');
    this.load.image('coche', './sprites/obstaculos/32x32/coche.png');
    this.load.image('jarron', './sprites/obstaculos/32x32/jarron.png');

    this.load.image('plataforma', './sprites/background/plataforma.png');
    this.load.image('guardia', './sprites/characters/guardia.png');
    
    this.load.atlas('alcohol_atlas', './barra_alcohol/barra_alcohol/alcohol.png', './barra_alcohol/barra_alcohol/alcohol_atlas.json');
    this.load.spritesheet('alcoholsheet','./barra_alcohol/barra_alcohol/alcohol_anim.png', { frameWidth: 408, frameHeight: 122 });
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
this.anims.create({
  key: 'alcoholismo',
  frames: this.anims.generateFrameNumbers('alcoholsheet', { start:0, end: 14}),
  frameRate: 1,
  repeat: -1
});
// ------------------------------------------------------------------
// ---------------------- ELEMENTOS DEL JUEGO -----------------------
    this.fondoimg = this.add.tileSprite(0,-150,1400, 800, 'fondo1');
    this.fondoimg.setScale(1);
    this.fondoimg.setOrigin(0,0);
    this.fondoimg.setScrollFactor(0);

    this.music = this.sound.add('mainsoundtrack', {loop: true});
    this.music.play();

    this.worldSpeed = 1;

    this.player = new Player(this, 200,580, this.worldSpeed);

    this.guardia = new Guardia(this, 10,565, this.worldSpeed);

    this.alcohol = new Barra_Alcohol(this, 100, 70);

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
    const tileset4 = this.map.addTilesetImage('barril','barril');
    const tileset5 = this.map.addTilesetImage('caja','caja');
    const tileset6 = this.map.addTilesetImage('botellavacia','botellavacia');

    this.groundlayer =  this.map.createStaticLayer('suelo', [tileset1]);

    this.farlayer =  this.map.createStaticLayer('fondo', [tileset3]);

    this.behindlayer =  this.map.createStaticLayer('decorado', [tileset2, tileset3]);
    
    this.behindlayer2 =  this.map.createStaticLayer('decorado2', [tileset1,tileset2,tileset3]);

    this.platformlayer = this.map.createStaticLayer('plataformas', [tileset2, tileset3]);
    
    this.objestaticos =  this.map.createStaticLayer('objestaticos', [tileset6,tileset5,tileset4]);

    this.physics.add.collider(this.player, this.platformlayer);
    this.physics.add.collider(this.player, this.groundlayer);
    this.physics.add.collider(this.guardia, this.groundlayer);
    this.physics.add.collider(this.player, this.objestaticos);

    this.groundlayer.setCollision(15);
    this.platformlayer.setCollisionBetween(0, 1000);
    this.objestaticos.setCollisionBetween(0, 1000);

    this.platformlayer.layer.data.forEach((row) => { // here we are iterating through each tile.
		 	row.forEach((Tile) => {
				
          Tile.collideDown = false;
		 			Tile.collideLeft = false;
          Tile.collideRight = false;
        
		 	})
    });

    this.platformlayer.layer.data.forEach((row) => { // here we are iterating through each tile.
      row.forEach((Tile) => {
       
         Tile.collideDown = false;
       
      })
   });

    this.obstac = new Obstaculo (this, 1500, 580, 'barriltop', 200, 30);

    //this.colocarobjetosestaticos();
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

  
  colocarobjetosestaticos()
  {
    new Obstaculo (this, 1500, 400, 'caja', 0, 400);
    new Obstaculo (this, 2000, 500, 'barril', 0, 400);
    new Obstaculo (this, 2750, 200, 'caja', 0, 400);
    new Obstaculo (this, 3000, 300, 'barril', 0, 400);
    new Obstaculo (this, 3250, 200, 'caja', 0, 400);
    new Obstaculo (this, 3500, 200, 'caja', 0, 400);
    new Obstaculo (this, 3250, 100, 'caja', 0, 400);
    new Obstaculo (this, 3800, 100, 'caja', 0, 400);
    new Obstaculo (this, 4000, 500, 'barril', 0, 400);
    new Obstaculo (this, 4500, 500, 'barril', 0, 400);
    //new Obstaculo (this, 4700, 500, 'botellavacia', 0, 100);
    new Obstaculo (this, 5700, 500, 'caja', 0, 400);
    new Obstaculo (this, 6000, 300, 'barril', 0, 400);
    new Agua(this, 5000,550);
    new Cerveza(this, 3400, 550);
    new Cerveza(this, 4000, 550);
    

  }
  colocarobjetosfisicos()
  {
    if(this.player.x >= 1300 && this.player.x <= 1305)
    {
      new Obstaculo (this, 1520, 300, 'jarron', 0, 200);
    }

    //JARRONES EDIFICIO 2
    else if(this.player.x >= 1700 && this.player.x <= 1705)
    {
      new Obstaculo (this, 1790, 495, 'jarron', 0, 200);
    }
    else if(this.player.x >= 2050 && this.player.x <= 2055)
    {
      new Obstaculo (this, 1950, 495, 'jarron', 0, 200);
    }
    else if(this.player.x >= 1980 && this.player.x <= 1985)
    {
      new Obstaculo (this, 2080, 495, 'jarron', 0, 200);
    }
    else if(this.player.x >= 2100 && this.player.x <= 2105)
    {
      new Obstaculo (this, 2210, 495, 'jarron', 0, 200);
    }
    else if(this.player.x >= 2160 && this.player.x <= 2165)
    {
      new Obstaculo (this, 2370, 495, 'jarron', 0, 200);
    }
    
    //EDIFICIO 3

    else if(this.player.x >= 2000 && this.player.x <= 2005)
    {
      new Obstaculo (this, 3100, 580, 'coche', 400, 200);
    }

    //EDIFICIO 4

    else if(this.player.x >= 3630 && this.player.x <= 3635)
    {
      new Obstaculo (this, 3760,420, 'jarron', this.worldSpeed, 200);
    }
    else if(this.player.x >= 3970 && this.player.x <= 3975)
    {
      new Obstaculo (this, 4080,420, 'jarron', this.worldSpeed, 200);
      new Obstaculo (this, 4080,300, 'jarron', this.worldSpeed, 200);
    }

    //EDIFICIO 5
    else if(this.player.x >= 3700 && this.player.x <= 3705)
    {
      new Obstaculo (this, 5000,580, 'barriltop', 200, 200);
    }
    else if(this.player.x >= 4060 && this.player.x <= 4065)
    {
      new Obstaculo (this, 4290,480, 'jarron', this.worldSpeed, 200);
    }

    //EDIFICIO 6
    else if(this.player.x >= 4660 && this.player.x <= 4665)
    {
      new Obstaculo (this, 4785,460, 'jarron', this.worldSpeed, 200);
    }

    else if(this.player.x >= 4780 && this.player.x <= 4785)
    {
      new Obstaculo (this, 4850,460, 'jarron', this.worldSpeed, 200);
    }

    //EDIFICIO 7
    else if(this.player.x >= 4890 && this.player.x <= 4895)
    {
      new Obstaculo (this, 5010,370, 'jarron', this.worldSpeed, 200);
    }
    else if(this.player.x >= 5010 && this.player.x <= 5015)
    {
      new Obstaculo (this, 5075,370, 'jarron', this.worldSpeed, 200);
    }
    else if(this.player.x >= 5060 && this.player.x <= 5065)
    {
      new Obstaculo (this, 4085,460, 'cocheoscuro', 400, 200);
    }

    //EDIFICIO 9
    else if(this.player.x >= 5600 && this.player.x <= 5605)
    {
      new Obstaculo (this, 5740,460, 'jarron', 0, 200);
    }
    else if(this.player.x >= 5350 && this.player.x <= 5355)
    {
      new Obstaculo (this, 6800,460, 'barriltop', 200, 400);
      new Obstaculo (this, 7000,460, 'barriltop', 200, 400);
    }
  }

  update(time, delta) 
  {
    this.cameramain.scrollX += this.worldSpeed;
    this.fondoimg.tilePositionX = this.cameramain.scrollX * 0.4;
    this.alcohol.x = this.cameramain.scrollX + 150;
    if(this.cameras.main.worldView.x === 6600) //Reseteo level
    {
      this.cameramain.scrollX= 0;
      this.player.x = this.player.x - 6600; //se mantiene la distancia entre el jugador y el guardia
      console.log(this.player.x);
      this.guardia.x = 10;
    }
    //this.colocarobjetosfisicos()
  }
}
      