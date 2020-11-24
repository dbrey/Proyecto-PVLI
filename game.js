export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    /*this.load.image('animAgacharse', 'sprites/Agacharse.gif')
    this.load.image('animCorrer', 'sprites/Correr.gif')*/
    this.load.image('botellaCalimocho', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Items/Calimocho.png');
    this.load.image('fondo1', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Background/Fondo_tras_del_todo.png');
    this.load.image('barril', 'https://dbrey.github.io/Proyecto-PVLI/Sprites/Obstáculos/Barril.png');
    this.load.spritesheet('playerSheet', 'D:/Spritesheet Correr.png', {frameWidth:161, frameHeight:216});
    // CAMBIAR VALORES DEL SPRITESHEET
    //El 4 y el 37 son las dimensiones de cada frame por separado (4x37), y el 234 es la CANTIDAD de frames que hay en el spriteSheet
    
    //this.load.image('botellaChampan', 'sprites/Champan CG.png');
  }

  create() {
    var fondoImg = this.add.sprite(700, 400, 'fondo1');
    fondoImg.setScale(1.7);
    var calimoImg = this.add.sprite(1100,210, 'botellaCalimocho');
    calimoImg.setScale(0.05);
    var barrilImg = this.add.sprite(1100,300, 'barril');
    barrilImg.setScale(0.3);

    /*var playerRun = this.add.sprite(200,300, 'playerSheeet');
    playerRun.setScale(0.3); //CAMBIAR esta escala si veis que el personaje está muy grande o pequeño
    playerRun.animations.add('correr');
    sprite.animations.play('correr', 50, true);*/
    
    this.add.sprite(200,300, 'player');
    this.scene.anims.create({
      key: 'correrAnim',
      frames:this.scene.anims.generateFrameNumbers('playerSheet',{start:0, end:5}),
      frameRate: 2,
      repeat: -1
    }) ;
    //NO SÉ QUE SIGNIFICA ESE 50, INTUYO (solo intuyo) que es la velocidad de la animacion. Pero ni idea.
    //Ah y el true tampoco sé que es. Intuyo que si en el futuro se cambia a false, la animación se para. Pero eso, ni idea.


    //this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });
    /*this.add.sprite(300, 200, 'animAgacharse');
    this.add.sprite(300, 200, 'animCorrer');*/
    //this.add.sprite(100,50,'botellaChampan');
  }

  update(time, delta) {}
}
