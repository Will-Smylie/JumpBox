var demogame = {};
var score = 0;
var scoreText;

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
    //this.load.image("chest","chest.png");//16x13
    //this.load.image("ladder","ladder.png");//16x48
    this.load.spritesheet("king", "dude.png", { frameWidth: 17, frameHeight: 23 });
  },
  create:function(){
    for (let i = 0; i<36;i++) {
      this.add.image(500+1000*i,300,"bg"); //1000x600
    } // all phaser images are positioned by their center
    //camera 
    this.cameras.main.setSize(800, 600);
    const cam = this.cameras.add(0, 0, 800, 600);
    // use . setOrigin after .image >> .setOrigin(0,0)
    // phaser builds in order, so top image last
    console.log("hi im state1");
    this.physics.world.setFPS(fps);
    platforms = this.physics.add.staticGroup();
    for (let i = 0; i<240;i++) {
      platforms.create(75+i*150,350,"ground");
    }
    //platforms.create(x,y,"tag");//.setScale(2).refreshBody(); // setScale doubles size, need .refreshBody because we've changed a static body
    console.log("map scene1 made");
    player = this.physics.add.sprite(150,250,"king");
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers("king", {start:0, end:3}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turn',
      frames: [{key:"king", frame: 4}],
      frameRate: 20
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers("king", {start:5, end:8}),
      frameRate: 10,
      repeat: -1
    });
    player.body.setGravityY(200);
    this.physics.add.collider(player, platforms);
    cam.startFollow(target=player, roundPixels=false, lerpX=0.5, lerpY=0.5, offsetX=-280, offsetY=150);
    //cam.startFollow(player); // most basic version of camera
    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
    beatText = this.add.text(16, 48, 'X', { fontSize: '32px', fill: '#FFF' });
    player_last_x = player.x;
  },
  update:function(){
    // if (cursors.left.isDown)
    // {
    //   //player.setVelocityX(-160);
    //   player.anims.play('left', true);
    // }
    
    player.setVelocityX(hero_move);
    player.anims.play('right', true);
    
    if (cursors.up.isDown && player.body.touching.down) // short hop, results in 288.5-261.611111111111
    {
      player.anims.play('turn', true);
      player.setVelocityY(-150);
      console.log(`jumpStart:${player.x}`); //DEV // 4550 >  4665
    }
    else if (cursors.space.isDown && player.body.touching.down) // tall hop, results in 288.5-212.44444444444437
    {
      player.anims.play('turn', true);
      player.setVelocityY(-250);
      console.log(`jumpStart:${player.x}`); //DEV // 14785 > 14975
    }
    else if (cursors.right.isDown) // slam
    {
      player.anims.play('left', false);
      this.add.image(player.x,player.y,"temp"); // using dead square just to indicate where slam used
    }
    else if (cursors.down.isDown) // drop
    {
      player.anims.play('left', false);
      this.add.image(player.x,player.y,"temp"); // using dead square just to indicate where drop used
    }
    // counting beats
    beat_counter += 1;
    if (beat_counter==30) {
      beatText.setText('O');
      beat_counter = 0;
      console.log(`dX:${player.x - player_last_x}`); // this is a temporary visual for dev
      //`Fifteen is ${five + ten} and not ${2 * five + ten}.`
      player_last_x = player.x;
    } else {
      beatText.setText('X');
    }
    // dev testing
    if(player.y < player_max_y && player.x > 450) {
      player_max_y = player.y;
      console.log(`maxY:${player.y},currX:${player.x}`);
    }
  }
});

function moveUsed (move)
{
  // if move used matches what we wanted here, yay!
  // if we didnt want anything here, move goes off but no benefit
  // add to score for correctly timed moves (+- 5 frames)
}

function recovery(dunno)
{
  // is the player out of timing / stuck on a wall?
  // if so, warp them forward to intended position
  // use player.alpha to flash in and out for injury notif that is seperate from actual animation cycles.
  // subtract life?
}