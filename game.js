export default class Game extends Phaser.Scene 
{
  constructor() {
    super({ key: "main" });
  }


  preload() {
    this.load.image('animAgacharse', 'sprites/Agacharse.gif')
    this.load.image('animCorrer', 'sprites/Correr.gif')
    this.load.image('botellaCalimocho', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Items/Calimocho.png');
    this.load.image('fondo1', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Background/Fondo_tras_del_todo.png');
    this.load.image('barril', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Obstáculos/Barril.png');
    this.load.image('plataforma', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Background/Plataforma.png');
    this.load.spritesheet('playerSheet', 'sprites/characters/spritesheetCorrer.png', { frameWidth: 161, frameHeight: 216 });
    this.load.audio('mainSoundtrack', 'https://dbrey.github.io/Proyecto-PVLI/Sonidos - música/Queviva.mp3');
    // CAMBIAR VALORES DEL SPRITESHEET
    //El 4 y el 37 son las dimensiones de cada frame por separado (4x37), y el 234 es la CANTIDAD de frames que hay en el spriteSheet

    //this.load.image('botellaChampan', 'sprites/Champan CG.png');

    // Mayusculas, ñ , tildes, espacios no
  }


  create() {

    // this.v = scene.input.keyboard.addKey('V');
    // this.v.on('down', event => {El cambio de velocidad}) 
    var fondoImg = this.add.sprite(700, 400, 'fondo1');
    fondoImg.setScale(1.7);

    let music = this.sound.add('mainSoundtrack', {loop: true});
    music.play();
    var calimoImg = this.physics.add.sprite(1100,210, 'botellaCalimocho');
    calimoImg.setScale(0.04);
    var barrilImg = this.physics.add.sprite(1100,300, 'barril');
    barrilImg.setScale(0.15);


    //this.physics.add.overlap(player, barrilImg, collectCali, null, this);

    var plataformaSuelo;

    plataformaSuelo = this.physics.add.staticGroup();

    plataformaSuelo.create(100,490, 'plataforma');
    plataformaSuelo.create(400,490, 'plataforma');
    plataformaSuelo.create(700,490, 'plataforma');
    plataformaSuelo.create(1000,490, 'plataforma');
    plataformaSuelo.create(1300,490, 'plataforma');


    this.physics.add.collider(barrilImg, plataformaSuelo);

    var playerRun = this.add.sprite(200,300, 'player');
    playerRun.setScale(0.3); //CAMBIAR esta escala si veis que el personaje está muy grande o pequeño
    playerRun.animations.add('playerRunAnim');
    sprite.animations.play('playerRunAnim', 50, true);

    // player.body.setGravityY(300);

    // this.physics.add.collider(player, platforms);

    player = this.physics.add.sprite(200,420, 'playerSheet');

    player.setCollideWorldBounds(true);

    player.setVelocityX(160);


    this.physics.add.collider(player, plataformaSuelo);

    player.setScale(0.5);
      this.anims.create({
      key: 'correrAnim',
      frames: this.anims.generateFrameNumbers('playerSheet',{ start: 0, end: 5 }),
      frameRate: 6,
      repeat: -1
    });
    //this.play('correrAnim');
    //NO SÉ QUE SIGNIFICA ESE 50, INTUYO (solo intuyo) que es la velocidad de la animacion. Pero ni idea.
    //Ah y el true tampoco sé que es. Intuyo que si en el futuro se cambia a false, la animación se para. Pero eso, ni idea.


    //this.addtext(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });
    this.add.sprite(300, 200, 'animAgacharse');
    this.add.sprite(300, 200, 'animCorrer');
    //this.add.sprite(100,50,'botellaChampan');

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setSize(400, 300);
    myCameraMove = this.cameras.add(400, 0, 400, 300);
  };





  update(time, delta) 
  {
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-50);
    }
    myCameraMove.scrollX = 2;
  }


}