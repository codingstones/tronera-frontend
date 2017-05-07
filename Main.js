window.onload = function() {

  var addStates = function (game){
    game.state.add('Boot', Tronera.Boot);
    game.state.add('Preloader', Tronera.Preloader);
    game.state.add('MainMenu', Tronera.MainMenu);
    game.state.add('Game', Tronera.Game);
  };

  var initialize = function(){
    return new Phaser.Game(1024, 768, Phaser.AUTO, 'tronera');
  };

  var boot = function(game){
    game.state.start('Boot');
  };

  var game = initialize();
  addStates(game);
  boot(game);
  
};