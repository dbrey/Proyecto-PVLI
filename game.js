export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    /*this.load.image('animAgacharse', 'sprites/Agacharse.gif')
    this.load.image('animCorrer', 'sprites/Correr.gif')*/
    this.load.image('botellaCalimocho', 'sprites/Calimocho.PNG');
    this.load.image('fondo1', 'sprites/Fondo tras del todo.PNG')
    //this.load.image('botellaChampan', 'sprites/Champan CG.PNG');
  }

  create() {
    this.add.sprite(700, 400, 'fondo1');
    this.add.sprite(300,200, 'botellaCalimocho');
    //this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });
    /*this.add.sprite(300, 200, 'animAgacharse');
    this.add.sprite(300, 200, 'animCorrer');*/
    //this.add.sprite(100,50,'botellaChampan');
  }

  update(time, delta) {}
}
