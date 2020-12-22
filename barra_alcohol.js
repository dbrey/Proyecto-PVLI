export default class Barra_Alcohol extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x ,y){
      super(scene, x, y,'alcohol_atlas');
      this.setScale(0.50);
      this.images = this.scene.add.existing(this);
      this.ebriedad = 0;
      this.max_alcohol = 150;
      this.coma_etilico = false;
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.alcohol_texture = this.scene.textures.get('alcohol_atlas');
      this.frames_alcohol = this.alcohol_texture.getFrameNames();
      //this.images.setFrame(this.frames_alcohol[2]);
      //this.add.sprite(1000, 500, 'alcohol_atlas');
      /*this.anims.play('alcoholismo',true);
      this.anims.stop();
      this.frame_buffer = this.anims.currentFrame.nextFrame;
      this.primer_frame = this.anims.currentFrame;*/
    }

    aumentar_ebriedad(aumento){
        this.ebriedad += aumento;
        this.scene.player.sube = true;
        if(this.ebriedad === this.max_alcohol){
            this.coma_etilico = true;
        }
    }
    reducir_ebriedad(reduccion){
      this.scene.player.sube = false
        if(this.ebriedad > 0){
            this.ebriedad -= reduccion;
        }
    }

    preUpdate(t, d){  
      this.ebriedad += 5;
      this.cambio_frame = Math.floor(this.ebriedad/10);
      this.images.setFrame(this.frames_alcohol[this.cambio_frame]);
      
      console.log(this.ebriedad); 
    }
     cambio_frame(index_ref){
      if((this.anims.currentFrame.index === index_ref) && this.scene.player.sube){
        this.frame_buffer = this.anims.currentFrame.nextFrame;
        this.anims.setCurrentFrame(this.frame_buffer);
      }
      else if((this.anims.currentFrame.index === (index_ref+2)) && !this.scene.player.sube){
        this.frame_buffer = this.anims.currentFrame.prevFrame;
        this.anims.setCurrentFrame(this.frame_buffer);
      }
    }
}
