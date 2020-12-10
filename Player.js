import Personaje from "./personaje.js";

export default class Player extends Personaje
{
  constructor(scene, x, y) {

    super(scene,x,y,'corrersheet');

    this.setScale(0.6);

    this.speed = 0;
    this.limitspeed = 50;
    this.aceleracion = 3; //Rapidez con la que cambia la velocidad con el input
    this.aumentandoVelocidad = false;
    this.disminuyendoVelocidad = false;
    this.delay_input = 0;

    this.play('correr',true);

    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preUpdate(t, d)
  {
    super.preUpdate(t, d);

    //LECTURA DE TECLADO
    if (this.cursors.up.isDown && this.body.touching.down)
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
    else if (this.cursors.down.isDown && this.body.touching.down) //Abajo
    {
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

    this.body.setVelocityX(this.speed);
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
    this.play('agacharse', true);
    
  }

 
}