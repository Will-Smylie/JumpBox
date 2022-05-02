var globalVol = 0.2;
var spacebar;

// state to display instructions and a play button
var TitleScreen = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function() {
    Phaser.Scene.call(this, { "key": "TitleScreen" });
  },
  init: function() {},
  preload:function(){
    this.load.image("demo_instruct","demo_instruct.png");//800x600
    this.load.image("dot","vol_slider_knob.png"); //20x20
    this.load.image("up2","sig2_bigup.png"); //16x27
    //this.load.audio("track1","walkingwithswagger.mp3")
    // //this.load.image("chest","chest.png");//16x13
    // //this.load.image("ladder","ladder.png");//16x48
    // this.load.spritesheet("king", "dude.png", { frameWidth: 17, frameHeight: 23 });
  },
  create:function(){
    this.add.image(500,420,"up2");
    this.add.text(20, 50, 'Main Menu and Instructions',{ fontSize: '32px', fill: '#FFF' });
    this.add.text(20, 400, 'Jump when you are right\nbeneath this arrow!',{ fontSize: '32px', fill: '#FFF' });
    //this.add.image(400,300,"demo_instruct"); //800x600
    //var volKnob = this.add.sprite(600,324,"dot");
    //volKnob.inputEnabled = true;
    //volKnob.input.enableDrag(true);
    //var bgTrack = this.sound.add("track1",{volume: globalVol});
    this.add.text(20, 150, 'Press up-arrow to JUMP\nPress right-arrow to BOX\nPress spacebar to play/restart\nduring level\n\nObjective: Try to complete the level before the timer\nfinishes counting down!',{ fontSize: '20px', fill: '#FFF' });
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  },
  update:function(){
    if (Phaser.Input.Keyboard.JustDown(spacebar))
    {
        this.scene.start('SceneOne');
        //bgTrack.stop();
    }
  
  }
  
});

//https://phaser.io/examples/v3/view/audio/html5-audio/basic-playback-and-events
//https://phaser.io/examples/v2/input/drag
//https://phaser.discourse.group/t/audio-management/5235/2
//https://stackoverflow.com/questions/51601926/how-to-set-volume-in-phaser-3
//https://newdocs.phaser.io/docs/3.55.2/Phaser.Sound.Events.LOOP
//https://phaser.io/examples/v3/view/audio/web-audio/play-sound-on-keypress
// if (score == 120) {
//   console.log(this.scene.get('SceneTwo'));
//   this.scene.start("SceneTwo");
// }