export default class Barra_Alcohol extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x ,y){
        super(scene, x, y,'alcoholismo');
        this.setScale(0.50);
        this.scene.add.existing(this);
        this.ebriedad = 0;
        this.max_alcohol = 150;
        this.coma_etilico = false;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        
        this.anims.play('alcoholismo',true);
        this.anims.stop();
        this.frame_buffer = this.anims.currentFrame.nextFrame;
        this.primer_frame = this.anims.currentFrame;
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
        
      //this.ebriedad += 5;
        console.log(this.ebriedad);
        super.preUpdate(t, d);
        switch(true){
            case(this.ebriedad < 10):
              this.anims.setCurrentFrame(this.primer_frame);
              break;
            case((this.ebriedad > 10) && (this.ebriedad < 21)):
              this.cambio_frame(1);
              break;
            case((this.ebriedad > 20) && (this.ebriedad < 31)):
              this.cambio_frame(2);              
              break;
            case((this.ebriedad > 30) && (this.ebriedad < 41)):
              this.cambio_frame(3);              
              break;
            case((this.ebriedad > 40) && (this.ebriedad < 51)):
              this.cambio_frame(4);             
              break;
            case((this.ebriedad > 50) && (this.ebriedad < 61)):
              this.cambio_frame(5);             
              break;
            case((this.ebriedad > 60) && (this.ebriedad < 71)):
              this.cambio_frame(6);            
              break;
            case((this.ebriedad > 70) && (this.ebriedad < 81)):
              this.cambio_frame(7);             
              break;
            case((this.ebriedad > 80) && (this.ebriedad < 91)):
              this.cambio_frame(8);             
              break;
            case((this.ebriedad > 90) && (this.ebriedad < 101)):
              this.cambio_frame(9);             
              break;
            case((this.ebriedad > 100) && (this.ebriedad < 111)):
              this.cambio_frame(10);             
              break;
            case((this.ebriedad > 110) && (this.ebriedad < 121)):
              this.cambio_frame(11);             
              break;
            case((this.ebriedad > 120) && (this.ebriedad < 131)):
             this.cambio_frame(12);              
              break;
            case((this.ebriedad > 130) && (this.ebriedad < 141)):
              this.cambio_frame(13);             
              break;
            case(this.ebriedad > 140):
              this.cambio_frame(14);              
              break;
              
          }
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
