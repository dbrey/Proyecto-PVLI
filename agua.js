import power_up from "./power_up.js";

export default class agua extends power_up 
{
    constructor(scene, x, y){
        super(scene, x, y,'botella_agua');
        super.set_powerup_scale(0.85);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        super.recoger_powerup(this.beber_agua, this);
    }
    beber_agua(power_up){
        power_up.scene.alcohol.reducir_ebriedad(15);
        power_up.destroy();
    }
}