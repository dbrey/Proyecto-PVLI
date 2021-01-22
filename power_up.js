export default class power_up extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, img){
        super(scene, x, y, img);
        this.prueba = img;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.getpowerup = this.scene.sound.add('powup', {volume: 0.05}, {loop: false});

    }

    // Recoge el power-up y ejecuta su metodo correspondiente
    recoger_powerup(callback, power_up){
        if(this.scene.physics.overlap(this, this.scene.player)){
            if(this.scene.sonidoactive)
            {
                if(this.prueba !== "coinsheet")
                {
                    this.getpowerup.play();
                }
                else if(this.prueba === "coinsheet")
                {
                    this.coineffect = this.scene.sound.add('coinmusic', {volume: 0.05});
                    this.coineffect.play();
                    
                }
            }
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