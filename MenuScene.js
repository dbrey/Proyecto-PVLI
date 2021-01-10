export default class MenuScene extends Phaser.Scene 
{
  constructor() {
    super({ key: 'menu' });
  }


  preload() {
    this.load.spritesheet('mainmenu', './sprites/menu_inicial/bar_atlas.png', { frameWidth: 960, frameHeight: 540 });
    this.load.image('botonplaynormal', './sprites/menu_inicial/playnormal.png');
    this.load.image('botonplayencima', './sprites/menu_inicial/playencima.png');

    this.load.image('sonidoon', './sprites/menu_inicial/soundnormal.png');
    this.load.image('sonidooff', './sprites/menu_inicial/soundnegativo.png');

    this.load.atlas('puntmax','./sprites/menu_inicial/numeros.png','./sprites/menu_inicial/numeros_atlas.json');

    this.load.audio('menu', './sonidos/menu.mp3');
  }


  create() {
    this.scene.bringToTop();

    this.music = this.sound.add('menu', {volume: 0.15}, {loop: true});
    this.music.play();

    this.anims.create ({
      key: 'menu',
      frames: this.anims.generateFrameNumbers('mainmenu', { start: 0, end: 30}),
      frameRate: 5,
      repeat: -1
    }); 

    this.fondo = this.add.sprite(700, 400, 'mainmenu');
    this.fondo.anims.play("menu");
    this.fondo.setScale(1.5);
    //boton
    let play = this.add.image(316,154, 'botonplaynormal').setInteractive();
    let sonido = this.add.image(1170,100, 'sonidoon').setInteractive();
    
    sonido.setScale(1.50);
    play.setScale(0.25);
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
      this.scene.start('game');
  });

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


    
    //PUNTUACION MAX

    this.puntuacion = 204863; //por ejemplo

    this.numeros = this.textures.get('puntmax');
    this.frames = this.numeros.getFrameNames();

    this.aux = this.puntuacion;

    this.puntx = 314;
    this.punty = 331;

    while(this.aux > 0)
    {
      this.numero = this.aux%10; //El primero numero que meto
      this.aux = this.aux/10 - this.numero/10;
      
      //Colocarlo
    this.image1 = this.add.image(this.puntx, this.punty, 'puntmax', this.numero);
    this.image1.setDepth(6);
    this.image1.setScale(0.3);
    this.puntx -= 16;
    }
  };
}
      