Tronera.Game = function (game) {
    this.card;
    this.tweet;
    this.activeZone;
    this.draggedAt;
};

Tronera.Game.prototype = {

    create: function () {
        this.setBackground();
        this.createCenteredCard();
        this.createTweet();
        this.createActiveZone();
    },

    update: function () {
        this.shrinkWithDistance();
        this.positionText();
        this.physics.arcade.overlap(this.card, this.activeZone, this.collision, null, this);
    },

    shrinkWithDistance: function(){
        factor=this.computeFactor();
        this.card.scale.setTo(factor,factor);
        this.tweet.fontSize = 12 * factor;
    },

    computeFactor: function(){
        factor=Math.max(this.xShrink(),this.yShrink());
        return (100 - factor)/100;
    },

    xShrink: function () {
        var halfWidth= (this.world.width / 2);
        var pathLength = Math.abs(this.centerOfCard().x - this.centerOfWorld().x);
        var factor = Math.floor((pathLength / halfWidth) * 100);
        return  factor;
    },

    yShrink: function () {
        var halfHeight= (this.world.height / 2);
        var pathLength = Math.abs(this.centerOfCard().y - this.centerOfWorld().y);
        var factor = Math.floor((pathLength / halfHeight) * 100);
        return  factor;
    },

    collision: function() {
        console.log("COLLISION!");
    },

    makeCard: function (){
        var width = 400;
        var height = 200
        var graphic = this.game.add.bitmapData(width, height);

        graphic.ctx.beginPath();
        graphic.ctx.rect(0, 0, width, height);
        graphic.ctx.fillStyle = '#CCCCCC';
        graphic.ctx.fill();

        return graphic
    },

    createCenteredCard: function(){
        var x=this.world.centerX
        var y=this.world.centerY
        var card = this.add.sprite(x, y, this.makeCard());
        card.inputEnabled = true;
        card.input.enableDrag();
        this.physics.arcade.enable(card);
        card.anchor.setTo(0.5, 0.5);
        card.events.onDragStart.add(this.registerTime,this);
        card.events.onDragStop.add(this.startMovement,this);
        card.body.collideWorldBounds = true;
        this.card = card;
    },

    registerTime: function(){
        this.draggedAt = this.time.time;
    },

    startMovement: function(){
        var elapsed = this.time.elapsedSince(this.draggedAt);
        var vector= this.card.input.dragStartPoint.subtract(this.card.x,this.card.y);
        this.card.body.velocity.x = this.computeVelocity(vector.x , elapsed);
        this.card.body.velocity.y = this.computeVelocity(vector.y , elapsed);
    },

    computeVelocity:function(dimension,elapsed){
        var inPixelsPerMillis= (dimension / elapsed);
        var inPixelsPerSecond= inPixelsPerMillis * 1000;
        return inPixelsPerSecond * Tronera.INVERSION_FACTOR;
    },

    createTweet: function(){
        var style = {   font: "12px Arial",
                        fill: "#000000",
                        wordWrap: true,
                        wordWrapWidth: this.card.width,
                        align: "left"};

        this.tweet = this.add.text( 0, 0,this.retrieveContent() , style)
        this.tweet.anchor.set(0.5);
        this.positionText();
    },

    createActiveZone: function(){
        this.activeZone = this.add.sprite(0, 0, Tronera.Twitter.RETWEET);
        this.activeZone.scale.setTo(.2, .2);
        this.physics.arcade.enable(this.activeZone);
    },

    centerOfCard: function(){
        return {
            x: this.card.centerX,
            y: this.card.centerY
        }
    },

    centerOfWorld: function(){
        return {
            x: this.world.centerX,
            y: this.world.centerY
        }
    },

    retrieveContent: function(){
        return "Let's clarify:\n * Jira is not Agile\n * Open Source is not Free\n * Using cloud is not DevOps\n * Rituals is not Scrum*\n Developed is not Done"
    },

    positionText: function(){
        this.tweet.x = this.centerOfCard().x;
        this.tweet.y = this.centerOfCard().y;
    },

    setBackground: function(){
        this.background = this.add.sprite(0, 0, Tronera.BACKGROUND);
    }

};
