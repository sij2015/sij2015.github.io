// I am using a Windows version Safari 5.1.7(7534.57.2)) and my game doesn't run in it.
// For some reason some versions of Safari have some issues to animate the game and I was looking for a solution online.
// It came out that Safari doesn't process "window.requestAnimationFrame" as the other browsers.
// To fix that I used the bellow solution found at StackOverflow.com.
// Source: http://stackoverflow.com/questions/20174955/requestanimationframe-not-working-in-safari-opera-tearing-my-hair-out
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
var someRandomNumber = Math.floor(Math.random() * 13) + 1;
var startTheGame, init, updateEntities;
var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    function makeCanvasWindowSize() {
        // Register an event listener to call the resizeCanvas() function each time the window is resized.
        win.addEventListener('resize', resizeCanvas, false);
    }
    makeCanvasWindowSize();

    function redraw() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redraw();
    };
    resizeCanvas();
    doc.body.appendChild(canvas);
    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();
        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;
        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }
    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    // I changed init() to serve as the game entry screen.
    // Once the play button is clicked drawMenu() will call startTheGame(), which was original init().
    init = function() {
        win.addEventListener("resize", drawMenu, false);
        drawMenu();
    }
    startTheGame = function() {
            reset();
            lastTime = Date.now();
            main();
        }
        /* This function is called by main (our game loop) and itself calls all
         * of the functions which may need to update entity's data. Based on how
         * you implement your collision detection (when two entities occupy the
         * same space, for instance when your character should die), you may find
         * the need to add an additional function call here. For now, we've left
         * it commented out - you may or may not want to implement this
         * functionality this way (you could just implement collision detection
         * on the entities themselves within your app.js file).
         */
    function update(dt) {
        updateEntities(dt);
        checkCollisions(allEnemies, player);
        checkExtrasCollisions(allExtras, player);
        checkStealingBushesCollisions(allStealingBushes, player);
    }
    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    updateEntities = function(dt) {
            player.update();
            allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
            allStealingBushes.forEach(function(deadlyEnemy) {
                deadlyEnemy.update(dt);
            });
            allExtras.forEach(function(extras) {
                extras.update(dt);
            });
        }
        /* This function initially draws the "game level", it will then call
         * the renderEntities function. Remember, this function is called every
         * game tick (or loop of the game engine) because that's how games work -
         * they are flipbooks creating the illusion of animation but in reality
         * they are just drawing the entire screen over and over.
         */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        // Why so many images?
        // Just to make it work in 9999 x 9999 max-resolution used in Google Chrome's Developer Tools.
        var rowImages = [
                'images/grass-block.png',
                'images/water-block.png',
                'images/grass-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/water-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/grass-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/water-block.png',
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/water-block.png'
            ],
            numRows = Math.ceil(window.innerHeight / 83),
            numCols = Math.ceil(window.innerWidth / 101),
            row, col;
        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                if (canvas.width <= 404) {
                    ctx.drawImage(Resources.get(rowImages[0]), col * 101, row * 83 - 50);
                } else {
                    ctx.drawImage(Resources.get(row * col % someRandomNumber ? rowImages[row] : rowImages[0]), col * 101, row * 83 - 50);
                }
            }
        }
        renderEntities();
    }
    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        if (numberOfLives > 0 && extrasScore < 49) {
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
            allStealingBushes.forEach(function(stealingBushes) {
                stealingBushes.render();
            });
        }
        allExtras.forEach(function(extras) {
            extras.render();
        });

        drawLink();
        controlYouTubePlayer();
        drawExtrasScore();
        drawNumberOfLives();
        player.render();
        drawNavigation();
    }
    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    // This part is for the canvas links.
    function reset() {
        OnLoad();
    }
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Star.png',
        'images/Tree Short.png',
        'images/enemy-bug-green.png', // Source: http://www.cherylcourt.ca/
        'images/enemy-bug-yellow.png', // Source: http://www.cherylcourt.ca/
        'images/Key.png',
        'images/Heart.png',
        'images/navigation.png',
        'images/play-video.png',
        'images/game-over.png',
        'images/play.png',
        'images/vaquita.png',
        'images/first-place.png'
    ]);
    Resources.onReady(init);
    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);