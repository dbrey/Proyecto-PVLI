export default class Barra_Alcohol extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x ,y, player){
        super(scene, x, y, player, 'barra_alcohol1');

        this.scene.add.existing(this);
        this.ebriedad;
        this.max_alcohol = 150;
        this.coma_etilico = false;

    }

    aumentar_ebriedad(aumento){
        this.ebriedad += aumento;
        if(this.ebriedad === this.max_alcohol){
            this.coma_etilico = true;
        }
    }
    reducir_ebriedad(reduccion){
        if(this.ebriedad > 0){
            this.ebriedad -= reduccion;
        }
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        switch(true){
            case((this.ebriedad > 10) && (this.ebriedad < 21)):
              this.setTexture('barra_alcohol2');
              break;
            case((this.ebriedad > 20) && (this.ebriedad < 31)):
              this.setTexture('barra_alcohol3');
              break;
            case((this.ebriedad > 30) && (this.ebriedad < 41)):
              this.setTexture('barra_alcohol4');
              break;
            case((this.ebriedad > 40) && (this.ebriedad < 51)):
              this.setTexture('barra_alcohol5');
              break;
            case((this.ebriedad > 50) && (this.ebriedad < 61)):
              this.setTexture('barra_alcohol6');
              break;
            case((this.ebriedad > 60) && (this.ebriedad < 71)):
              this.setTexture('barra_alcohol7');
              break;
            case((this.ebriedad > 70) && (this.ebriedad < 81)):
              this.setTexture('barra_alcohol8');
              break;
            case((this.ebriedad > 80) && (this.ebriedad < 91)):
              this.setTexture('barra_alcohol9');
              break;
            case((this.ebriedad > 90) && (this.ebriedad < 101)):
              this.setTexture('barra_alcohol10');
              break;
            case((this.ebriedad > 100) && (this.ebriedad < 111)):
              this.setTexture('barra_alcohol11');
              break;
            case((this.ebriedad > 110) && (this.ebriedad < 121)):
              this.setTexture('barra_alcohol12');
              break;
            case((this.ebriedad > 120) && (this.ebriedad < 131)):
              this.setTexture('barra_alcohol13');
              break;
            case((this.ebriedad > 130) && (this.ebriedad < 141)):
              this.setTexture('barra_alcohol14');
              break;
            case(this.ebriedad > 140):
              this.setTexture('barra_alcohol15');
              break;
          }
    }
}
