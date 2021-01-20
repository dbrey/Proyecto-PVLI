import power_up from "./power_up.js";

export default class champan extends power_up 
{
    constructor(scene, x, y){
        super(scene, x, y,'champan');
        super.set_powerup_scale(0.025);
        super.set_offset(20, 40, 155, 630);
        this.champmusic = this.scene.sound.add('champanmusic', {volume: 0.05}, {loop: false});
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        super.recoger_powerup(this.beber_champan, this);
    }

    beber_champan(power_up)
    {
        power_up.scene.tocarchampan(power_up.champmusic);
        power_up.scene.player.cambiomov();
        power_up.scene.rapido();
        power_up.destroy();
        console.log("CHAMPAN");
    }
}