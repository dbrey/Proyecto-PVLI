export default class Intro extends Phaser.Scene 
{
  constructor() {
    super({ key: 'intro' });
  }


  preload() {
    this.load.video('intro','./imagenes/intro.mp4');
  }


  create() {
    this.scene.bringToTop();

    this.video = this.add.video('intro');
    this.video.play();
  };

}
      