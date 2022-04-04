
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
     default: 'arcade',
      arcade: {
          gravity: { y: 300 }
      }
  },
  scene: [ SceneOne, Lose ]
};

var game = new Phaser.Game(config);

// game.scene.add("state1", demogame.state1);
// game.scene.add("state2", demogame.state2);
// game.scene.start("state1");