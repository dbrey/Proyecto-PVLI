import power_up from "./power_up.js";

export default class cerveza extends power_up 
{
    constructor(scene, x, y){
        super(scene, x, y,'cerveza');
        super.set_powerup_scale(0.85);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        super.recoger_powerup(this.beber_cerveza, this);
    }

    beber_cerveza(power_up){
        console.log("cerveza");
        power_up.scene.alcohol.aumentar_ebriedad(15);
        power_up.destroy();
    }
}