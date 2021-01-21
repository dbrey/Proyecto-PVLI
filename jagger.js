import power_up from "./power_up.js";

export default class jagger extends power_up 
{
    constructor(scene, x, y){
        super(scene, x, y,'jagger');
        super.set_powerup_scale(0.025);
        super.set_offset(25, 40, 210, 550);  
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        super.recoger_powerup(this.beber_jagger, this);
    }
    beber_jagger(power_up){
        power_up.scene.alcohol.ebriedad = power_up .scene.alcohol.max_alcohol;
        power_up.destroy();
    }
}