export default class MenuScene extends Phaser.Scene 
{
  constructor() {
    super({ key: 'menu' });
    this.puntuacion = 0;
  }

  init(data)
  {
    this.puntuacion = data.int;
  }

  preload() {
    this.load.spritesheet('mainmenu', './sprites/menu_inicial/bar_atlas.png', { frameWidth: 960, frameHeight: 540 });
    this.load.spritesheet('record', './sprites/menu_inicial/record_anim.png', { frameWidth: 536, frameHeight: 43 });


    this.load.image('botonplaynormal', './sprites/menu_inicial/playnormal.png');
    this.load.image('botonplayencima', './sprites/menu_inicial/playencima.png');

    this.load.image('sonidoon', './sprites/menu_inicial/soundnormal.png');
    this.load.image('sonidooff', './sprites/menu_inicial/soundnegativo.png');

    this.load.image('credit', './sprites/menu_inicial/credits_postit.png');
    
    this.load.atlas('puntmax','./sprites/menu_inicial/numeros.png','./sprites/menu_inicial/numeros_atlas.json');

    this.load.audio('menu', './sonidos/menu.mp3');
  }


  create() {
    this.scene.bringToTop();

    if(this.puntuacion === undefined)
    {
      this.puntuacion = 0;
    }
    this.music = this.sound.add('menu', {volume: 0.15}, {loop: true});
    this.music.play();

    this.anims.create ({
      key: 'menu',
      frames: this.anims.generateFrameNumbers('mainmenu', { start: 0, end: 30}),
      frameRate: 5,
      repeat: -1
    }); 

    this.anims.create ({
      key: 'r',
      frames: this.anims.generateFrameNumbers('record', { start: 0, end: 7}),
      frameRate: 5,
      repeat: -1
    }); 

    this.max = this.add.sprite(160, 330, 'record');
    this.max.anims.play("r");
    this.max.setScale(0.2,0.3);
    this.max.setDepth(2);


    this.fondo = this.add.sprite(700, 400, 'mainmenu');
    this.fondo.anims.play("menu");
    this.fondo.setScale(1.5);
    //boton
    let play = this.add.image(316,154, 'botonplaynormal').setInteractive();
    let sonido = this.add.image(1170,100, 'sonidoon').setInteractive();
    let credits = this.add.image(1080,560, 'credit').setInteractive();


    sonido.setScale(1.50);
    play.setScale(0.25);
    credits.setScale(0.5);
    this.sonidoactivo = true;

      //Acciones sonido
      sonido.on('pointerdown', event => 
      {
        this.sonidoactivo = !this.sonidoactivo;
        if(this.sonidoactivo)//Si se activa el sonido
        {
          this.music.play();
          sonido = this.add.image(1170,100, 'sonidoon');
        }
        else //Si se desactiva
        {
          this.music.stop();
          sonido = this.add.image(1170,100, 'sonidooff');
        }
        sonido.setScale(1.50);
    });

    credits.on('pointerdown', event => 
      {
        this.music.stop();
        this.scene.start('credits',this.puntuacion);
    });

    //Acciones play
    play.on('pointerover', event => 
    {
      play = this.add.image(316,154, 'botonplayencima');
      play.setScale(0.25);
    });
    play.on('pointerout', event => 
    {
      play = this.add.image(316,154, 'botonplaynormal');
      play.setScale(0.25);
    });

    play.on('pointerdown', event => {
      this.music.stop();
      this.scene.start('game', {bool:this.sonidoactivo});
  });
    //PUNTUACION MAX

    this.numeros = this.textures.get('puntmax');
    this.frames = this.numeros.getFrameNames();
    this.puntx = 314;
    this.punty = 331;
    if(this.puntuacion === 0)
    {
      this.image1 = this.add.image(this.puntx, this.punty, 'puntmax', this.puntuacion);
      this.image1.setDepth(6);
      this.image1.setScale(0.3);
    }
    else{
      while(this.puntuacion > 0)
      {
        this.numero = this.puntuacion%10; //El primero numero que meto
        this.puntuacion = this.puntuacion/10 - this.puntuacion/10;
        
        //Colocarlo
      this.image1 = this.add.image(this.puntx, this.punty, 'puntmax', this.numero);
      this.image1.setDepth(6);
      this.image1.setScale(0.3);
      this.puntx -= 16;
      }
    }

    
    
  };
}
      