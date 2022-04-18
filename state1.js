var demogame = {};
var score = 0;
var scoreText;
var globalVol = 0.2;
var text;
var timedEvent;
gameOver = false;
var jumpSigns;
var healthText;
var spacebar;

//assumed scene params, may want to move to config?
var bpm = 120; // units: Beats Per Minute
var fps = 60; // units: Frames Per Second
var space_btwn_beats = 150*60; // units: Pix*velocity factor
var hero_move = (space_btwn_beats/(fps/(bpm/60))); // PXmove/beat*beat/frame
var beat_counter = 0; // to count beats / timing
var player_last_x = 0; //used for tuning hero_move
var player_max_y = 600; //used for testing jump heights for level design

// demogame.state1 = function(){};
// demogame.state1.prototype = {
var SceneOne = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, { "key": "SceneOne" });
  },
  init: function() {},
  preload:function(){
    this.load.image("bg","bg.png");//1000x600
    this.load.image("ground","ground.png"); //150x100
    this.load.audio("track1","walkingwithswagger.mp3");
    this.load.image("dot","vol_slider_knob.png"); //20x20
    //this.load.image("chest","chest.png");//16x13
    //this.load.image("ladder","ladder.png");//16x48
    this.load.spritesheet("king", "player.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("enemy", "enemy.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("jumpSign", "sig2_bigup.png", {frameWidth: 16, frameHeight: 27});
    this.load.spritesheet("boxSign", "punchSig.png", {frameWidth: 16, frameHeight: 27});
  },

  create:function(){
    for (let i = 0; i<36;i++) {
      this.add.image(500+1000*i,300,"bg"); //1000x600
    } // all phaser images are positioned by their center
    //camera 
    //this.physics.startSystem(Phaser.Physics.ARCADE);
    //this.physics.arcade.checkCollision.down = false;

    //keyObj.on('down', function(event) {  this.scene.restart() });

    

    console.log('create');
    // 2:30 in seconds
    this.initialTime = 94;
    text = this.add.text(32, 32, 'Countdown: ' + formatTime(this.initialTime));

    this.health = 3;
    healthText = this.add.text(32, 48, 'Health: ' + this.health);

    // Each 1000 ms call onEvent
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
    timedEvent = this.time.delayedCall(94000, onEvent2, [], this);

    this.cameras.main.setSize(800, 600);
    const cam = this.cameras.add(0, 0, 800, 600);
    // use . setOrigin after .image >> .setOrigin(0,0)
    // phaser builds in order, so top image last

    
    //this.physics.add.collider(jump, player);

    
    this.add.text(26250, 150, 'Congrats you completed level 1!',{ fontSize: '32px', fill: '#FFF' });

    console.log("hi im state1");
    this.physics.world.setFPS(fps);
    platforms = this.physics.add.staticGroup();
    for (let i = 0; i<240;i++) {
      platforms.create(75+i*150,350,"ground");
    }
    // platforms.create(1690,330,"ground"); // test short hop
    // platforms.create(3265,285,"ground"); // test long hop
    //buildStage1();
    //platforms.create(x,y,"tag");//.setScale(2).refreshBody(); // setScale doubles size, need .refreshBody because we've changed a static body
    console.log("map scene1 made");
    player = this.physics.add.sprite(150,250,"king");
    player.setBounce(0);
    player.setCollideWorldBounds(false);
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers("king", {start:4, end:9}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers("king", {start:1, end:1}),
      frameRate: 10,
      repeat: 5
    });
    this.anims.create({
      key: 'punch',
      frames: this.anims.generateFrameNumbers("king", {start:12, end:12}),
      frameRate: 10,
      repeat: 5
    });

    enemies = this.physics.add.staticGroup();
    
    
    player.body.setGravityY(200);
    this.physics.add.collider(player, platforms);
    cam.startFollow(target=player, roundPixels=false, lerpX=0.5, lerpY=0.5, offsetX=-280, offsetY=150);
    //cam.startFollow(player); // most basic version of camera
    cursors = this.input.keyboard.createCursorKeys();
    //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
    beatText = this.add.text(16, 48, 'X', { fontSize: '32px', fill: '#FFF' });
    
    player_last_x = player.x;

    bgTrack = this.sound.add("track1", .2);
    bgTrack.play();

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    jumpSigns = this.physics.add.staticGroup();
    boxSigns = this.physics.add.staticGroup();

    //jump tutorial
    jumpSigns.create(1200,275,"jumpSign");
    this.add.text(1000, 150, 'TIME JUMPS WITH SYMBOL',{ fontSize: '32px', fill: '#FFF' });
    jumpSigns.create(1950,275,"jumpSign");
    platforms.create(2175,295,"ground");
    platforms.create(2325,295,"ground");
    platforms.create(2475,295,"ground");
    platforms.create(2625,295,"ground");
    jumpSigns.create(2550,220,"jumpSign");

    //box tutorial
    this.add.text(2800, 150, 'PRESS RIGHT ARROW TO BOX',{ fontSize: '32px', fill: '#FFF' });
    boxSigns.create(3750,275,"boxSign");
    this.add.text(3500, 150, 'TIME WITH THE SYMBOL TO DEFEAT ENEMIES',{ fontSize: '32px', fill: '#FFF' });
    enemies.create(3800,275,"enemy");
    boxSigns.create(4050,275,"boxSign");
    enemies.create(4100,275,"enemy");
    boxSigns.create(4350,275,"boxSign");
    enemies.create(4400,275,"enemy");
    //this.add.text(4800, 150, 'IF HEALTH HITS 0 OR PLATFORM IS HIT, LEVEL WILL RESTART',{ fontSize: '32px', fill: '#FFF' });

    jumpSigns.create(4950,275,"jumpSign");
    platforms.create(5175,295,"ground");
    platforms.create(5325,295,"ground");
    jumpSigns.create(5250,220,"jumpSign");
    platforms.create(5475,240,"ground");
    platforms.create(5625,240,"ground");
    platforms.create(5775,240,"ground");
    
    boxSigns.create(5550,165,"boxSign");
    enemies.create(5600,165,"enemy");
    boxSigns.create(5700,165,"boxSign");
    enemies.create(5750,165,"enemy");
    jumpSigns.create(5850,165,"jumpSign");
    platforms.create(6075,240,"ground");
    platforms.create(6225,240,"ground");
    platforms.create(6375,240,"ground");
    boxSigns.create(6150,165,"boxSign");
    enemies.create(6200,165,"enemy");
    boxSigns.create(6300,165,"boxSign");
    enemies.create(6350,165,"enemy");

    this.physics.add.overlap(player, jumpSigns, jumpNow, null, this);

    this.physics.add.overlap(player, enemies, punchChance, null, this);

    

    //jump.create(1000,275,"jumpSign");
    //jump.create(1100,275,"jumpSign");


    
    //jump.setBounce(0);
    //jump.setCollideWorldBounds(true);
    //this.physics.add.collider(jump, platforms);

    //this.input.once('pointerdown', this.scene.restart());
  },
  update:function(){
    player.setVelocityX(hero_move);
    player.anims.play('right', true);
    
    //game.physics.arcade.collide(player, 'ground');
    //var keyObj = this.input.keyboard.addKey('W');
    //var isDown = keyObj.isDown;
    //keyObj.on('down', function(event) { this.scene.restart() });

    if (Phaser.Input.Keyboard.JustDown(spacebar))
    {
        this.scene.restart();
        bgTrack.stop();
    }

    


    //if (cursors.up.isDown && player.body.touching.down) // short hop, results in 288.5-261.611111111111
    //{
    //  player.anims.play('turn', true);
    //  player.setVelocityY(-250);
    //  console.log(`jumpStart:${player.x}`); //DEV // 4550 >  4665
    //}
    //if (cursors.space.isDown && player.body.touching.down) // tall hop, results in 288.5-212.44444444444437
    //{
      //player.anims.play('turn', true);
      //player.setVelocityY(-150);
      // console.log(`jumpStart:${player.x}`); //DEV // 14785 > 14975
    //}
    else if (cursors.right.isDown) // slam
    {
      player.anims.play('punch', false);
      //this.add.image(player.x,player.y,"slam"); 
    }
    else if (cursors.down.isDown) // drop
    {
      player.anims.play('down', false);
      //this.add.image(player.x,player.y,"down"); 
    }
    // counting beats
    beat_counter += 1;
    if (beat_counter==30) {
      beatText.setText('O');
      beat_counter = 0;
      console.log(`dX:${player.x - player_last_x}`); // this is a temporary visual for dev
      console.log(`X:${player.x}`); // this is a temporary visual for dev
      //`Fifteen is ${five + ten} and not ${2 * five + ten}.`
      player_last_x = player.x;
    } else {
      beatText.setText('X');
    }
    // dev testing
    // if(player.y < player_max_y && player.x > 450) {
    //   player_max_y = player.y;
    //   console.log(`maxY:${player.y},currX:${player.x}`);
    // }
    // if(player.x > 5000) {
    //   player.x = 500;
    //   console.log("loop at 5k reached");
    // }
  }
});



function punchChance(player, enemy)
{
  if (cursors.right.isDown)
    {
      player.anims.play('punch', false);
      enemy.disableBody(true, true);
    }
  else
    {
      if (this.health > 0)
      {
        this.health = this.health - 1
      }
    }
}



function jumpNow()
{
  if (cursors.up.isDown && player.body.touching.down) // short hop, results in 288.5-261.611111111111
    {
      player.anims.play('right', true);
      player.setVelocityY(-250);
      console.log(`jumpStart:${player.x}`); //DEV // 4550 >  4665
    }
}

function buildStage1()
{
  // loading for stage 1, 3/21/22

  platforms.create(1500,295,"ground");
  platforms.create(1950,330,"ground");
  platforms.create(2100,310,"ground");
  platforms.create(2700,295,"ground");
  platforms.create(3150,200,"ground");
  platforms.create(3450,200,"ground");
  platforms.create(3750,330,"ground");
  platforms.create(3900,310,"ground");
  platforms.create(4150,255,"ground");
  platforms.create(4650,295,"ground");
  platforms.create(4900,240,"ground");
  platforms.create(5400,330,"ground");
  platforms.create(5550,310,"ground");
  platforms.create(6000,295,"ground");
  platforms.create(6750,310,"ground");
  platforms.create(7350,295,"ground");
  platforms.create(7500,275,"ground");
  platforms.create(7650,255,"ground");
  platforms.create(7950,255,"ground");
  platforms.create(8250,255,"ground");
  platforms.create(8700,330,"ground");
  platforms.create(8850,310,"ground");
  platforms.create(9000,290,"ground");
  platforms.create(9150,270,"ground");
  platforms.create(9450,200,"ground");
  platforms.create(9750,200,"ground");
  platforms.create(10200,330,"ground");
  platforms.create(10950,295,"ground");
  platforms.create(11400,330,"ground");
  platforms.create(11550,310,"ground");
  platforms.create(11850,260,"ground");
  platforms.create(12750,295,"ground");
  platforms.create(13500,330,"ground");
  platforms.create(13800,330,"ground");
  platforms.create(14700,295,"ground");
  platforms.create(15000,255,"ground");
  platforms.create(15300,255,"ground");
  platforms.create(15600,255,"ground");
  platforms.create(15900,255,"ground");
  platforms.create(16200,255,"ground");
  platforms.create(16800,200,"ground");
  platforms.create(17100,200,"ground");
  platforms.create(17550,330,"ground");
  platforms.create(17700,330,"ground");
  platforms.create(17850,330,"ground");
  platforms.create(18000,330,"ground");
  platforms.create(18300,275,"ground");
  platforms.create(18600,275,"ground");
  platforms.create(18900,275,"ground");
  platforms.create(19200,275,"ground");
  platforms.create(19500,200,"ground");
  platforms.create(21000,295,"ground");
  platforms.create(21150,275,"ground");
  platforms.create(22050,330,"ground");
  platforms.create(22200,310,"ground");
  platforms.create(22500,200,"ground");
  platforms.create(23100,200,"ground");
  platforms.create(23400,330,"ground");
  platforms.create(23550,330,"ground");
  platforms.create(23700,330,"ground");
  platforms.create(23850,330,"ground");
  platforms.create(24000,310,"ground");
  platforms.create(24150,290,"ground");
  platforms.create(24300,290,"ground");
  platforms.create(24450,290,"ground");
  platforms.create(24600,290,"ground");
  platforms.create(25500,295,"ground");
  platforms.create(25800,295,"ground");
  platforms.create(26100,295,"ground");
  platforms.create(26400,295,"ground");


  //platforms.create(12000,330,"ground");
  
  
}

function formatTime(seconds){
  // Minutes
  var minutes = Math.floor(seconds/60);
  // Seconds
  var partInSeconds = seconds%60;
  // Adds left zeros to seconds
  partInSeconds = partInSeconds.toString().padStart(2,'0');
  // Returns formated time
  return `${minutes}:${partInSeconds}`;
}

function onEvent(){
  this.initialTime -= 1; // One second
  text.setText('Countdown: ' + formatTime(this.initialTime));
}

function onEvent2()
{
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.time.addEvent({
        delay: 2000,
        loop: false,
        callback: () => {
            this.scene.start("Lose", { 
                "message": "Game Over!\nPress SPACEBAR to restart!"
            });
          }
      })

    gameOver = true;

}