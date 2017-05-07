Tronera.Game = function (game) {
    this.card;
    this.tweet;
    this.item;
};

Tronera.Game.prototype = {

    create: function () {
        this.setBackground();
        this.createCenteredCard();
        this.createTweet();
    },

    update: function () {
        this.positionText();
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
        card.events.onDragStop.add(this.startMovement,this);
        card.body.collideWorldBounds = true;
        this.card = card;
    },

    startMovement: function(){
        var vector= this.card.input.dragStartPoint.subtract(this.card.x,this.card.y);
        this.card.body.velocity.x = vector.x * -1;
        this.card.body.velocity.y = vector.y * -1; 
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

    centerOfCard: function(){
        return {
            x: this.card.centerX,
            y: this.card.centerY
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
