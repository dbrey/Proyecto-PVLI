export default class barra_alcohol extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x ,y){
      super(scene, x, y,'alcohol_atlas');
      this.setScale(0.50);
      this.setScrollFactor(0);
      this.images = this.scene.add.existing(this);
      this.ebriedad = 0;
      this.max_alcohol = 149;
      this.coma_etilico = false;
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.alcohol_texture = this.scene.textures.get('alcohol_atlas');
      this.frames_alcohol = this.alcohol_texture.getFrameNames();
      this.actualizar_barra = true;
      this.escena = scene;
      //this.images.setFrame(this.frames_alcohol[2]);
      //this.add.sprite(1000, 500, 'alcohol_atlas');
      /*this.anims.play('alcoholismo',true);
      this.anims.stop();
      this.frame_buffer = this.anims.currentFrame.nextFrame;
      this.primer_frame = this.anims.currentFrame;*/
    }

    aumentar_ebriedad(aumento){
      this.ebriedad += aumento;
      /*if((this.ebriedad + aumento) === this.max_alcohol)
      {
        this.ebriedad = this.max_alcohol;
      }  
      else
      {
        this.ebriedad += aumento;
      }
      if(this.ebriedad === this.max_alcohol){
        this.coma_etilico = true;
      }*/
    }
    reducir_ebriedad(reduccion){
      this.ebriedad -=reduccion;
        /*if(this.ebriedad > 0){
            this.ebriedad -= reduccion;
            if(this.ebiredad < 0){
              this.ebriedad = 0;
            }
        }*/
        
    }

    preUpdate(t, d){  
      
      if(this.ebriedad > this.max_alcohol){
        this.ebriedad = this.max_alcohol;
        this.escena.muerte(1);
      }
      else if(this.ebriedad < 0)
      {
        this.ebriedad = 0;
      }
      //console.log(this.ebriedad);
      //this.ebriedad += 5;
      if(this.actualizar_barra){
        this.cambio_frame = Math.floor(this.ebriedad/10);
        this.images.setFrame(this.frames_alcohol[this.cambio_frame]);
      }
    }
}
