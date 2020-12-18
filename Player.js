import Personaje from "./personaje.js";

export default class Player extends Personaje
{
  constructor(scene, x, y, speed) {

    super(scene,x,y,'corrersheet', speed * 62);

    this.setScale(0.25);

    this.speed = 0;
    this.limitspeed = 50;
    this.aceleracion = 3; //Rapidez con la que cambia la velocidad con el input
    this.aumentandoVelocidad = false;
    this.disminuyendoVelocidad = false;
    this.delay_input = 0;
    this.stAgachado = false;

    this.play('correr',true);
    this.body.setSize(150, 220);
    this.body.setOffset(0, 20);
    this.setDepth(5);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preUpdate(t, d)
  {
    super.preUpdate(t, d);

    //LECTURA DE TECLADO
    if (this.cursors.up.isDown && this.body.blocked.down)
    {
      this.saltar();
    }
    else if (this.cursors.left.isDown) //Izquierda reducir vel
    {
      //Equivalente al invoke
      //this.timedEvent = this.scene.time.delayedCall(this.delay_input, this.scene.onEvent, [], this); 
      this.disminuyendoVelocidad = true;
      this.aumentandoVelocidad = false;
    }
    else if (this.cursors.right.isDown) //Derecha aumentar vel
    {
      this.aumentandoVelocidad = true;
      this.disminuyendoVelocidad = false;
    }
    else if (this.cursors.down.isDown && !this.stAgachado && this.body.blocked.down) //Abajo
    {
      this.stAgachado = true;
      this.agacharse();

    }


    this.movimiento();
  }  

  movimiento(){
    if (this.disminuyendoVelocidad){
      this.speed -= this.aceleracion; //Disminuye Vel
      //Si ha llegado al límite, deja de disminuir
      if (this.speed < -this.limitspeed) this.disminuyendoVelocidad = false;
    }

    if (this.aumentandoVelocidad){
      this.speed += this.aceleracion; //Aumenta vel.
      //Si ha llegado al límite, deja de aumentar
      if (this.speed > this.limitspeed) this.aumentandoVelocidad = false;
    }

    this.moverse();
  }

  moverse(){
    super.moverse(this.speed);
  }

  saltar(){
    super.saltar();
    /*
    En el caso de que cuando probemos este salto en el guardia, no salte
    será porque pesa más y hay que añadirle más fuerza. En ese caso al saltar() de Personaje
    se le meterá un parámetro que será la fuerza y, desde Player se llamará con una fuerza y desde
    Guardia con otra.
    */
    //ANIMACIÓN DE SALTO
    this.play('correr',true);
  } 

  agacharse(){
    super.agacharse();

    //Animación
    this.anims.play('agacharse1', true);
    this.anims.chain('agacharse2',true);

    this.timedEvent = this.scene.time.delayedCall(500, this.scene.sizeAgachado, [], this);
    this.anims.chain('agacharse3', true); 

    this.timedEvent = this.scene.time.delayedCall(1250, this.scene.sizeLevantado, [], this);
    this.timedEvent = this.scene.time.delayedCall(1500, this.scene.volverCorrer, [], this); 
    
    // Esto impide agacharse varias veces, ya que si se agacha muy de seguido, las animaciones colapsan
    this.timedEvent = this.scene.time.delayedCall(1000, this.scene.falsear, [], this); 

  }
}