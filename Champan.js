export default class Champan extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y){
        super(scene, x, y,'champan');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setScale(1.5);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        
        if(this.scene.physics.overlap(this, this.scene.player)){
            //Llamar a metodo de player q cambien el movimiento, unos segundos 45 grados y fuerza hacia arriba luego recto y movmiento libre
            
            this.destroy();
            console.log("CHAMPAN");
        }
    }
}