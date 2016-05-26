/*
 * This is my attempt to create a responsive web design, a full-screen html-canvas-game.
 * For that reason I am declaring upfront two variables that I will use many times throughout this project.
 * The two variables are wiw and wih, for window.innerWidth and window.innerHeight respectively.
 * I am declaring them upfront to reduce a number of calculations performed by JavaScript.
 * At the same time, I am adding an event listener to check if a user is resizing a (browser's) window.
 * If it does, this will update wiw and wih variables used later in the code.
 * For this project I will be using breakpoints at 505 and 808 pixels.
 * That may not be the best choice in real world but it serves a purpose for this project.
 */
var wiw,
    wih,
    numberOfBugs,
    numberOfStealingBushes,
    numberOfExtras;
window.addEventListener("resize", checkWindowResize, false);

function checkWindowResize() {
    wiw = window.innerWidth;
    wih = window.innerHeight;
    // I am using parentheses to make it clear what I am doing but technically they are not necessary for conditional ternary operator.
    // Bugs a.k.a Enemies
    numberOfBugs = (wiw <= 505) ? 2 : ((wiw <= 808) ? 3 : Math.ceil(wih / 55));
    // Some weird small creatures are hiding in the moving bushes stealing Extras from the player.
    numberOfStealingBushes = (wiw <= 505) ? 2 : ((wiw <= 808) ? 3 : Math.ceil(wiw / 400));
    // Extras: stars, keys and hearts.
    numberOfExtras = (wiw <= 505) ? 2 : ((wiw <= 808) ? 4 : Math.ceil(wih / 83));
}
checkWindowResize();
// I am making a long story short to show to a user how to navigate.
// I do not want to insult anyone by placing text above the arrows. (Something like "Move with these")
function drawNavigation() {
    // I am using the local variables because if I don't a user has to refresh a page to apply the effect.
    // That would be not a responsive design if she or he has to do it manually.
    // I am repeating myself but I am trying to make life of you, who is checking my work, as painless as possible.
    // I am using parentheses to make it clear what I am doing but technically they are not necessary for conditional ternary operator.
    var xNavPosition = (wiw <= 505) ? wiw - 93 : ((wiw <= 808) ? wiw - 150 : wiw - 174),
        yNavPosition = (wiw <= 505) ? wih - 67 : ((wiw <= 808) ? wih - 95 : wih - 131),
        navWidth = (wiw <= 505) ? 83 : ((wiw <= 808) ? 125 : 166),
        navHeight = (wiw <= 505) ? 57 : ((wiw <= 808) ? 85 : 114)
        // Just to be consistent, I will create navImage variable but it is not necessary since it is used only here.
        // Image Source: http://www.101computing.net/wp/wp-content/uploads/arrowKeys.png
    navImage = 'images/navigation.png';
    ctx.drawImage(Resources.get(navImage), xNavPosition, yNavPosition, navWidth, navHeight);
    // To play a video.
    var xMusicNotePosition = 13, //(wiw <= 505) ? wiw - 93 : ((wiw <= 808) ? wiw - 150 : wiw - 200),
        yMusicNotePosition = (wiw <= 505) ? wih - 38 : ((wiw <= 808) ? wih - 53 : wih - 73),
        musicNoteWidth = (wiw <= 505) ? 92 : ((wiw <= 808) ? 137 : 183),
        musicNoteHeight = (wiw <= 505) ? 26 : ((wiw <= 808) ? 39 : 52)
        // http://i.imgur.com/ZMRlnUk.png
    musicNoteImage = 'images/play-video.png';
    ctx.drawImage(Resources.get(musicNoteImage), xMusicNotePosition, yMusicNotePosition, musicNoteWidth, musicNoteHeight);
}
// Sounds used for the game.
// Since all major browsers can use mp3 maybe the other sound types added here are not necessary but I will leave them here for “just-in-case”.
// Source: http://www.freesound.org/   User: plasterbrain   Sound: 237422__plasterbrain__hover-1
/*var starSound = new Audio();
if (starSound.canPlayType('audio/mpeg;')) {
    starSound.src = 'sounds/hover.mp3';
} else if (starSound.canPlayType('audio/ogg;')) {
    starSound.src = 'sounds/hover.ogg';
} else {
    starSound.src = 'sounds/hover.wav';
}
// Source: http://www.freesound.org/   User: simon-rue   Sound: 61847__simon-rue__boink-v3
var bugSound = new Audio();
if (bugSound.canPlayType('audio/mpeg;')) {
    bugSound.src = 'sounds/boink.mp3';
} else if (bugSound.canPlayType('audio/ogg;')) {
    bugSound.src = 'sounds/boink.ogg';
} else {
    bugSound.src = 'sounds/boink.wav';
}
// Source: http://www.freesound.org/   User: andreangelo   Sound: 246188__andreangelo__bite-2
var treeSound = new Audio();
if (treeSound.canPlayType('audio/mpeg;')) {
    treeSound.src = 'sounds/bite.mp3';
} else if (treeSound.canPlayType('audio/ogg;')) {
    treeSound.src = 'sounds/bite.ogg';
} else {
    treeSound.src = 'sounds/bite.wav';
}
// for the navigation buttons (to move Char-boy with a mouse click)
// Source: http://www.freesound.org/   User: willy_ineedthatapp_com   Sound: 167326__willy-ineedthatapp-com__click
var click1 = new Audio();
if (click1.canPlayType('audio/mpeg;')) {
    click1.src = 'sounds/click1.mp3';
} else if (click1.canPlayType('audio/ogg;')) {
    click1.src = 'sounds/click1.ogg';
} else {
    click1.src = 'sounds/click1.wav';
}
// for the play button (game start button)
// Source: http://www.freesound.org/   User: adcbicycle   Sound: 13954__adcbicycle__2
var click2 = new Audio();
if (click2.canPlayType('audio/mpeg;')) {
    click2.src = 'sounds/click2.mp3';
} else if (click2.canPlayType('audio/ogg;')) {
    click2.src = 'sounds/click2.ogg';
} else {
    click2.src = 'sounds/click2.wav';
}
// for the stop button (YouTube video stop button)
// Source: http://www.freesound.org/   User: lebcraftlp   Sound: 242429__lebcraftlp__camera-click
var cameraClick = new Audio();
if (cameraClick.canPlayType('audio/mpeg;')) {
    cameraClick.src = 'sounds/camera-click.mp3';
} else if (cameraClick.canPlayType('audio/ogg;')) {
    cameraClick.src = 'sounds/camera-click.ogg';
} else {
    cameraClick.src = 'sounds/camera-click.wav';
}*/
// Enemies our player must avoid
// After playing with the numbers, for some time, I decided to leave this combination of them.
var MIN_1 = 50,
    MAX_1 = 150,
    MIN_2 = 200,
    MAX_2 = 300;
var Enemy = function(xPosition, yPosition, width, height, speed) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xPosition;
    this.y = yPosition;
    // The width and height are used for the collision detection.
    // Maybe they and speed still need some balancing but this is not bad. (my opinion)
    this.width = 76;
    this.height = 67;
    // This function is straight from MDN.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    minSpeed = Math.floor(Math.random() * (MAX_1 - MIN_1 + 1)) + MIN_1;
    maxSpeed = Math.floor(Math.random() * (MAX_2 - MIN_2 + 1)) + MIN_2;
    this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
var bugInitialX = 0;
var bugInitialY = wih / 83;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    // Here I am checking if a bug (an enemy in the game) moved (right) from the screen.
    // If that is true, a bug should be placed at some random row back on the screen but in column "zero".
    if (this.x > wiw) {
        this.x = Math.floor(Math.random() * bugInitialX) * 101;
        this.y = Math.floor(Math.random() * bugInitialY) * 83 + 25;
    } else {
        this.x += (this.speed * dt);
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // To make it more readable, I am avoiding alternative if syntax (conditional ternary operator) here.
    // Other way for me to do the same would be by using a variable for the bug images.
    if (wiw <= 505) {
        ctx.drawImage(Resources.get('images/enemy-bug-yellow.png'), this.x, this.y);
    } else if (wiw <= 808) {
        ctx.drawImage(Resources.get('images/enemy-bug-green.png'), this.x, this.y);
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};
// The part below is just copy/paste of the Enemy part adjusted for the moving bushes (The creatures in the bushes who steal from the player)
// Stealing Bushes our player must avoid
var SB_MIN1 = 50,
    SB_MAX1 = 150,
    SB_MIN2 = 200,
    SB_MAX2 = 300;
var stealingBushes = function(xPosition, yPosition, width, height) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/Tree Short.png';
    this.x = xPosition;
    this.y = yPosition;
    this.width = 76;
    this.height = 67;
    // This function is straight from MDN.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var minSpeed = Math.floor(Math.random() * (SB_MAX1 - SB_MIN1 + 1)) + SB_MIN1;
    var maxSpeed = Math.floor(Math.random() * (SB_MAX2 - SB_MIN2 + 1)) + SB_MIN2;
    this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};
// Update the stealing bushes' position, required method for game
// Parameter: dt, a time delta between ticks
var stealingBushesInitialX = Math.floor(Math.random() * 101);
var stealingBushesInitialY = wih;
stealingBushes.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    // Here I am checking if a moving bush (a deadly enemy in the game) moved (right or below) from the screen.
    // If that is true, a moving bush should be placed at some random position back on the screen.
    if (this.x > wiw) {
        this.x = Math.floor(Math.random() * stealingBushesInitialX) * 101;
        this.y = stealingBushesInitialY + 25;
    } else {
        this.x += this.speed * dt * Math.floor(Math.random() + 0.6);
    }
    if (this.y < -59) {
        this.y = wih + 25;
        this.x = Math.floor(Math.random() * stealingBushesInitialX) * 101;
    } else {
        var someRandomNumber = Math.floor(Math.random() + 0.3);
        this.y -= this.speed * dt * someRandomNumber;
    }
};
// Draw the stealing bushes on the screen, required method for game
stealingBushes.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// The part below is just copy/paste of the Enemy part adjusted for the extras.
// The extras are things that the player can collect and can be useful to developed a game story.
var EX_MIN1 = 50,
    EX_MAX1 = 150,
    EX_MIN2 = 200,
    EX_MAX2 = 300;
var Extras = function(xPosition, yPosition, width, height) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/Star.png';
    this.x = xPosition;
    this.y = yPosition;
    this.width = 76;
    this.height = 67;
    // This function is straight from MDN.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var minSpeed = Math.floor(Math.random() * (EX_MAX1 - EX_MIN1 + 1)) + EX_MIN1;
    var maxSpeed = Math.floor(Math.random() * (EX_MAX2 - EX_MIN2 + 1)) + EX_MIN2;
    this.speed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};
// Update the extras' position, required method for game
// Parameter: dt, a time delta between ticks
var extrasInitialX = wiw / 101;
var extrasInitialY = wih / 83;
Extras.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    // Here I am checking if an extra (the stars, keys and hearts in the game) moved (left or below) from the screen.
    // If that is true, an extra should be placed at some random position back on the screen.
    if (this.x > wiw) {
        this.x = Math.floor(Math.random() * extrasInitialX) * 101;
        this.y = Math.floor(Math.random() * extrasInitialY) * 83 + 25;
    } else {
        this.x -= (this.speed * dt);
    }
    if (this.y > wih) {
        this.y = Math.floor(Math.random() * extrasInitialY) * 83 + 25;
        this.x = Math.floor(Math.random() * extrasInitialX) * 101;
    } else {
        this.y += (this.speed * dt);
    }
};
// Draw the extras on the screen, required method for game
Extras.prototype.render = function() {
    // To make it more readable, I am avoiding alternative if syntax (conditional ternary operator) here.
    // Other way for me to do the same would be by using a variable for the bug images.
    if (wiw <= 505) {
        ctx.drawImage(Resources.get('images/Heart.png'), this.x, this.y);
    } else if (wiw <= 808) {
        ctx.drawImage(Resources.get('images/Key.png'), this.x, this.y);
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};
// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var playerInitialX = wiw / 101;
var Player = function(x, y, width, height) {
    // This will be player's initial position
    // to place the player in the first row but not always in the same column
    this.sprite = 'images/char-boy.png'
    this.x = Math.floor(Math.random() * playerInitialX) * 101;
    // -59(px) because of that transparent part above the characters that is 59 pixel high.
    this.y = -59;
    this.width = 76;
    this.height = 76;
}
Player.prototype.update = function() {
        // This conditional checking is here to keep the player visible on the screen, at least his ear :-), without adding an even listener.
        if (this.x + 25 > wiw) {
            this.x = this.x - 101;
            this.y = this.y;
        } else {
            this.x = this.x;
            this.y = this.y;
        }
    }
    // After each collision with "something of the things above" the player will be moved at the top row in a random cell.
Player.prototype.reset = function() {
    this.x = Math.floor(Math.random() * playerInitialX) * 101;
    this.y = -59;
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(allowedKeys) {
        var lengthX = 101,
            lengthY = 83;
        // Maybe my numbers still need some balancing but this is not bad. (my opinion)
        switch (allowedKeys) {
            case 'left':
                this.x > 83 ? this.x -= lengthX : this.x + lengthX;
                break;
            case 'up':
                this.y > 15 ? this.y -= lengthY : this.y + lengthY;
                break;
            case 'right':
                this.x < wiw - 121 ? this.x += lengthX : this.x - lengthX;
                break;
            case 'down':
                this.y < wih - 171 ? this.y += lengthY : this.y - lengthY;
                break;
        }
    }
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Since I am trying to make a responsive web design, a full-screen html-canvas-game, I am adding an event listener.
    // The reason for that is that I want, for the demonstrational purpose only, to change number of bugs depending on the window width.
var allEnemies = [],
    i, xPosition, yPosition;
window.addEventListener("resize", updateAllEnemies, false);

function updateAllEnemies() {
    allEnemies = [];
    for (i = 0; i < numberOfBugs; i++) {
        xPosition = Math.floor((Math.random() * numberOfBugs) + 1) * 101;
        yPosition = (Math.floor((Math.random() * numberOfBugs) + 1) * 83) - 59;
        allEnemies.push(new Enemy(xPosition, yPosition));
    };
}
updateAllEnemies();
// The same thing, only here for the stealing bushes.
var allStealingBushes = [],
    i,
    xPosition,
    yPosition;
window.addEventListener("resize", updateAllStealingBushes, false);

function updateAllStealingBushes() {
    allStealingBushes = [];
    for (i = 0; i < numberOfStealingBushes; i++) {
        xPosition = (Math.floor((Math.random() * numberOfStealingBushes) + 1) * 101);
        yPosition = (Math.floor((Math.random() * numberOfStealingBushes) + 1) * 83) - 59;
        allStealingBushes.push(new stealingBushes(xPosition, yPosition));
    };
}
updateAllStealingBushes();
// The same thing, only here for the extras.
var allExtras = [],
    i, xPosition, yPosition;
window.addEventListener("resize", updateAllExtras, false);

function updateAllExtras() {
    allExtras = [];
    for (i = 0; i < numberOfExtras; i++) {
        xPosition = Math.floor((Math.random() * numberOfExtras) + 1) * 101;
        yPosition = (Math.floor((Math.random() * numberOfExtras) + 1) * 83) - 59;
        allExtras.push(new Extras(xPosition, yPosition));
    };
}
updateAllExtras();
// Place the player object in a variable called player
var player = new Player(),
    i = 0;
// The code below is to detect if a collision between the player and a bug has occurred.
function checkCollisions(allEnemies, player) {
    if (numberOfLives > 0 && extrasScore < 49) {
        for (i = 0; i < numberOfBugs; i++) { // 3
            if (allEnemies[i].x < player.x + player.width &&
                allEnemies[i].x + allEnemies[i].width > player.x &&
                allEnemies[i].y < player.y + player.height &&
                allEnemies[i].height + allEnemies[i].y > player.y) {
                // If a collison has occured do the following "things".
                // To make things more interesting, I could check if the player has certain number of lives and change some things in the game.
                // In some sense that would be a responsive game level design. :-)
                // Let's make things simple and just remove one "life" from the player.
                numberOfLives--;
                //bugSound.play();
                player.reset();
            }
        }
    } else {
        gameOver();
    }
}
// Same things as (just) above only this time they are for the extras.
function checkExtrasCollisions(allExtras, player) {
    if (numberOfLives > 0 && extrasScore < 49) {
        for (i = 0; i < numberOfExtras; i++) { // 3
            if (allExtras[i].x < player.x + player.width &&
                allExtras[i].x + allExtras[i].width > player.x &&
                allExtras[i].y < player.y + player.height &&
                allExtras[i].height + allExtras[i].y > player.y) {
                //starSound.play();
                player.reset();
                extrasScore++;
            }
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    allEnemies = [];
    if (numberOfLives <= 0) {
        player.sprite = 'images/game-over.png';
    } else {
        player.sprite = 'images/first-place.png';
    }
    setTimeout(function() {
        click2.play();
    }, 4900);
    setTimeout(function() {
        document.location.reload();
    }, 5000);
}

// Intentionally, my game has no objective :-). I am leaving the players to use their imagination.
// My main goals were:
// - to learn JavaScript
// - to learn how to make a responsive web design, a full-screen html-canvas-game, without depending on the external libraries.
// Still I am adding counting capabilities just for the technical reason.
var numberOfLives = 3;

function drawNumberOfLives() {
    ctx.font = wiw <= 505 ? "19px Arial-Bold" : "29px Arial-Bold";
    ctx.fillStyle = "#ffff00";
    // There is no need to change things at 808 pixels because at that size this still looks nice.
    wiw <= 505 ? ctx.fillText("Lives: " + numberOfLives, wiw - 100, 40) : ctx.fillText("Lives: " + numberOfLives, wiw - 150, 40);
}
// The code below is to detect if a collision between the player and a stealing bushes has occurred.
function checkStealingBushesCollisions(allStealingBushes, player) {
    if (numberOfLives > 0 && extrasScore < 49) {
        for (var i = 0; i < numberOfStealingBushes; i++) { // 3
            if (allStealingBushes[i].x < player.x + player.width &&
                allStealingBushes[i].x + allStealingBushes[i].width > player.x &&
                allStealingBushes[i].y < player.y + player.height &&
                allStealingBushes[i].height + allStealingBushes[i].y > player.y) {
                // If a collison has occured do the following "things".
                // Let's make things simple and just steal one star (or more) from the player.
                if (extrasScore <= 0) {
                    extrasScore = 0;
                } else if (extrasScore > 0 && extrasScore <= 10) {
                    extrasScore--;
                } else if (extrasScore > 10 && extrasScore <= 20) {
                    extrasScore = extrasScore - 2;
                } else if (extrasScore > 20 && extrasScore <= 25) {
                    extrasScore = extrasScore - 3;
                } else {
                    extrasScore = extrasScore - 5;
                }
                //treeSound.play();
                player.reset();
            }
        }
    } else {
        allStealingBushes = [];
    }
}
var extrasScore = 0;

function drawExtrasScore() {
    ctx.font = wiw <= 505 ? "19px Arial-Bold" : "29px Arial-Bold";
    ctx.fillStyle = "#ffff00";
    if (wiw <= 505) {
        ctx.fillText("Hearts:  " + extrasScore, wiw - 100, 10);
    } else if (wiw <= 808) {
        ctx.fillText("Keys:  " + extrasScore, wiw - 150, 10);
    } else {
        ctx.fillText("Stars:  " + extrasScore, wiw - 150, 10);
    }
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var allowedKeys;
document.addEventListener('keyup', function(e) {
    allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    }
    player.handleInput(allowedKeys[e.keyCode]);
    // just to make things more interesting I am adding a sound here
    // Source: http://www.freesound.org/   User: willy_ineedthatapp_com   Sound: 167326__willy-ineedthatapp-com__click
    //click1.play();
});