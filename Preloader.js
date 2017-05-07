
Tronera.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

Tronera.Preloader.prototype = {

	preload: function () {
		this.showLoadBar();
		this.loadAssets();
	},

	create: function () {
		this.showFullBar();
	},

	update: function () {
		this.state.start('MainMenu');
	},

	loadAssets: function(){
				//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		// this.load.image('titlepage', 'images/title.jpg');
		// this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		// this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		// this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here
	},

	showLoadBar: function(){
		this.background = this.add.sprite(0, 0, Tronera.BACKGROUND);
		this.preloadBar = this.add.sprite(300, 400, Tronera.LOADER);

		this.load.setPreloadSprite(this.preloadBar);

	},

	showFullBar: function(){
		this.preloadBar.cropEnabled = false;
	},


};
