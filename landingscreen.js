// state to display instructions and a play button
var TitleScreen = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, { "key": "TitleScreen" });
  },
  init: function() {},
  preload:function(){
    this.load.image("demo_instruct","demo_instruct.png");//800x600
    // this.load.image("ground","ground.png"); //150x100
    // //this.load.image("chest","chest.png");//16x13
    // //this.load.image("ladder","ladder.png");//16x48
    // this.load.spritesheet("king", "dude.png", { frameWidth: 17, frameHeight: 23 });
  },
  create:function(){
    // for (let i = 0; i<36;i++) {
    //   this.add.image(500+1000*i,300,"bg"); //1000x600
    // } // all phaser images are positioned by their center
    // //camera 
    // this.cameras.main.setSize(800, 600);
    // const cam = this.cameras.add(0, 0, 800, 600);
    // // use . setOrigin after .image >> .setOrigin(0,0)
    // // phaser builds in order, so top image last
    // console.log("hi im state1");
    // this.physics.world.setFPS(fps);
    // platforms = this.physics.add.staticGroup();
    // for (let i = 0; i<240;i++) {
    //   platforms.create(75+i*150,350,"ground");
    // }
    // platforms.create(1690,330,"ground"); // test short hop
    // platforms.create(3265,285,"ground"); // test long hop
    // //platforms.create(x,y,"tag");//.setScale(2).refreshBody(); // setScale doubles size, need .refreshBody because we've changed a static body
    // console.log("map scene1 made");
    // player = this.physics.add.sprite(150,250,"king");
    // player.setBounce(0.2);
    // player.setCollideWorldBounds(false);
    // this.anims.create({
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers("king", {start:0, end:3}),
    //   frameRate: 10,
    //   repeat: -1
    // });
    // this.anims.create({
    //   key: 'turn',
    //   frames: [{key:"king", frame: 4}],
    //   frameRate: 20
    // });
    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers("king", {start:5, end:8}),
    //   frameRate: 10,
    //   repeat: -1
    // });
    // this.anims.create({
    //   key: 'slam',
    //   frames: [{key:"king", frame: 10}],
    //   frameRate: 20
    // });
    // this.anims.create({
    //   key: 'down',
    //   frames: [{key:"king", frame: 11}],
    //   frameRate: 20
    // });
    // player.body.setGravityY(200);
    // this.physics.add.collider(player, platforms);
    // cam.startFollow(target=player, roundPixels=false, lerpX=0.5, lerpY=0.5, offsetX=-280, offsetY=150);
    // //cam.startFollow(player); // most basic version of camera
    // cursors = this.input.keyboard.createCursorKeys();
    // scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
    // beatText = this.add.text(16, 48, 'X', { fontSize: '32px', fill: '#FFF' });
    // player_last_x = player.x;
  },
  update:function(){
  //   player.setVelocityX(hero_move);
  //   player.anims.play('right', true);
    
  //   if (cursors.up.isDown && player.body.touching.down) // short hop, results in 288.5-261.611111111111
  //   {
  //     player.anims.play('turn', true);
  //     player.setVelocityY(-150);
  //     console.log(`jumpStart:${player.x}`); //DEV // 4550 >  4665
  //   }
  //   else if (cursors.space.isDown && player.body.touching.down) // tall hop, results in 288.5-212.44444444444437
  //   {
  //     player.anims.play('turn', true);
  //     player.setVelocityY(-250);
  //     console.log(`jumpStart:${player.x}`); //DEV // 14785 > 14975
  //   }
  //   else if (cursors.right.isDown) // slam
  //   {
  //     player.anims.play('slam', false);
  //     //this.add.image(player.x,player.y,"slam"); 
  //   }
  //   else if (cursors.down.isDown) // drop
  //   {
  //     player.anims.play('down', false);
  //     //this.add.image(player.x,player.y,"down"); 
  //   }
  //   // counting beats
  //   beat_counter += 1;
  //   if (beat_counter==30) {
  //     beatText.setText('O');
  //     beat_counter = 0;
  //     console.log(`dX:${player.x - player_last_x}`); // this is a temporary visual for dev
  //     //`Fifteen is ${five + ten} and not ${2 * five + ten}.`
  //     player_last_x = player.x;
  //   } else {
  //     beatText.setText('X');
  //   }
  //   // dev testing
  //   if(player.y < player_max_y && player.x > 450) {
  //     player_max_y = player.y;
  //     console.log(`maxY:${player.y},currX:${player.x}`);
  //   }
  //   if(player.x > 5000) {
  //     player.x = 500;
  //     console.log("loop at 5k reached");
  //   }
  }
});

// if (score == 120) {
//   console.log(this.scene.get('SceneTwo'));
//   this.scene.start("SceneTwo");
// }