import personaje from "./personaje.js";

export default class player extends personaje
{
  constructor(scene, x, y, speed) {

    super(scene,x,y,'corrersheet', speed * 62);

    this.setScale(0.2);
    this.escenario = scene;
    this.speed = 0;
    this.limitspeed = 200;
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

    this.champmusic = this.scene.sound.add('champanmusic', {volume: 0.05}, {loop: false});

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
    this.delay_input = ((this.escenario.alcohol.ebriedad)*4);  
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

  // Pausa la musica normal y toca la del champan, si esta activado el sonido y sigue jugando
  tocarchampan()
  {
   if(this.scene.sonidoactive && this.scene.sigueJugando)
  {
      this.scene.music.pause();
      this.champmusic.play();
  }
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

    }
    else{ //Quitarla y mov cielo
      this.body.setVelocityY(-400);
      this.body.allowGravity = false;
      this.tocarchampan();
      this.anims.play('champan',true);

    }
  }
  normal()
  {
    
      //LECTURA DE TECLADO
      if (this.cursors.up.isDown)
      {
        this.timedEvent = this.scene.time.delayedCall(this.delay_input, this.saltar, [], this);
      }
      else if (this.cursors.left.isDown) //Izquierda reducir vel
      {
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
        this.timedEvent = this.scene.time.delayedCall(this.delay_input, this.agacharse, [], this);
      }
      this.timedEvent = this.scene.time.delayedCall(this.delay_input, this.movimiento, [], this);
       
  }

  // Cambiamos el movimiento del jugador
  movimientochamp()
  {
    
    if(this.disminuyendoVelocidad && this.speed > -this.limitspeed){
      this.speed -= this.aceleracion; //Disminuye Vel
      this.disminuyendoVelocidad = false;
    }

    if(this.aumentandoVelocidad){
      this.speed += this.aceleracion; //Aumenta vel.
      this.aumentandoVelocidad = false;
    }
    this.moverse();
  }

  movimiento(){
    // Aumentamos o disminuimos la velocidad siempre que este dentro del limite
    // Tambien aumentamos o disminuimos el nivel de alcoholismo de la barra

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
    if(this.body.blocked.down){
      super.saltar(-265);
    }
    
    //ANIMACIÓN DE SALTO
    this.play('correr',true);
  } 

  incapacitar()
  {
    this.speed--;
  }

  agacharse(){
    super.agacharse();

    //Animación
    this.anims.play('agacharse1', true);
    this.anims.chain('agacharse2',true);

    // Cambiamos la hitbox, reduciendolo
    this.timedEvent = this.scene.time.delayedCall(500, this.scene.sizeAgachado, [], this);
    this.anims.chain('agacharse3', true); 

    // Le devolvemos la hitbox original y cambiamos la animacion de correr
    this.timedEvent = this.scene.time.delayedCall(1250, this.scene.sizeLevantado, [], this);
    this.timedEvent = this.scene.time.delayedCall(1500, this.scene.volverCorrer, [], this); 
    
    // Esto impide agacharse varias veces, ya que si se agacha muy de seguido, las animaciones colapsan
    this.timedEvent = this.scene.time.delayedCall(1000, this.scene.falsear, [], this); 

  }

  ralentizar(segundos)
  {
    // Numero de veces que se va a reducir la velocidad
    this.seg = segundos;  
    if (segundos >= 1000)
    {
      this.escenario.muerte(2);
    }
     
    while(this.seg > 0 && this.speed >= -50)
    {
     
      this.timedEvent = this.scene.time.delayedCall(80, this.incapacitar, [], this);
      this.seg--;
    }

  }
}