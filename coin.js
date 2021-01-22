import power_up from "./power_up.js";

export default class coins extends power_up 
{
    constructor(scene, x, y){
        super(scene, x, y,'coinsheet');
        this.play('coin',true);
        this.set_powerup_scale(1.3);
        
        this.setDepth(9);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        super.recoger_powerup(this.sumarpuntos, this);
    }
    sumarpuntos(power_up){
        power_up.scene.moneda();
        power_up.destroy();
    }
}