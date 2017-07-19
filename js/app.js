
// Enemies our player must avoid
var Enemy = function(x, y) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = getRndInteger(100, 300);
};

//generates random integer number between two given numbers
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//checks weather collision between enemy and player happens
Enemy.prototype.checkCollision = function() {
  var boxEnemy = {x: this.x, y: this.y, width : 80, height: 66};
  var boxPlayer = {x: player.x, y: player.y, width: 70, height: 50};

  if (boxEnemy.x < boxPlayer.x + boxPlayer.width &&
    boxEnemy.x + boxEnemy.width > boxPlayer.x &&
    boxEnemy.y < boxPlayer.y + boxPlayer.height &&
    boxEnemy.height + boxEnemy.y > boxPlayer.y) {
    document.getElementsByClassName("game-over")[0].style.display = "block";
    document.getElementsByTagName('canvas')[0].style.display = "none";
    player.reset();
    score = 0;
    }
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;

  this.checkCollision();

  //resets the position of enemy after reaching the end of canvas
  if (this.x > 505) {
      this.x = getRndInteger(-250, -5);
  }
};

//Player
var Player = function(x, y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function(avater) {
  ctx.drawImage(Resources.get(avater), this.x, this.y);
};

//handles keyboard inputs and moves player around the canvas
Player.prototype.handleInput = function(allowedKeys) {
  switch (allowedKeys) {
    case 'left':
      this.x -= 101;
      if (this.x < 0){
        this.x = 0;
      }
      break;
    case 'right':
      this.x += 101;
      if (this.x > 415){
        this.x = 415;
      }
      break;
    case 'up':
      this.y -= 83;
      break;
    case 'down':
      this.y += 83;
      if (this.y > 415) {
        this.y = 415;
      }
      break;
    }
};

//checks if player reached the water or safezone and rewards the player
//with score.
var score = 0;
Player.prototype.safeZone = function() {
  if (this.y < 5){
    score += 1;
    document.getElementById("my-score").innerHTML= score;
    this.reset();
    //adds new enemies with the increase in score
    if (score == 2) {
      allEnemies.push(new Enemy(-60, 60));
    } else if (score == 4) {
      allEnemies.push(new Enemy(10, 230));
    }
  }
};

//randomly resets player's position
Player.prototype.reset = function (){
  var xPos = [0, 101, 202, 303, 404];
  var yPos = [332, 415];
  this.x = xPos[Math.floor(Math.random() *5)];
  this.y = yPos[Math.floor(Math.random() *2)];
};

Player.prototype.update = function(dt) {
  this.safeZone();
};

var avater = 'images/char-boy.png';
function getAvater(){
  return avater;
}

//sets the value of avater
function setAvater(gen) {
  avater = gen;
}

var image = ['images/char-boy.png', 'images/char-cat-girl.png',
'images/char-horn-girl.png', 'images/char-pink-girl.png',
'images/char-princess-girl.png'];

document.getElementsByClassName("boy")[0].addEventListener("click", function(){
  setAvater(image[0]);
});

document.getElementsByClassName("cat-girl")[0].addEventListener("click", function(){
  setAvater(image[1]);
});

document.getElementsByClassName("horn-girl")[0].addEventListener("click", function(){
  setAvater(image[2]);
});

document.getElementsByClassName("pink-girl")[0].addEventListener("click", function(){
  setAvater(image[3]);
});

document.getElementsByClassName("princess-girl")[0].addEventListener("click", function(){
  setAvater(image[4]);
});

document.getElementsByTagName("button")[0].addEventListener("click", function(){
  document.getElementsByClassName("scores")[0].style.display = "block";
  document.getElementsByTagName("canvas")[0].style.display = "inline-block";
  document.getElementsByClassName("players-avater")[0].style.display = "none";
});

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//INSTANTIATION
var allEnemies = [
  new Enemy(0, 60),
  new Enemy(360, 150),
  new Enemy(250,230)
];

var player = new Player(202, 415);