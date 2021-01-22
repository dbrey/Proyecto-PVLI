export default class menuscene extends Phaser.Scene 
{
  constructor() {
    super({ key: 'menu' });
    this.puntuacion = 0;
  }

  init(data)
  {
    this.puntuacion = data.int;
    this.soundactive = data.bool;
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
    this.load.audio('click', './sonidos/menu1.mp3');
  }


  create() {
    this.scene.bringToTop();

    if(this.puntuacion === undefined)
    {
      this.puntuacion = 0;
    }
    this.music = this.sound.add('menu', {volume: 0.10}, {loop: true});
    this.click = this.sound.add('click', {volume: 0.2});

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

    this.max = this.add.sprite(135, 250, 'record');
    this.max.anims.play("r");
    this.max.setScale(0.13,0.2);
    this.max.setDepth(2);


    this.fondo = this.add.sprite(525, 300, 'mainmenu');
    this.fondo.anims.play("menu");
    this.fondo.setScale(1.1);
    //boton
    let play = this.add.image(220,120, 'botonplaynormal').setInteractive();
    let credits = this.add.image(800,420, 'credit').setInteractive();
    let sonido;
    if(this.soundactive || this.soundactive === undefined)
    {
      sonido = this.add.image(860,90, 'sonidoon').setInteractive();
      this.music.play();
      this.sonidoactivo = true;
    }
    else 
    {
      sonido = this.add.image(860,90, 'sonidooff').setInteractive();
      this.sonidoactivo = false;
    }
    sonido.setScale(1.1);
    play.setScale(0.19);
    credits.setScale(0.4);

      //Acciones sonido
      sonido.on('pointerdown', event => 
      {
        this.sonidoactivo = !this.sonidoactivo;
        if(this.sonidoactivo)//Si se activa el sonido
        {
          
          this.music.play();
          sonido.setTexture('sonidoon');
        }
        else //Si se desactiva
        {
          this.music.stop();
          sonido.setTexture('sonidooff');
        }
        sonido.setScale(1.1);
       
    });

    credits.on('pointerdown', event => 
      {
        if(this.sonidoactivo)
        {
        this.click.play();
      }
        this.music.stop();
        this.scene.start('credits',{int:this.puntuacion, bool:this.sonidoactivo});
    });

    //Acciones play
    play.on('pointerover', event => 
    {
      play = this.add.image(220,120, 'botonplayencima');
      play.setScale(0.19);
    });
    play.on('pointerout', event => 
    {
      play = this.add.image(220,120, 'botonplaynormal');
      play.setScale(0.19);
    });

    play.on('pointerdown', event => {
      if(this.sonidoactivo)
      {
        this.click.play();
      }
      this.music.stop();
      this.scene.start('game', {bool:this.sonidoactivo, int:this.puntuacion});
    });
    //PUNTUACION MAX
    this.numeros = this.textures.get('puntmax');
    this.frames = this.numeros.getFrameNames();
    this.puntx = 245;
    this.punty = 248;
    if(this.puntuacion === 0 ||this.puntuacion === undefined)
    {
      this.image1 = this.add.image(this.puntx, this.punty, 'puntmax', 0);
      this.image1.setDepth(6);
      this.image1.setScale(0.2);
    }
    else{
      this.aux = this.puntuacion
      while(this.aux > 0)
      {
        this.numero = (this.aux%10); //El primero numero que meto
        this.aux = Math.round((this.aux/10)-0.5);

        //Colocarlo
        this.image1 = this.add.image(this.puntx, this.punty, 'puntmax', this.numero);
        this.image1.setDepth(6);
        this.image1.setScale(0.2);
        this.puntx -= 12;
      }
    }

    
    
  };
}
      