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
    this.sonidoactive;
    this.obs;
  }

  init(data)
  {
    this.sonidoactive = data.bool;
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
    this.load.spritesheet('corrersheet', './sprites/characters/spritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('agacharsesheet', './sprites/characters/spritesheetagacharse.png', { frameWidth: 218, frameHeight: 218 })
    this.load.spritesheet('guardiacorrersheet', './sprites/characters/guardiaspritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('spritesheetvolar', './sprites/characters/spritesheetvolar.png', { frameWidth: 170, frameHeight: 234 });
    this.load.audio('mainsoundtrack', './sonidos/queviva.mp3');


    this.load.image('city','./sprites/tiles/citytileset.png');
    this.load.image('rowhouse','./sprites/tiles/rowhousetileset.png');
    this.load.image('devil','./sprites/tiles/devil.png');
    this.load.tilemapTiledJSON('block1','./sprites/tiles/block1.json');

    this.load.bitmapFont('font', './imagenes/carrier_command.png','./imagenes/carrier_command.xml');
  }


  create() {
    this.vueltas = 1;
    this.points = 0;
    this.text = this.add.bitmapText(1200, 10, 'font',this.points,20,10);
    this.text.inputEnabled = true;
    this.text.setDepth(6);
    this.text.setScrollFactor(-0,5);
    this.text.ALIGN_LEFT;

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
    if(this.sonidoactive)
    {
      this.music.play();
    }

    this.sigueJugando = true;
    this.worldSpeed = 2.7;

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
   
   
   
   
   this.powerups();
   this.objetosfisicos();
   this.objetosestaticos();

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

  powerups()
  {
    for (const objeto of this.map.getObjectLayer('powerup').objects) 
    {
      let value = Phaser.Math.Between(0, 11); //Puede que no salga nada
      if(value == 0)
      {
        this.power = new Champan(this,objeto.x, objeto.y);
      }
      else if(value == 1 || value == 5)
      {
        this.power = new Agua(this, objeto.x, objeto.y);
      }
      else if(value == 2 || value == 6)
      {
        this.power = new Calimocho(this, objeto.x, objeto.y);
      }
      else if(value == 3 || value == 7)
      {
        this.power = new Cerveza(this, objeto.x, objeto.y);
      }
      else if(value == 4 || value == 8)
      {
        this.power = new Jagger(this, objeto.x, objeto.y);
      }
      console.log(value);
    }
  }

  objetosestaticos()
  {
    for (const objeto of this.map.getObjectLayer('estaticos').objects) 
    {
      this.obs = new Obstaculo(this, objeto.x, objeto.y, objeto.name, 0, 1);
    }
  }

  objetosfisicos()
  {
    //trigger
    for (const objeto of this.map.getObjectLayer('fisicos').objects) { //Por cada objeto de cada tipo creo un objeto vacio a  cierta distancia de el
      if (objeto.name === 'jarron') 
      {

        let collider = this.physics.add.image(objeto.x-50,500,'barril');
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
      else if (objeto.name === 'coche') {
        let collider = this.physics.add.image(objeto.x-1000,500,'barril');
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
      else if (objeto.name === 'cocheoscuro') {
        let collider = this.physics.add.image(objeto.x + 2000,500,'barril');
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
      else if (objeto.name === 'barriltop') {
        let collider = this.physics.add.image(objeto.x - 1000,500,'barril');
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
   }
  }

  activate(collider, objeto) //Aparece el objeto y destruyo el collider
  {
    this.obs = new Obstaculo(this, objeto.x, objeto.y, objeto.name, 0, 1);
    collider.destroy();
  }

  sigoJugando(){
    return this.sigueJugando;
  }

  puntos()
  {
    this.text.setText(this.points);
  }

  reset()
  {
    this.objetosfisicos();
    this.objetosestaticos();
  }
  update(time, delta) 
  {
    if (this.sigueJugando)
    {
      this.cameramain.scrollX += this.worldSpeed;
      this.fondoimg.tilePositionX = this.cameramain.scrollX * 0.4;
      this.alcohol.x = this.cameramain.scrollX + 150;
      if(this.cameras.main.worldView.x > 6600) //Reseteo level
      {
        this.cameramain.scrollX= 0;
        this.player.x = this.player.x - this.cameras.main.worldView.x; //se mantiene la distancia entre el jugador y el guardia
        console.log(this.player.x);
        this.guardia.x = 30;
        this.physics.world.bounds.setTo(0, 0, 1400, 800);
        this.x = 0;
        this.vueltas++;

        //this.reset();
      }

      
      this.x += this.worldSpeed;
      this.physics.world.bounds.setTo(this.x, 25, 1350, 800);
      
      if(this.physics.overlap(this.player, this.guardia)) {
        //PIERDES
        this.sigueJugando = false;

        //Botones (hay que cambiar los sprites
        let playAgain = this.add.image(this.guardia.x + 316,this.guardia.y - 200, 'botonplaynormal').setInteractive();
        let mainMenu = this.add.image(this.guardia.x + 1170,this.guardia.y - 200, 'sonidoon').setInteractive();

        //PlayAgain:
        playAgain.on('pointerover', event => 
        {
          playAgain = this.add.image(this.guardia.x + 316,this.guardia.y - 200, 'botonplayencima');
        });

        playAgain.on('pointerout', event => 
        {
          playAgain = this.add.image(this.guardia.x + 316,this.guardia.y - 200, 'botonplaynormal');
        });

        playAgain.on('pointerdown', event => {
          this.scene.start('game');
          this.music.stop();
        });

        mainMenu.on('pointerdown', event => {
          this.scene.start('menu',{int:this.points});
          this.music.stop();
        });
      }

      this.puntos();
      this.points++; //Cada pixel 1 punto
    } 
  }
}
      