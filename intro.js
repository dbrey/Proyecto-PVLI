export default class Intro extends Phaser.Scene 
{
  constructor() {
    super({ key: 'intro' });
  }


  preload() {
    this.load.video('intro','./imagenes/intro.mp4');
  }

  create()
  {
    this.add.video(700,400,'intro');
  }
  update() {
    console.log(this.video.getProgress()); // por donde va en el video
  };

}
      