export default class barra_alcohol extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x ,y){
      super(scene, x, y,'alcohol_atlas');
      this.setScale(0.50);
      this.setScrollFactor(0);
      this.setDepth(6);
      this.images = this.scene.add.existing(this);
      this.ebriedad = 0;
      this.max_alcohol = 149;
      this.coma_etilico = false;
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.alcohol_texture = this.scene.textures.get('alcohol_atlas');
      this.frames_alcohol = this.alcohol_texture.getFrameNames();
      this.actualizar_barra = true;
      this.escena = scene;
    }

    aumentar_ebriedad(aumento){
      this.ebriedad += aumento;
    }
    reducir_ebriedad(reduccion){
      this.ebriedad -=reduccion;
    }

    preUpdate(t, d){  
      super.preUpdate(t,d);
    //EL contador de ebriedad debe estar siempre entre 0 y 149
      if(this.ebriedad > this.max_alcohol){
        this.ebriedad = this.max_alcohol; 
      }
      else if(this.ebriedad < 0)
      {
        this.ebriedad = 0;
      }
      // Si sobrepasa el maximo de alcohol, vamos a la escena de muerte
      if(this.ebriedad === this.max_alcohol){
        this.escena.muerte(1);
      }
      
      if(this.actualizar_barra){
        // Actualizamos la imagen de barra de alcoholismo segun su nivel de ebriedad
        this.cambio_frame = Math.floor(this.ebriedad/10);
        this.images.setFrame(this.frames_alcohol[this.cambio_frame]);
      }
    }
}
