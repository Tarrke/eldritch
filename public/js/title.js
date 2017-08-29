// title.js

var titleState = {
    player: {
    },
    create: function() {
        var self = this;
        //~ var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        //~ logo.anchor.setTo(0.5, 0.5);
        
        game.stage.backgroundColor = '#cccccc';
        game.stage.disableVisibilityChange = true;
        console.log("Initialising gameScene");
        gameScene = game.add.renderTexture(game.width,game.height);
        game.add.sprite(0,0,gameScene);
        floorSprite = game.make.sprite(0,0,'tile1');
        wallSprite = game.make.sprite(0,0,'tile2');
        
        self.player = game.add.sprite(200,200, 'character');
        self.player.scale.setTo(0.5,0.5);
        self.player.frame = 1;
        game.add.existing(self.player);
        self.player.anchor.setTo(.5, 1);
        
        self.player.animations.add('walk', [57, 58, 59, 60, 61, 62, 63, 64], 6);
        self.player.animations.play('walk');
        
        
        createLevel();
        
        var nameLabel = game.add.text(160,80, "Cliquer n'importe où pour démarrer", {
            font: '14px Space Mone', fill: '#ffffff'
        });
        game.input.activePointer.capture = true;
    },
    update: function() {
        var self = this;
        
        self.player.animations.play('walk');
        
        if( game.input.activePointer.isDown ) {
            //~ game.state.start('play');
        }
    }
};
