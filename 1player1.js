import personaje from "./personaje.js";

export default class player extends personaje
{
  constructor(scene, x, y, speed) {

    super(scene,x,y,'corrersheet', speed * 62);

    this.setScale(0.2);
    this.escenario = scene;
    this.speed = 0;
    this.limitspeed = 200;
    this.paralizado = false;

    this.mov = true;

    this.tiempo = 0;
    this.aceleracion = 5; //Rapidez con la que cambia la velocidad con el input
    this.aumentandoVelocidad = false;
    this.disminuyendoVelocidad = false;
    this.delay_input = 0;
    this.stAgachado = false;

    this.play('correr',true);
    this.body.setSize(150, 220);
    this.body.setOffset(0, 0);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  preUpdate(t, d)
  {
    if (this.escenario.sigoJugando()){
      super.preUpdate(t, d)

      if(this.mov === true) //normal
      {
        this.normal();
      }
      else //Champan FALTA CAMBIAR EL SPRITE
      {
        this.champan();
        if(this.tiempo === 1250) //Se acabo el powerup
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
    else this.body.setVelocityX(0);
  }  

  champan() //movimiento en champan
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

  cambiomov() //cambia el estado de champan a player o viceversa
  {  //true normal, false champan
    this.mov = !this.mov;
    if(this.mov) //Poner Gravedad y mov normal
    {
      this.body.allowGravity = true;
      this.scene.normal();
      this.anims.play('correr',true);
      this.scene.tocarnormal();

      //const platformCollider = this.physics.add.collider(this.player, this.platformlayer);
      //const objest = this.physics.add.collider(this.player, this.objestaticos); 
    }
    else{ //Quitarla y mov cielo
      this.body.setVelocityY(-400);
      this.body.allowGravity = false;
      this.anims.play('champan',true);
      //platformCollider.destroy();
      //objest.destroy();
    }
  }
  normal()
  {
    if(!this.paralizado)
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
      this.scene.alcohol.reducir_ebriedad(0.5);
    }

    if (this.aumentandoVelocidad && this.speed < this.limitspeed){
      this.speed += this.aceleracion; //Aumenta vel.
      this.aumentandoVelocidad = false;
      this.scene.alcohol.aumentar_ebriedad(0.5);
    }

    this.moverse();
  }

  moverse(){
    super.moverse(this.speed);
  }

  saltar(){
    super.saltar(-250);
    /*
    En el caso de que cuando probemos este salto en el guardia, no salte
    será porque pesa más y hay que añadirle más fuerza. En ese caso al saltar() de Personaje
    se le meterá un parámetro que será la fuerza y, desde Player se llamará con una fuerza y desde
    Guardia con otra.
    */
    //ANIMACIÓN DE SALTO
    this.play('correr',true);
  } 
  
  incapacitar()
  {
    this.paralizado = false;
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

  ralentizar(segundos)
  {

    this.paralizado = true;
    this.body.setVelocityX(0);
    this.timedEvent = this.scene.time.delayedCall(segundos, this.incapacitar, [], this);
    //this.speed -= dureza //Por alguna razon, si se pone este codigo, el jugador se destruye
    /*this.retroceso;
    if(nombre === "caja" || nombre === "barril")
    {
      this.retroceso = 200;
    }
    else if(nombre === "botellavacia" || nombre === "jarron")
    {
      this.retroceso = 100;
    }
    else if(nombre === "coche" || nombre === "cocheoscuro")
    {
      this.escenario.muerte(2);
    }
    else if (nombre === "barriltop")
    {
      this.retroceso = 300;
    }

    this.speed -= this.retroceso;*/
    if(this.speed < -400)
    {
      this.speed = -400;
    }    
  }
}