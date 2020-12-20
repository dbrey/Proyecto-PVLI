import Player from './Player.js';
import Guardia from './guardia.js';
import Obstaculo from './obstaculo.js';

export default class Game extends Phaser.Scene 
{
  constructor() {
    super({ key: "main" });
  }


  preload() {
    this.load.image('botellacalimocho', './sprites/items/calimocho.png');
    this.load.image('fondo1', './sprites/background/fondo_tras_del_todo.png');

    this.load.image('barril', './sprites/obstaculos/barril.png');
    this.load.image('barriltop', './sprites/obstaculos/barriltop.png');
    this.load.image('botellavacia', './sprites/obstaculos/botellavacia.png');
    this.load.image('cocheoscuro', './sprites/obstaculos/cocheoscuro.png');
    this.load.image('coche', './sprites/obstaculos/coche.png');
    this.load.image('jarron', './sprites/obstaculos/jarron.png');

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
    this.fondoimg = this.add.tileSprite(0,-150,1400, 800, 'fondo1');
    this.fondoimg.setScale(1);
    this.fondoimg.setOrigin(0,0);
    this.fondoimg.setScrollFactor(0);

    //let music = this.sound.add('mainsoundtrack', {loop: true});
    //music.play();;

    this.worldSpeed = 5;

    this.player = new Player(this, 200,580, this.worldSpeed);

    this.guardia = new Guardia(this, 10,565, this.worldSpeed);
    
    


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
    
    this.physics.add.collider(this.player, this.platformlayer);
    this.physics.add.collider(this.player, this.groundlayer);
    this.physics.add.collider(this.guardia, this.groundlayer);

    this.groundlayer.setCollision(15);
    this.platformlayer.setCollisionBetween(0, 1000);

    this.platformlayer.layer.data.forEach((row) => { // here we are iterating through each tile.
		 	row.forEach((Tile) => {
				
          Tile.collideDown = false;
		 			Tile.collideLeft = false;
          Tile.collideRight = false;
        
		 	})
    });

    this.colocarobjetosestaticos()
    
    /*this.physics.add.collider(this.obs,this.player, function (obs, player) {
      // Por alguna razon se eliminan los dos objetos??
      player.ralentizar()
      this.obs.destroy();
    })*/
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

  ralentizar(dureza)
  {
    this.player.ralentizar(dureza);
  }

  colocarobjetosestaticos()
  {
    this.obs = new Obstaculo (this, 1500, 400, 'caja', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 1580, 500, 'barril', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 1580, 500, 'barril', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 2000, 500, 'barril', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 2750, 200, 'caja', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 3000, 300, 'barril', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 3250, 200, 'caja', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 3500, 200, 'caja', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 3250, 100, 'caja', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 3800, 100, 'caja', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 4000, 500, 'barril', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 4500, 500, 'barril', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 4700, 500, 'botellavacia', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 5700, 500, 'caja', this.worldSpeed, 30);
    this.obs = new Obstaculo (this, 6000, 300, 'barril', this.worldSpeed, 30);

  }
  colocarobjetosfisicos()
  {
    if(this.player.x >= 1300 && this.player.x <= 1305)
    {
      this.obs = new Obstaculo (this, 1520, 300, 'jarron', this.worldSpeed, 30);
    }

    //JARRONES EDIFICIO 2
    else if(this.player.x >= 1700 && this.player.x <= 1705)
    {
      this.obs = new Obstaculo (this, 1790, 495, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 2050 && this.player.x <= 2055)
    {
      this.obs = new Obstaculo (this, 1950, 495, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 1980 && this.player.x <= 1985)
    {
      this.obs = new Obstaculo (this, 2080, 495, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 2100 && this.player.x <= 2105)
    {
      this.obs = new Obstaculo (this, 2210, 495, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 2160 && this.player.x <= 2165)
    {
      this.obs = new Obstaculo (this, 2370, 495, 'jarron', this.worldSpeed, 30);
    }
    
    //EDIFICIO 3

    else if(this.player.x >= 2000 && this.player.x <= 2005)
    {
      this.obs = new Obstaculo (this, 3100, 580, 'coche', -10, 30);
    }

    //EDIFICIO 4

    else if(this.player.x >= 3630 && this.player.x <= 3635)
    {
      this.obs = new Obstaculo (this, 3760,420, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 3970 && this.player.x <= 3975)
    {
      this.obs = new Obstaculo (this, 4080,420, 'jarron', this.worldSpeed, 30);
      this.obs = new Obstaculo (this, 4080,300, 'jarron', this.worldSpeed, 30);
    }

    //EDIFICIO 5
    else if(this.player.x >= 3700 && this.player.x <= 3705)
    {
      this.obs = new Obstaculo (this, 5000,580, 'barriltop', -10, 30);
    }
    else if(this.player.x >= 4060 && this.player.x <= 4065)
    {
      this.obs = new Obstaculo (this, 4290,480, 'jarron', this.worldSpeed, 30);
    }

    //EDIFICIO 6
    else if(this.player.x >= 4660 && this.player.x <= 4665)
    {
      this.obs = new Obstaculo (this, 4785,460, 'jarron', this.worldSpeed, 30);
    }

    else if(this.player.x >= 4780 && this.player.x <= 4785)
    {
      this.obs = new Obstaculo (this, 4850,460, 'jarron', this.worldSpeed, 30);
    }

    //EDIFICIO 7
    else if(this.player.x >= 4890 && this.player.x <= 4895)
    {
      this.obs = new Obstaculo (this, 5010,370, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 5010 && this.player.x <= 5015)
    {
      this.obs = new Obstaculo (this, 5075,370, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 5060 && this.player.x <= 5065)
    {
      this.obs = new Obstaculo (this, 4085,460, 'cocheoscuro', 100, 30);
    }

    //EDIFICIO 9
    else if(this.player.x >= 5600 && this.player.x <= 5605)
    {
      this.obs = new Obstaculo (this, 5740,460, 'jarron', this.worldSpeed, 30);
    }
    else if(this.player.x >= 5350 && this.player.x <= 5355)
    {
      this.obs = new Obstaculo (this, 6800,460, 'barriltop', -50, 30);
      this.obs = new Obstaculo (this, 7000,460, 'barriltop', -50, 30);
    }
  }


  update(time, delta) 
  {
    this.cameramain.scrollX += this.worldSpeed;
    this.fondoimg.tilePositionX = this.cameramain.scrollX * 0.4;

    if(this.cameras.main.worldView.x === 6600) //Reseteo level
    {
      this.cameramain.scrollX= 0;
      this.player.x = this.player.x - 6600; //se mantiene la distancia entre el jugador y el guardia
      console.log(this.player.x);
      this.guardia.x = 10;
    }
    this.colocarobjetosfisicos()
  }
}
      