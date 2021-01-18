export default class jagger extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y){
        super(scene, x, y,'jagger');
        this.scene.add.existing(this);
        //this.scene.physics.add.staticImage(x, y,'botella_agua');
        this.scene.physics.add.existing(this, true);
        this.setScale(0.025);
        this.body.setSize(25, 60);
        this.body.setOffset(210, 540);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        
        if(this.scene.physics.overlap(this, this.scene.player)){
            this.alcohol_maximo();
        }
    }
    alcohol_maximo(){
        this.scene.alcohol.ebriedad = this.scene.alcohol.max_alcohol;
        this.destroy();
        console.log("jagger");
    }
}