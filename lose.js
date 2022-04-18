var spacebar;
var Lose = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Lose" });
    },
    init: function(data) {
        this.message = data.message;
    },
    preload: function() {},
    create: function() {
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        var text = this.add.text(
            400, 
            360, 
            this.message, 
            {
                fontSize: 50,
                color: "#FFFFFF",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    },
    update: function() {
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            
            this.scene.start('SceneOne');
        }
    }
});