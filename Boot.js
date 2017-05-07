Tronera.Boot = function (game) {

};

Tronera.Boot.prototype = {

    init: function () {
        this.notMultiTouch();        
        this.pauseOnGameTabLoosingFocus();
        this.beResponsiveBydevice();
    },

    preload: function () {
        this.load.image(Tronera.BACKGROUND, 'images/background.jpg');
        this.load.image(Tronera.LOADER, 'images/loader.png');
    },

    create: function () {
        this.state.start('Preloader');
    },

    notMultiTouch: function(){
        this.input.maxPointers = 1;
    },

    pauseOnGameTabLoosingFocus: function(){
        this.stage.disableVisibilityChange = true;
    },

    beResponsiveBydevice: function(){
        this.scale.pageAlignHorizontally = true;
        this.adaptWhenMobile();
    },

    adaptWhenMobile: function(){
        if (this.game.device.desktop)return;       
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 1024, 768);
        this.scale.forceLandscape = true;    
    }

};
