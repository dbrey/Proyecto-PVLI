import power_up from "./power_up.js";

export default class coins extends power_up 
{
    constructor(scene, x, y, bool){
        super(scene, x, y,'coinsheet');
        this.play('coin',true);
        this.set_powerup_scale(1.3);
        this.sound = bool;
        this.music = this.scene.sound.add('coinmusic', {volume: 0.05});
        this.setDepth(10);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        super.recoger_powerup(this.sumarpuntos, this);
    }
    sumarpuntos(power_up){
        // if(this.sound)
        // {
        //     this.music.play();
        // }
        power_up.scene.moneda();
        power_up.destroy();
        console.log("moneda");
    }
}