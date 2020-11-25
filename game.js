export default class Game extends Phaser.Scene 
{
  constructor() {
    super({ key: "main" });
  }
    

  
  preload() {
    /*this.load.image('animAgacharse', 'sprites/Agacharse.gif')
    this.load.image('animCorrer', 'sprites/Correr.gif')*/
    this.load.image('botellaCalimocho', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Items/Calimocho.png');
    this.load.image('fondo1', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Background/Fondo_tras_del_todo.png');
    this.load.image('barril', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Obstáculos/Barril.png');
    this.load.image('plataforma', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Background/Plataforma.png');
    this.load.spritesheet('playerSheet', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Characters/SpritesheetCorrer.png', { frameWidth: 161, frameHeight: 216 });
    // CAMBIAR VALORES DEL SPRITESHEET
    //El 4 y el 37 son las dimensiones de cada frame por separado (4x37), y el 234 es la CANTIDAD de frames que hay en el spriteSheet
    
    //this.load.image('botellaChampan', 'sprites/Champan CG.png');
  }


  create() {

    // this.v = scene.input.keyboard.addKey('V');
    // this.v.on('down', event => {El cambio de velocidad}) 
    var fondoImg = this.add.sprite(700, 400, 'fondo1');
    fondoImg.setScale(1.7);
    var calimoImg = this.add.sprite(1100,210, 'botellaCalimocho');
    calimoImg.setScale(0.04);
    var barrilImg = this.add.sprite(1100,300, 'barril');
    barrilImg.setScale(0.15);


    var plataformaSuelo;

    plataformaSuelo = this.physics.add.staticGroup();

    plataformaSuelo.create(100,430, 'plataforma');
    plataformaSuelo.create(400,430, 'plataforma');
    plataformaSuelo.create(700,430, 'plataforma');
    plataformaSuelo.create(1000,430, 'plataforma');


    /*var playerRun = this.add.sprite(200,300, 'player');
    playerRun.setScale(0.3); //CAMBIAR esta escala si veis que el personaje está muy grande o pequeño
    playerRun.animations.add('playerRunAnim');
    sprite.animations.play('playerRunAnim', 50, true);*/
    var player;

    // player.body.setGravityY(300);

    // this.physics.add.collider(player, platforms);

    player = this.physics.add.sprite(180,300, 'playerSheet');

    player.setCollideWorldBounds(true);

    

    player.setScale(0.5);
    this.scene.anims.create({
      key: 'correrAnim',
      frames: this.scene.anims.generateFrameNumbers('playerSheet'),
      frameRate: 6,
      repeat: -1
    });
    this.correr.play("correrAnim");
    //NO SÉ QUE SIGNIFICA ESE 50, INTUYO (solo intuyo) que es la velocidad de la animacion. Pero ni idea.
    //Ah y el true tampoco sé que es. Intuyo que si en el futuro se cambia a false, la animación se para. Pero eso, ni idea.


    //this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });
    /*this.add.sprite(300, 200, 'animAgacharse');
    this.add.sprite(300, 200, 'animCorrer');*/
    //this.add.sprite(100,50,'botellaChampan');

    cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) 
  {
    if (cursors.left.isDown)
    {
     player.setVelocityX(-160);
    }
  }
}
