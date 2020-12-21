export default class Agua extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'botella_agua');
        //this.scene.add.existing(this);
        this.scene.physics.add.staticImage(x, y,'botella_agua');
        //this.body.setImmovable(true);
    }
}
