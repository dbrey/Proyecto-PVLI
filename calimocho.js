import power_up from "./power_up.js";

export default class calimocho extends power_up 
{
    constructor(scene, x, y){
        super(scene, x, y,'calimocho');
        this.scene = scene;
        this.delay_time = 10000;
        super.set_powerup_scale(0.025);
        super.set_offset(20, 40, 155, 630);
    }

    preUpdate(t,d){
        super.preUpdate(t, d);
        this.recoger_powerup(this.beber_calimocho, this);
    }
    beber_calimocho(power_up){
        //Evita que la barra de alcohol se actualice
        power_up.scene.alcohol.actualizar_barra = false;
        //Pone la barra de alcohol a un frame transparente.
        power_up.scene.alcohol.images.setFrame(power_up.scene.alcohol.frames_alcohol[15]);
        //Mueve el power up fuera de la cámara para destruirlo después.
        power_up.y = 3000;
        power_up.body.setOffset(155, 1000);
        //Devuelve a la normalidad a la barra de alcohol con delay_time segundos.
        power_up.timedEvent = power_up.scene.time.delayedCall(power_up.delay_time, power_up.onEvent, [], power_up);
    }

    onEvent(){
        this.scene.alcohol.actualizar_barra = true;
        this.destroy();
    }
}