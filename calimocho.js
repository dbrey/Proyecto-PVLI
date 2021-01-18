export default class calimocho extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y){
        super(scene, x, y,'calimocho');
        this.scene.add.existing(this);
        this.delay_time = 10000;
        //this.scene.physics.add.staticImage(x, y,'botella_agua');
        this.scene.physics.add.existing(this, true);
        this.setScale(0.025);
        this.body.setSize(20, 65);
        this.body.setOffset(155, 610);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        
        if(this.scene.physics.overlap(this, this.scene.player)){
            this.barraalcohol_gone();
        }
    }
    barraalcohol_gone(){
        this.scene.alcohol.actualizar_barra = false;
        this.scene.alcohol.images.setFrame(this.scene.alcohol.frames_alcohol[15]);
        this.y = 3000;
        this.body.setOffset(155, 1000);
        this.timedEvent = this.scene.time.delayedCall(this.delay_time, this.onEvent, [], this);
        console.log("calimocho");
    }

    onEvent(){
        this.scene.alcohol.actualizar_barra = true;
        this.destroy();
    }
}