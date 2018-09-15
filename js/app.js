/*jshint esversion: 6 */
let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// Modal displayed
const modalText = document.querySelector(".modalText");
//counting scores
let score = document.querySelector(".moves");
let move = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {   
     this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
const attacker1 = new Enemy (-200, 100, 90);
const attacker2 = new Enemy (-150, 120, 220);
const attacker3 = new Enemy (-100, 150, 350);
const attacker4 = new Enemy (-100, 200, 100);
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies= [];
allEnemies.push(attacker1, attacker2, attacker3, attacker4);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(navDr) {
        switch (navDr) {
            case "up":
              this.y -= 50;
              break;
            case "down":
            if(this.y < 400) {
                this.y += 50;
            }
              break;
            case "left":
            if(this.x > 0) {
                this.x -= 50;
            }
              break;
            case "right":
            if(this.x < 400) {
                this.x += 50;
            }
              break;
        }
    }

    update() {
        // Collision detection
      for (let enemy of allEnemies) {
        let deltax = this.x - enemy.x - 15;
        let deltay = this.y - enemy.y - 20;
        let distance = Math.sqrt(deltax * deltax + deltay * deltay);
        if (distance < 56) {
            this.reduceScores();
            this.reset();
        }
      }
      // Did player win
      if (this.y < 10) {
        this.addScores();
        this.reset();
      }
    }

    reset() {
        this.x = 200;
        this.y = 350;
    }

    //congratulations popup
    modalDisplayed() {
        modal.style.display = "block";
        modalText.innerHTML = `<p><h2>Congratulations <h2>You Won!</p>`;
        this.closed();
    }

    closed() {
        span.addEventListener('click', function(){
            modal.style.display = "none";
            // move scores back to zero
            move = '';
            score.innerHTML = `Scores ${move}`;
        });
    }

    //when player wins then
    addScores() {
        move += 5;
        score.innerHTML = `Scores: ${move}`;
        this.finalWins();
    }

    //when player collides with enemy it reduces score
    reduceScores() {
        move -= 5;
        score.innerHTML = `Scores: ${move}`;
    }

    finalWins() {
        if(move === 20) {
            this.modalDisplayed();
        }
    }
    
}

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        41: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});