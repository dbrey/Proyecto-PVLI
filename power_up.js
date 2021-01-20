export default class power_up extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, img){
        super(scene, x, y, img);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }

    recoger_powerup(callback, power_up){
        if(this.scene.physics.overlap(this, this.scene.player)){
            callback(power_up);
        }
    }

    set_powerup_scale(scale){
        this.setScale(scale);
    }

    set_offset(size_x, size_y, offset_x, offset_y){
        this.body.setSize(size_x, size_y);
        this.body.setOffset(offset_x, offset_y);
    }
} 