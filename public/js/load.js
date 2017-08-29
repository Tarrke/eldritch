var loadState = {
    preload: function() {
        /* Load graphics assets */
        game.load.image('logo', 'images/phaser.png');
        game.load.image('tile1', 'tiles/000.png');
        game.load.image('tile2', 'tiles/001.png');
        
        game.load.spritesheet('character', 'characterSheets/cowboy.png', 128, 128, 140);
        
        /* Load audio assets */
    },
    create: function() {
        game.state.start('title');
    }
};
