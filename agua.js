export default class Agua extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y){
        super(scene, x, y,'botella_agua');
        this.scene.add.existing(this);
        //this.scene.physics.add.staticImage(x, y,'botella_agua');
        this.scene.physics.add.existing(this, true);
        this.setScale(1.5);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        
        if(this.scene.physics.overlap(this, this.scene.player)){
            this.scene.alcohol.reducir_ebriedad(15);
            this.destroy();
            console.log("BOTELLA");
        }
    }
}