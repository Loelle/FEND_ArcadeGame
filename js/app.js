var lives = 4;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
	// Enemy coordinates
	this.x = x;
    this.y = y;	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = Math.floor(Math.random() * 520);
    this.x += this.speed * dt;
    // Reset enemy position and speed when is off canvas
    if (this.x > 550) {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 520);
    }
    // Check for collision
    if (this.x < player.x + 30 && this.x + 30 > player.x && this.y < player.y + 50 && this.y + 50 > player.y) {
        player.lives --;
        if (player.lives < 1) {
            player.loose();
        }
        player.renderLives();
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-pink-girl.png';
    this.score = 0;
    this.lives = lives;
};

Player.prototype.update = function() {
    // If player reaches water
    if (player.y < 72) {
        this.score += 10;
        player.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.renderLives = function() {
    for (var i = 0; i < this.lives; i++) {
        var heartWidth = 30;
        var heartHeight = 51;
        ctx.drawImage(Resources.get('images/Heart.png'), i * 30, 0, heartWidth, heartHeight);
    }
};

Player.prototype.renderScore = function() {
    ctx.font = "20px Comic Sans MS"
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText("Score: "+ player.score, 500, 30);
}

Player.prototype.handleInput = function(direction) {
    //vertical moves
    if (direction == 'up' && this.y > -10) {
        this.y -= 82;
    }
    if (direction == 'down' && this.y < 400) {
        this.y += 82;
    }
    //horizontal moves
    if (direction == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (direction == 'right' && this.x < 400) {
        this.x += 100;
    }
};

// Reset the player position to the starting point
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

// 
Player.prototype.loose = function () {
    alert('Game Over');
    this.lives = 4;
    this.score = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(50, 140);
var enemy2 = new Enemy(150, 60);
var enemy3 = new Enemy(250, 230);
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
