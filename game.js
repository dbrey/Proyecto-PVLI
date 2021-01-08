import Player from './Player.js';
import Guardia from './guardia.js';
import Obstaculo from './obstaculo.js';
import Barra_Alcohol from './barra_alcohol.js';
import Agua from './agua.js';
import Cerveza from './cerveza.js';
import Champan from './Champan.js';
import Jagger from './jagger.js';
import Calimocho from './calimocho.js';

export default class Game extends Phaser.Scene 
{
  constructor() {
    super({ key: "game" });
  }


  preload() {
    this.load.image('fondo1', './sprites/background/fondo_tras_del_todo.png');

    this.load.image('calimocho', './sprites/items/calimocho.png');
    this.load.image('botella_agua', './sprites/items/waterbottle.png');
    this.load.image('cerveza', './sprites/items/mugofbeer.png');
    this.load.image('champan', './sprites/items/champancg.png');
    this.load.image('jagger', './sprites/items/jagger.png');

    this.load.image('barril', './sprites/obstaculos/32x32/barril.png');
    this.load.image('caja', './sprites/obstaculos/32x32/caja.png');
    this.load.image('barriltop', './sprites/obstaculos/32x32/barriltop.png');
    this.load.image('botellavacia', './sprites/obstaculos/32x32/botellavacia.png');
    this.load.image('cocheoscuro', './sprites/obstaculos/32x32/cocheoscuro.png');
    this.load.image('coche', './sprites/obstaculos/32x32/coche.png');
    this.load.image('jarron', './sprites/obstaculos/32x32/jarron.png');

    this.load.image('plataforma', './sprites/background/plataforma.png');
    
    this.load.atlas('alcohol_atlas', './barra_alcohol/barra_alcohol/alcohol.png', './barra_alcohol/barra_alcohol/alcohol_atlas.json');
   // this.load.spritesheet('alcoholsheet','./barra_alcohol/barra_alcohol/alcohol_anim.png', { frameWidth: 408, frameHeight: 122 });
    this.load.spritesheet('corrersheet', './sprites/characters/spritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('agacharsesheet', './sprites/characters/spritesheetagacharse.png', { frameWidth: 218, frameHeight: 218 })
    this.load.spritesheet('guardiacorrersheet', './sprites/characters/guardiaspritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('spritesheetvolar', './sprites/characters/spritesheetvolar.png', { frameWidth: 170, frameHeight: 234 });
    this.load.audio('mainsoundtrack', './sonidos/queviva.mp3');


    this.load.image('city','./sprites/tiles/citytileset.png');
    this.load.image('rowhouse','./sprites/tiles/rowhousetileset.png');
    this.load.image('devil','./sprites/tiles/devil.png');
    this.load.tilemapTiledJSON('block1','./sprites/tiles/block1.json');
  }


  create() {
// -------------------------- ANIMACIONES --------------------------
this.anims.create({
  key: 'champan',
  frames: this.anims.generateFrameNumbers('spritesheetvolar', { start: 0, end: 7}),
  frameRate: 7,
  repeat: -1
}); 
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
/*this.anims.create({
  key: 'alcoholismo',
  frames: this.anims.generateFrameNumbers('alcoholsheet', { start:0, end: 14}),
  frameRate: 1,
  repeat: -1
});*/
this.anims.create({
  key: 'guardiacorrer',
  frames: this.anims.generateFrameNumbers('guardiacorrersheet', { start:0, end: 5}),
  frameRate: 7,
  repeat: -1
}); 
// ------------------------------------------------------------------
// ---------------------- ELEMENTOS DEL JUEGO -----------------------
    this.fondoimg = this.add.tileSprite(0,-150,1400, 800, 'fondo1');
    this.fondoimg.setScale(1);
    this.fondoimg.setOrigin(0,0);
    this.fondoimg.setScrollFactor(0);

    this.music = this.sound.add('mainsoundtrack', {volume: 0.05}, {loop: true});
    this.music.play();

    this.sigueJugando = true;
    this.worldSpeed = 1;

    this.player = new Player(this, 200,580, this.worldSpeed);

    this.guardia = new Guardia(this, 30,565, this.worldSpeed);

    this.alcohol = new Barra_Alcohol(this, 100, 70);

    this.player.body.setCollideWorldBounds(true);
    this.x = 0;
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

    const platformCollider = this.physics.add.collider(this.player, this.platformlayer);
    this.physics.add.collider(this.player, this.groundlayer);
    this.physics.add.collider(this.guardia, this.groundlayer);
    this.physics.add.collider(this.player, this.guardia);
    const objest = this.physics.add.collider(this.player, this.objestaticos); 

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

    this.objestaticos.layer.data.forEach((row) => { // here we are iterating through each tile.
      row.forEach((Tile) => {
       
         Tile.collideDown = false;
       
      })
   });
   this.champan = new Champan(this,700,530);
   this.agua = new Agua(this, 5000,550);
   this.calimocho = new Calimocho(this, 1000, 550);
   this.cerveza = new Cerveza(this, 1100, 550);
   this.jagger = new Jagger(this, 1200, 550);
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

  rapido()
  {
    this.worldSpeed = 3;
  }

  normal()
  {
    this.worldSpeed = 1;
  }

  colocarobjetosfisicos()
  {
    if(this.player.x >= 1300 && this.player.x <= 1305)
    {
      this.obs = this.map.createFromObjects('fisicos', 22, {key: 'jarron'});
    }

    //JARRONES EDIFICIO 2
    else if(this.player.x >= 1700 && this.player.x <= 1705)
    {
      this.obs = this.map.createFromObjects('fisicos', 23, {key: 'jarron'});
    }
    else if(this.player.x >= 2050 && this.player.x <= 2055)
    {
      this.obs = this.map.createFromObjects('fisicos', 24, {key: 'jarron'});
    }
    else if(this.player.x >= 1980 && this.player.x <= 1985)
    {
      this.obs = this.map.createFromObjects('fisicos', 25, {key: 'jarron'});
    }
    else if(this.player.x >= 2100 && this.player.x <= 2105)
    {
      this.obs = this.map.createFromObjects('fisicos', 26, {key: 'jarron'});
    }
    else if(this.player.x >= 2160 && this.player.x <= 2165)
    {
      this.obs = this.map.createFromObjects('fisicos', 27, {key: 'jarron'});
    }
    
    //EDIFICIO 3

    else if(this.player.x >= 2000 && this.player.x <= 2005)
    {
      this.obs = this.map.createFromObjects('fisicos', 33, {key: 'coche'});
    }

    //EDIFICIO 4

    else if(this.player.x >= 3630 && this.player.x <= 3635)
    {
      this.obs = this.map.createFromObjects('fisicos', 29, {key: 'jarron'});
    }
    else if(this.player.x >= 3970 && this.player.x <= 3975)
    {
      this.obs = this.map.createFromObjects('fisicos', 31, {key: 'jarron'});
      this.obs = this.map.createFromObjects('fisicos', 32, {key: 'jarron'});
    }

    //EDIFICIO 5
    else if(this.player.x >= 3700 && this.player.x <= 3705)
    {
      this.obs = this.map.createFromObjects('fisicos', 35, {key: 'barriltop'});
    }
    else if(this.player.x >= 4060 && this.player.x <= 4065)
    {
      this.obs = this.map.createFromObjects('fisicos', 36, {key: 'jarron'});
    }

    //EDIFICIO 6
    else if(this.player.x >= 4660 && this.player.x <= 4665)
    {
      this.obs = this.map.createFromObjects('fisicos', 37, {key: 'jarron'});;
    }

    else if(this.player.x >= 4780 && this.player.x <= 4785)
    {
      this.obs = this.map.createFromObjects('fisicos', 38, {key: 'jarron'});
    }

    //EDIFICIO 7
    else if(this.player.x >= 4890 && this.player.x <= 4895)
    {
      this.obs = this.map.createFromObjects('fisicos', 45, {key: 'jarron'});
    }
    else if(this.player.x >= 5010 && this.player.x <= 5015)
    {
      this.obs = this.map.createFromObjects('fisicos', 47, {key: 'jarron'});
    }
    else if(this.player.x >= 5860 && this.player.x <=5865)
    {
      this.obs = this.map.createFromObjects('fisicos', 44, {key: 'cocheoscuro'});
    }

    //EDIFICIO 9
    else if(this.player.x >= 5350 && this.player.x <= 5355)
    {
      this.obs = this.map.createFromObjects('fisicos', 42, {key: 'barriltop'});
    }
  }

  sigoJugando(){
    return this.sigueJugando;
  }

  update(time, delta) 
  {
    if (this.sigueJugando)
    {
      this.cameramain.scrollX += this.worldSpeed;
      this.fondoimg.tilePositionX = this.cameramain.scrollX * 0.4;
      this.alcohol.x = this.cameramain.scrollX + 150;
      if(this.cameras.main.worldView.x === 6600) //Reseteo level
      {
        this.cameramain.scrollX= 0;
        this.player.x = this.player.x - 6600; //se mantiene la distancia entre el jugador y el guardia
        console.log(this.player.x);
        this.guardia.x = 30;
        this.physics.world.bounds.setTo(0, 0, 1400, 800);
        this.x = 0;
      }

      this.colocarobjetosfisicos()
      this.x += this.worldSpeed;
      this.physics.world.bounds.setTo(this.x, 25, 1350, 800);

      if(this.physics.collide(this.player, this.guardia)) {
        //PIERDES
        console.log("TOCADO");
        this.sigueJugando = false;
      }
    } 
  }
}
      