// game.js

var game = new Phaser.Game(480, 360, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);

game.state.start('boot');
