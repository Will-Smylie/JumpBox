var globalVol = 0.2;

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
    //this.load.audio("track1","walkingwithswagger.mp3")
    // //this.load.image("chest","chest.png");//16x13
    // //this.load.image("ladder","ladder.png");//16x48
    // this.load.spritesheet("king", "dude.png", { frameWidth: 17, frameHeight: 23 });
  },
  create:function(){
    this.add.image(400,300,"demo_instruct"); //800x600
    var volKnob = this.add.sprite(600,324,"dot");
    volKnob.inputEnabled = true;
    volKnob.input.enableDrag(true);
    var bgTrack = this.sound.add("track1",{volume: globalVol});
  },
  update:function(){
    if (cursors.r.isDown)
    {
      console.log(this.scene.get('SceneOne'));
      this.scene.start("SceneOne");
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