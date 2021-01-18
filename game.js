import player from './player.js';
import guardia from './guardia.js';
import obstaculo from './obstaculo.js';
import barra_alcohol from './barra_alcohol.js';
import agua from './agua.js';
import cerveza from './cerveza.js';
import champan from './champan.js';
import jagger from './jagger.js';
import calimocho from './calimocho.js';
import jarron from './jarron.js';
import obsmov from './obsmov.js';
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
    this.maxpunt = data.int;
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

    //Pausa menu
    this.load.image('menumain', './sprites/pausa/menu_button.png');
    this.load.image('resume', './sprites/pausa/resume_button.png');
    this.load.image('on', './sprites/pausa/sonido_si.png');
    this.load.image('off', './sprites/pausa/sonido_no.png');
    //-----------------
    this.load.image('plataforma', './sprites/background/plataforma.png');
    
    this.load.atlas('alcohol_atlas', './barra_alcohol/barra_alcohol/alcohol.png', './barra_alcohol/barra_alcohol/alcohol_atlas.json');
    this.load.spritesheet('corrersheet', './sprites/characters/spritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('agacharsesheet', './sprites/characters/spritesheetagacharse.png', { frameWidth: 218, frameHeight: 218 })
    this.load.spritesheet('guardiacorrersheet', './sprites/characters/guardiaspritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('spritesheetvolar', './sprites/characters/spritesheetvolar.png', { frameWidth: 170, frameHeight: 234 });
    this.load.audio('mainsoundtrack', './sonidos/queviva.mp3');
    this.load.audio('champanmusic', './sonidos/cancan.mp3');

    this.load.image('city','./sprites/tiles/citytileset.png');
    this.load.image('rowhouse','./sprites/tiles/rowhousetileset.png');
    this.load.image('devil','./sprites/tiles/devil.png');
    this.load.tilemapTiledJSON('block1','./sprites/tiles/block2.json');

    this.load.bitmapFont('font', './imagenes/carrier_command.png','./imagenes/carrier_command.xml');


    this.load.audio('click', './sonidos/menu1.mp3');
  }


  create() {

    this.click = this.sound.add('click', {volume: 0.2});
  //PUNTUACION
    this.vueltas = 1;
    this.points = 0;
    this.text = this.add.bitmapText(900, 10, 'font',this.points,20);
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
    this.fondoimg = this.add.tileSprite(0,-50,1050, 700, 'fondo1');
    this.fondoimg.setScale(1);
    this.fondoimg.setOrigin(0,0);
    this.fondoimg.setScrollFactor(0);

    this.music = this.sound.add('mainsoundtrack', {volume: 0.05}, {loop: true});
    if(this.sonidoactive)
    {
     this.music.play();
    }

    this.sigueJugando = true;
    this.worldSpeed = 2;

    this.player = new player(this, 200, 470, this.worldSpeed);

    this.guardia = new guardia(this, 30, 470, this.worldSpeed);

    this.alcohol = new barra_alcohol(this, 150, 60);

    this.player.body.setCollideWorldBounds(true);
    this.guardia.body.setCollideWorldBounds(true);
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
    this.physics.add.collider(this.guardia, this.platformlayer);

    this.groundlayer.setCollision(15);
    this.groundlayer.setCollision(56);
    this.platformlayer.setCollisionBetween(0, 2000);

    this.platformlayer.layer.data.forEach((row) => { // here we are iterating through each tile.
		 	row.forEach((Tile) => {
				
          Tile.collideDown = false;
		 			Tile.collideLeft = false;
          Tile.collideRight = false;
        
		 	})
    });
   
   this.groundlayer.setScale(0.8);
   this.farlayer.setScale(0.8);
   this.behindlayer.setScale(0.8);
   this.behindlayer2.setScale(0.8);
   this.platformlayer.setScale(0.8);
   
    //this.prueba = new obsmov(this, 2000, 500, "cocheoscuro");


   this.powerups();
   this.objetosfisicos();
   this.objetosestaticos();
   this.triggersGuardia();

// Pause Menu
  this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  
// ------------------------------------------------------------------
  };

  tocarchampan(musica)
  {
    if(this.sonidoactive)
    {
      this.music.pause();
      
      musica.play();
    }
  }

  tocarnormal()
  {
    if(this.sonidoactive)
    {
      this.music.resume();
    }
  }

  volverCorrer()
  {
    this.anims.play('correr',true);
  }

  sizeAgachado()
  {
    this.body.setSize(200, 120);
    this.body.setOffset(0, 100);
  }

  sizeLevantado()
  {
    this.body.setSize(150, 220);
    this.body.setOffset(0, 0);
  }

  falsear()
  {
    this.stAgachado = false;
  }

  rapido()
  {
    this.worldSpeed = 4;
  }

  normal()
  {
    this.worldSpeed = 2;
  }

  powerups()
  {
    for (const objeto of this.map.getObjectLayer('powerup').objects) 
    {
      let value = Phaser.Math.Between(0, 11); //Puede que no salga nada
      if(value == 0)
      {
        this.power = new champan(this,objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value == 1 || value == 5)
      {
        this.power = new agua(this, objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value == 2 || value == 6)
      {
        this.power = new calimocho(this, objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value == 3 || value == 7)
      {
        this.power = new cerveza(this, objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value == 4 || value == 8)
      {
        this.power = new jagger(this, objeto.x- (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
    }
  }

  objetosestaticos()
  {
    for (const objeto of this.map.getObjectLayer('estaticos').objects) 
    {
      if(objeto.name !== "jarron"/* && objeto.name !== "botellavacia"*/)
      {
        this.obs = new obstaculo(this,objeto.x- (objeto.x/5), objeto.y - (objeto.y/4.5), objeto.name);
      }
      else //if (objeto.name === "jarron")
      {
        this.obs = new jarron(this, objeto.x, objeto.y, objeto.name);
      }
     /* else
      {
        this.obs = new obsmov(this, objeto.x, objeto.y,objeto.name);
      }*/
    }
  }

  objetosfisicos()
  {
    //trigger
    for (const objeto of this.map.getObjectLayer('fisicos').objects) { //Por cada objeto de cada tipo creo un objeto vacio a  cierta distancia de el
      if (objeto.name === 'jarron') 
      {
        let collider;
        
        collider = this.physics.add.image(objeto.x - ((objeto.x/4) - 50) ,objeto.y*1.17,'barril');
        
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
      else if (objeto.name === 'coche') {
        let collider = this.physics.add.image(objeto.x- (objeto.x/2) ,350,'barril');
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
      else if (objeto.name === 'cocheoscuro') {
        let collider = this.physics.add.image(objeto.x- (objeto.x/2) ,350,'barril');
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
      else if (objeto.name === 'barriltop') {
        let collider = this.physics.add.image(objeto.x - (objeto.x/2),350,'barril');
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
    if(objeto.name !== "jarron" && objeto.name !== "coche" && objeto.name !== "cocheoscuro" && objeto.name !== "barriltop")
    {
      this.obs = new obstaculo(this, objeto.x-(objeto.x/5), objeto.y-(objeto.y/5), objeto.name);
    }
    else if (objeto.name === "coche" || objeto.name === "cocheoscuro" || objeto.name === "barriltop" )
    {
      this.obs = new obsmov(this, objeto.x-(objeto.x/5), objeto.y-(objeto.y/5), objeto.name);        
    }
    else
    {
      this.obs = new jarron(this, objeto.x-(objeto.x/5), objeto.y-(objeto.y/5), objeto.name);        
    }
    collider.destroy();
  }

  triggersGuardia(){
    for (const objeto of this.map.getObjectLayer('guardia').objects){
      let collider;
      collider = this.physics.add.image(objeto.x*0.8, objeto.y*0.8, 'barril');
      collider.setDepth(-1);
      collider.setScale(1,5);
      collider.body.setAllowGravity(false);
      this.physics.add.overlap(this.guardia, collider, () => 
      {
        this.guardia.saltar();
      });
    }
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

  pause()
  {
 //MENU DE PAUSA
    let resume = this.add.image(this.cameras.main.worldView.x + 525,400, 'resume').setInteractive();
    resume.setScale(0.3);
    resume.setDepth(9);

    let menu = this.add.image(this.cameras.main.worldView.x + 525,200, 'menumain').setInteractive();
    menu.setScale(0.3);
    menu.setDepth(9);

    let sonido;
    if(this.sonidoactive)
    {
      sonido = this.add.image(this.cameras.main.worldView.x + 1000,90, 'on').setInteractive();
    }
    else 
    {
      sonido = this.add.image(this.cameras.main.worldView.x + 1000,90, 'off').setInteractive();
    }
    sonido.setScale(0.17);
    sonido.setDepth(9);

    sonido.on('pointerdown', event => 
      {
        this.sonidoactive = !this.sonidoactive;
        if(this.sonidoactive)//Si se activa el sonido
        {
          this.music.play();
          sonido.setTexture('on');
        }
        else //Si se desactiva
        {
          this.music.stop();
          sonido.setTexture('off');
        }
        sonido.setScale(0.17);
    });

    resume.on('pointerdown', event => {
      resume.destroy();
      menu.destroy();
      sonido.destroy();
      if(this.sonidoactive)
      {
        this.click.play();
      }
      this.sigueJugando = true;
    });

    menu.on('pointerdown', event => {
      resume.destroy();
      menu.destroy();
      sonido.destroy();
      this.music.stop();
      if(this.sonidoactive)
      {
        this.click.play();
      }
      if(this.points > this.maxpunt)
      {
        this.scene.start('menu', {int:this.points, bool:this.sonidoactive});
      }
      else
      {
        this.scene.start('menu', {int:this.maxpunt, bool:this.sonidoactive});
      }
    });


  }

  muerte(razon){
    this.sigueJugando = false;
    this.music.stop();
    if(this.points > this.maxpunt)
      {
        this.scene.start('deadmenu', {int:this.points, bool:this.sonidoactive, causa:razon});
      }
      else
      {
        this.scene.start('deadmenu', {int:this.maxpunt, bool:this.sonidoactive, causa:razon});
      }
      console.log(razon);
  }

  seguimiento_camara(){
    if(this.player.y > 490){
        this.cameramain.y = (489 - this.player.y);
    }
    else if(this.player.y < 412){
        this.cameramain.y = (412 - this.player.y);
    }
    else{
      this.cameramain.y = 0;
    }
  }

  update(time, delta) 
  {
    if (this.sigueJugando)
    {
      this.cameramain.scrollX += this.worldSpeed;
      this.fondoimg.tilePositionX = this.cameramain.scrollX * 0.4;
      this.seguimiento_camara();
      if(this.cameras.main.worldView.x > 27500) //Reseteo level
      {
        this.cameramain.scrollX= 0;
        this.player.x = this.player.x - this.cameras.main.worldView.x; //se mantiene la distancia entre el jugador y el guardia
        this.player.y = 450;
        this.guardia.x = 30;
        this.guardia.y = 450;
        this.physics.world.bounds.setTo(0, 0, 1050, 600);
        this.x = 0;
        this.vueltas++;

        //this.reset();
      }

       //Guardia
       if (this.guardia.body.collideRight){
        this.guardia.saltar();
      }

      this.x += this.worldSpeed;
      this.physics.world.bounds.setTo(this.x, 25, 1050, 600);
      
      if(this.physics.overlap(this.player, this.guardia)) {
        this.muerte(0);
      }


      if(this.enter.isDown)
      {
        console.log('pausa');
        this.sigueJugando = false;
        this.pause();
      }
      this.points++; //Cada pixel 1 punto
      this.puntos();
    }
  }
}
      