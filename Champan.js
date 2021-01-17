export default class Champan extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y){
        super(scene, x, y,'champan');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setScale(0.025);
        this.champmusic = this.scene.sound.add('champanmusic', {volume: 0.05}, {loop: false});

        this.body.setSize(20, 70);
        this.body.setOffset(155, 610);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        
        if(this.scene.physics.overlap(this, this.scene.player)){
            this.chocar();
        }
    }

    chocar()
    {

        this.scene.tocarchampan(this.champmusic);
        this.scene.player.cambiomov();
        this.scene.rapido();
        this.destroy();
        console.log("CHAMPAN");
    }
}