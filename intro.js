export default class Intro extends Phaser.Scene 
{
  constructor() {
    super({ key: 'intro' });
  }


  preload() {
    this.load.video('intro','./imagenes/intro.mp4');
  }te

  create()
  {
    this.video = this.add.video(700,400,'intro');
    this.video.setScale(2.4);
    this.video.play(true);
  }
  update() {
    console.log(this.video.getProgress()); // por donde va en el video

    if(this.video.getProgress() >= 0.99)
    {
      this.scene.start('menu');
    }
  };

}
      