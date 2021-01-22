import player from './1player1.js';
import guardia from './guardia.js';
import obstaculo from './obstaculo.js';
import barra_alcohol from './barra_alcohol.js';
import agua from './agua.js';
import cerveza from './cerveza.js';
import champan from './1champan1.js';
import jagger from './jagger.js';
import calimocho from './calimocho.js';
import jarron from './jarron.js';
import obsmov from './obsmov.js';
import coins from './coin.js';
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
    // Power-Ups & Obstaculos
    this.load.image('calimocho', './sprites/items/calimocho.png');
    this.load.image('botella_agua', './sprites/items/waterbottle.png');
    this.load.image('cerveza', './sprites/items/mugofbeer.png');
    this.load.image('champan', './sprites/items/champancg.png');
    this.load.image('jagger', './sprites/items/jagger.png');
    this.load.spritesheet('coinsheet', './sprites/items/coin.png', { frameWidth: 16, frameHeight: 16 });

    this.load.image('barril', './sprites/obstaculos/32x32/barril.png');
    this.load.image('caja', './sprites/obstaculos/32x32/caja.png');
    this.load.image('barriltop', './sprites/obstaculos/32x32/barriltop.png');
    this.load.image('botellavacia', './sprites/obstaculos/32x32/botellavacia.png');
    this.load.image('cocheoscuro', './sprites/obstaculos/32x32/cocheoscuro.png');
    this.load.image('coche', './sprites/obstaculos/32x32/coche.png');
    this.load.image('jarron', './sprites/obstaculos/32x32/jarron.png');
    //-----------------

    //Pausa menu
    this.load.image('menumain', './sprites/pausa/menu_button.png');
    this.load.image('resume', './sprites/pausa/resume_button.png');
    this.load.image('on', './sprites/pausa/sonido_si.png');
    this.load.image('off', './sprites/pausa/sonido_no.png');
    this.load.image('control', './sprites/pausa/tutorial_pausa.png');
    //-----------------
    // Escenario
    this.load.image('plataforma', './sprites/background/plataforma.png');
    this.load.image('fondo1', './sprites/background/fondo_tras_del_todo.png');
    this.load.atlas('alcohol_atlas', './barra_alcohol/barra_alcohol/alcohol.png', './barra_alcohol/barra_alcohol/alcohol_atlas.json');
    this.load.spritesheet('corrersheet', './sprites/characters/spritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('agacharsesheet', './sprites/characters/spritesheetagacharse.png', { frameWidth: 218, frameHeight: 218 })
    this.load.spritesheet('guardiacorrersheet', './sprites/characters/guardiaspritesheetcorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.spritesheet('spritesheetvolar', './sprites/characters/spritesheetvolar.png', { frameWidth: 170, frameHeight: 234 });
    this.load.image('city','./sprites/tiles/citytileset.png');
    this.load.image('rowhouse','./sprites/tiles/rowhousetileset.png');
    this.load.image('devil','./sprites/tiles/devil.png');
    this.load.tilemapTiledJSON('block1','./sprites/tiles/block2.json');
    //-----------------

    // Sonidos & Banda sonora
    this.load.audio('mainsoundtrack', './sonidos/queviva.mp3');
    this.load.audio('champanmusic', './sonidos/cancan.mp3');
    this.load.audio('coinmusic', './sonidos/moneda.mp3');
    this.load.audio('powup', './sonidos/powerup.mp3');
    this.load.audio('jmp', './sonidos/jump.mp3');
    this.load.audio('cr', './sonidos/crash.mp3');
    this.load.audio('choq', './sonidos/chocar.mp3');
    this.load.audio('click', './sonidos/menu1.mp3');
    //-----------------
    // Otros
    this.load.bitmapFont('font', './imagenes/carrier_command.png','./imagenes/carrier_command.xml');
  }


  create() {
    
    this.click = this.sound.add('click', {volume: 0.2});
  //PUNTUACION
    this.vueltas = 1;
    this.points = 0;
    this.text = this.add.bitmapText(900, 10, 'font',this.points,20);
    this.text.inputEnabled = true;
    this.text.setDepth(6);
    this.text.setScrollFactor(0);
    this.text.ALIGN_LEFT;

// -------------------------- ANIMACIONES --------------------------
this.anims.create({
  key: 'coin',
  frames: this.anims.generateFrameNumbers('coinsheet', { start: 0, end: 5}),
  frameRate: 12,
  repeat: -1
}); 
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

this.anims.create({
  key: 'guardiacorrer',
  frames: this.anims.generateFrameNumbers('guardiacorrersheet', { start:0, end: 5}),
  frameRate: 7,
  repeat: -1
}); 
// ------------------------------------------------------------------
// ---------------------- ELEMENTOS DEL JUEGO -----------------------
    this.fondoimg = this.add.tileSprite(0,-150,1050, 700, 'fondo1');
    this.fondoimg.setScale(1);
    this.fondoimg.setOrigin(0,0);
    this.fondoimg.setScrollFactor(0);

    this.music = this.sound.add('mainsoundtrack', {volume: 0.05}, {loop: true});
    if(this.sonidoactive)
    {
     this.music.play();
    }
    this.crashsound = this.sound.add('cr', {volume: 0.1}, {loop: false});

    this.sigueJugando = true;
    this.worldSpeed = 3.25;

    this.guardia = new guardia(this, 30, 470, this.worldSpeed);

    this.alcohol = new barra_alcohol(this, 150, 60);

    this.player = new player(this, 200, 470, this.worldSpeed);

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

    this.platformlayer.layer.data.forEach((row) => { 
		 	row.forEach((Tile) => {
				
          Tile.collideDown = false;
		 			Tile.collideLeft = false;
          Tile.collideRight = false;
        
		 	})
    });
   
   // Escalamos todos los layer
   this.groundlayer.setScale(0.8);
   this.farlayer.setScale(0.8);
   this.behindlayer.setScale(0.8);
   this.behindlayer2.setScale(0.8);
   this.platformlayer.setScale(0.8);
   
   this.vel = 1;

   this.prueba = new champan (this,700, 400);

   this.powerups();
   this.objetosfisicos();
   this.objetosestaticos();
   this.crearmonedas();
   this.triggersGuardia();

   

// Pause Menu
  this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
// ------------------------------------------------------------------
  };

  tocarnormal()
  {
    // Si el sonido esta activado y sigue jugando, entonces volvemos a tocar la cancion normal
    if(this.sonidoactive && this.sigueJugando)
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
    // Adaptamos la hitbox del personaje cuando se agacha
    this.body.setSize(200, 120);
    this.body.setOffset(0, 100);
  }

  sizeLevantado()
  {
    // Devolvemos la hitbox al personaje
    this.body.setSize(150, 220);
    this.body.setOffset(0, 0);
  }

  falsear()
  {
    this.stAgachado = false;
  }

  rapido() //ademas de cambiar la velocidad crea las monedas en el aire
  {
    this.worldSpeed = this.worldSpeed * 1.3;

    this.n = 0;
    this.monedax = this.player.x + 500;

    while(this.n < 120) //creamos 40 monedas en el aire
    {
      let value = Phaser.Math.Between(0, 2); //Puede que no salga nada
      this.monedax += 20;

      if(value === 0) // arriba medio abajo
      {
        this.coin = new coins(this, this.monedax,30,this.sonidoactive);
      }
      else if( value === 1) //arriba medio abajo
      {
        this.coin = new coins(this, this.monedax,60,this.sonidoactive);
      }
      else
      {
        this.coin = new coins(this, this.monedax,90,this.sonidoactive);
      }
      if(this.n%20 === 0)
      {
        this.monedax += 200;
      }
      this.n++;
    }
  }

  moneda()
  {
    this.points += 100;
  }

  normal()
  {
    this.worldSpeed = this.worldSpeed / 1.3;
  }


  powerups()
  {
    // Se escoge un powrup al azar, y puede que no salga nada
    for (const objeto of this.map.getObjectLayer('powerup').objects) 
    {
      let value = Phaser.Math.Between(0, 11); //Puede que no salga nada
      if(value === 0 || value === 11)
      {
        this.power = new champan(this,objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value === 1 || value === 5)
      {
        this.power = new agua(this, objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value === 2 || value === 6)
      {
        this.power = new calimocho(this, objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value === 3 || value === 7)
      {
        this.power = new cerveza(this, objeto.x - (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
      else if(value === 4 || value === 8)
      {
        this.power = new jagger(this, objeto.x- (objeto.x/5), objeto.y - (objeto.y/4.5));
      }
    }
  }

  crearmonedas()
  {

    for (const objeto of this.map.getObjectLayer('monedas').objects) 
    {
    
    this.n = 0;
    this.monedax = objeto.x*0.8;

    while(this.n < 5) 
    {
      this.coin = new coins(this, this.monedax, objeto.y*0.8, this.sonidoactive);

      this.monedax += 20;
      this.n++;
    }
    }
  }

  objetosestaticos()
  {
    // Por cada objeto estatico que hay 
    for (const objeto of this.map.getObjectLayer('estaticos').objects) 
    {      
      this.obs = new obstaculo(this,objeto.x- (objeto.x/5), objeto.y - (objeto.y/4.5), objeto.name);
    }
  }

  objetosfisicos()
  {
    //trigger
    for (const objeto of this.map.getObjectLayer('fisicos').objects) { //Por cada objeto de cada tipo creo un objeto vacio a  cierta distancia de el
      let value = Phaser.Math.Between(0, 4); //Puede que no salga nada
      
      // Generamos un jarron
      if (value != 3 && objeto.name === 'jarron') 
      {
        let collider;
        
        collider = this.physics.add.image(objeto.x-(objeto.x/5) - 50,objeto.y*1.17,'barril'); 
        
        collider.setDepth(-1);
        collider.setScale(1,10);
        collider.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, collider, () => 
        {
          this.activate(collider, objeto)
        })
      }
      // Generamos un coche
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
      // Generamos un coche oscuro
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
      //Generamos un barril en movimiento
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
    // Generamos un trigger para que cuando el guardia lo toque, este salte ciertas zonas
    for (const objeto of this.map.getObjectLayer('guardia').objects){
      let collider;
      collider = this.physics.add.image(objeto.x*0.8-this.vel*5, objeto.y*0.8, 'barril');
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
    this.crearmonedas();
  }

   //MENU DE PAUSA
  pause()
  {
    this.physics.pause();

    // Boton para continuar
    let resume = this.add.image(this.cameras.main.worldView.x + 300,200, 'resume').setInteractive();
    resume.setScale(0.3);
    resume.setDepth(10);

    // Boton para volver al menu
    let menu = this.add.image(this.cameras.main.worldView.x + 300,400, 'menumain').setInteractive();
    menu.setScale(0.3);
    menu.setDepth(10);

    // Boton para mostrar los controles
    this.imgcontroles = this.add.image(this.cameras.main.worldView.x + 750,300, 'control');
    this.imgcontroles.setScale(0.6);
    this.imgcontroles.setDepth(10);

    let sonido;
    // Dependiendo si el sonido esta activado o no, cambiamos a la imagen correspondiente
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

    // Activa o desactiva el sonido
    sonido.on('pointerdown', event => 
      {
        this.sonidoactive = !this.sonidoactive;
        if(this.sonidoactive)//Si se activa el sonido
        {
          if(this.player.mov)
          {
            this.music.play();
          }
          else
          {
            this.player.champmusic.resume();
          }
          sonido.setTexture('on');
        }
        else //Si se desactiva
        {
          this.music.stop();
          this.player.champmusic.pause();
          sonido.setTexture('off');
        }
        sonido.setScale(0.17);
    });

    // Continua la partida
    resume.on('pointerdown', event => {
      resume.destroy();
      menu.destroy();
      this.imgcontroles.destroy();
      sonido.destroy();
      if(this.sonidoactive)
      {
        this.click.play();
      }
      this.sigueJugando = true;
      this.physics.resume();
    });

    // Vuelve al menu
    menu.on('pointerdown', event => {
      resume.destroy();
      menu.destroy();
      this.imgcontroles.destroy();
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
    if(this.sonidoactive)
    {
      this.crashsound.play();
    }

    if(this.points > this.maxpunt)
      {
        this.scene.start('deadmenu', {int:this.points, bool:this.sonidoactive, causa:razon, puntos:this.points});
      }
      else
      {
        this.scene.start('deadmenu', {int:this.maxpunt, bool:this.sonidoactive, causa:razon, puntos:this.points});
      }
  }

  seguimiento_camara(){
    if(this.player.y > 490){
      this.cameramain.scrollY = (this.player.y -489);
    }
    else{
      this.cameramain.scrollY = 0;
    }
  }

  update(time, delta) 
  {
    if (this.sigueJugando)
    {
      this.cameramain.scrollX += this.worldSpeed;
      this.fondoimg.tilePositionX = this.cameramain.scrollX * 0.4;
      this.seguimiento_camara();
      if(this.cameras.main.worldView.x > 43500) //Reseteo level 
      {
        this.cameramain.scrollX= 0;
        this.player.x = this.player.x - this.cameras.main.worldView.x; //se mantiene la distancia entre el jugador y el guardia
        this.player.y = 450;
        this.guardia.x = 30;
        this.guardia.y = 450;
        this.physics.world.bounds.setTo(0, 0, 1050, 600);
        this.x = 0;
        this.vueltas++;
        
        this.reset();
      }

       //Guardia
       if (this.guardia.body.collideRight){
        this.guardia.saltar();
      }
      this.x += this.worldSpeed;
      this.physics.world.bounds.setTo(this.x, 25, 1050, 800);
      
      if(this.physics.overlap(this.player, this.guardia)) {
        this.muerte(0);
      }

      // Pausa el juego
      if(this.enter.isDown)
      {
        this.sigueJugando = false;
        this.pause();
      }

      // Si sobrepasa cierta puntuacion, entonces aceleramos el juego
      if (10000 * this.vel < this.points)
      {
        this.vel++;
        this.player.limitspeed += 200;
        this.worldSpeed += 0.25;
        this.guardia.setWorldSpeed(this.worldSpeed);
      }
      this.points += this.vel;
      this.puntos();
    }
  }
}
      