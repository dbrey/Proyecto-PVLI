import Personaje from "./personaje.js";

export default class Player extends Personaje
{
  constructor(scene, x, y, speed) {

    super(scene,x,y,'corrersheet', speed * 62);

    this.setScale(0.25);

    this.speed = 0;
    this.limitspeed = 200;

    this.mov = true;
    
    this.tiempo = 0;
    this.aceleracion = 5; //Rapidez con la que cambia la velocidad con el input
    this.aumentandoVelocidad = false;
    this.disminuyendoVelocidad = false;
    this.delay_input = 0;
    this.stAgachado = false;
    this.sube = true;

    this.play('correr',true);
    this.body.setSize(150, 220);
    this.body.setOffset(0, 20);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preUpdate(t, d)
  {
    super.preUpdate(t, d)

    if(this.mov === true) //normal
    {
      this.normal();
    }
    else //Champan FALTA CAMBIAR EL SPRITE
    {
      this.champan();
      if(this.tiempo === 1000) //Se acabo el powerup
      {
        this.tiempo = 0;
        this.cambiomov();
      }
      else
      {
        this.tiempo++;
      }
    }
  }  

  champan()
  {
    if (this.cursors.left.isDown) {
      this.disminuyendoVelocidad = true;
      this.aumentandoVelocidad = false;
  }
  else if (this.cursors.right.isDown) {
    this.aumentandoVelocidad = true;
    this.disminuyendoVelocidad = false;
  }

  if (this.cursors.up.isDown) {
      this.body.setVelocityY(-70);
  }
  else if (this.cursors.down.isDown) {
      this.body.setVelocityY(70);
  }
  this.movimientochamp();
  }

  cambiomov()
  {  //true normal, false champan
    this.mov = !this.mov;
    if(this.mov) //Poner Gravedad y mov normal
    {
      this.body.allowGravity = true;
      this.scene.normal();
      this.anims.play('correr',true);
    }
    else{ //Quitarla y mov cielo
      this.body.setVelocityY(-600);
      this.anims.play('champan',true);
      this.body.allowGravity = false;
    }
  }
  normal()
  {
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

  movimientochamp()
  {
    if (this.disminuyendoVelocidad && this.speed > -this.limitspeed){
      this.speed -= this.aceleracion; //Disminuye Vel
      this.disminuyendoVelocidad = false;
    }

    if (this.aumentandoVelocidad){
      this.speed += this.aceleracion; //Aumenta vel.
      this.aumentandoVelocidad = false;
    }

    this.moverse();
  }

  movimiento(){
    if (this.disminuyendoVelocidad && this.speed > -this.limitspeed){
      this.speed -= this.aceleracion; //Disminuye Vel
      this.disminuyendoVelocidad = false;
    }

    if (this.aumentandoVelocidad && this.speed < this.limitspeed){
      this.speed += this.aceleracion; //Aumenta vel.
      this.aumentandoVelocidad = false;
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

  ralentizar(dureza)
  {
    this.speed -= dureza;
    if(this.speed < -200)
    {
      this.speed = -200;
    }    
  }
}