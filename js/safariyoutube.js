//https://developers.google.com/youtube/player_parameters#Overview
//https://developers.google.com/youtube/iframe_api_reference#Getting_Started
/*var ytPlayer,
    ytPlayerEndSong;

function onYouTubePlayerAPIReady() {
    ytPlayer = new YT.Player('player', {
        videoId: 'uWI0ZGrC9Mg',
        loop: true,
        playerVars: {
            playlist: 'K2hTcLQ7V3w',
            loop: true
        },
        events: {
            onReady: function(e) {
                e.target.pauseVideo();
            },
            onStateChange: function(event) {
                if (event.data === YT.PlayerState.ENDED) {
                    ytplayer.nextVideo();
                    //ytPlayer.playVideo();
                }
            }
        }
    });
}*/
var drawMenu;
// This code will control YouTube player adding the functionality to the image to play, pause and stop video.
// At the same time I am using this function to add clickable functionality to the navigation image which will enable movement of the player, Char boy.
window.addEventListener("onmousemove", controlYouTubePlayer, false);

function controlYouTubePlayer() {
    // for the up key
    var upLeftX = wiw <= 505 ? wiw - 62 : ((wiw <= 808) ? wiw - 103 : wiw - 112),
        upRightX = wiw <= 505 ? wiw - 39 : ((wiw <= 808) ? wiw - 69 : wiw - 67),
        upTopY = wiw <= 505 ? wih - 65 : ((wiw <= 808) ? wih - 93 : wih - 128),
        upBottomY = wiw <= 505 ? wih - 42 : ((wiw <= 808) ? wih - 57 : wih - 80),
        // for the left control key
        leftLeftX = wiw <= 505 ? wiw - 88 : ((wiw <= 808) ? wiw - 144 : wiw - 165),
        leftRightX = wiw <= 505 ? wiw - 67 : ((wiw <= 808) ? wiw - 109 : wiw - 120),
        // they are all in a same level (row) so the "Y"s have the same values
        // ldr - for left, down and right
        ldrTopY = wiw <= 505 ? wih - 37 : ((wiw <= 808) ? wih - 50 : wih - 70),
        ldrBottomY = wiw <= 505 ? wih - 14 : ((wiw <= 808) ? wih - 14 : wih - 23),
        // for the down control key
        downLeftX = wiw <= 505 ? wiw - 62 : ((wiw <= 808) ? wiw - 103 : wiw - 112),
        downRightX = wiw <= 505 ? wiw - 39 : ((wiw <= 808) ? wiw - 69 : wiw - 67),
        // for the right control key
        rightLeftX = wiw <= 505 ? wiw - 35 : ((wiw <= 808) ? wiw - 63 : wiw - 60),
        rightRightX = wiw <= 505 ? wiw - 13 : ((wiw <= 808) ? wiw - 29 : wiw - 12);
    document.onclick = function(ytSong) {
        // This part is to control YouTube video player.
        // the variables bellow are for the YouTube player.
        var pauseLeftX = 13,
            pauseRightX = wiw <= 505 ? 38 : ((wiw <= 808) ? 51 : 64),
            // pps - for pause, play and stop (because it will be a same "Y" value for all three)
            ppsTopY = wiw <= 505 ? wih - 38 : ((wiw <= 808) ? wih - 53 : wih - 72),
            ppsBottomY = wiw <= 505 ? wih - 14 : ((wiw <= 808) ? wih - 16 : wih - 22),
            playLeftX = wiw <= 505 ? 46 : ((wiw <= 808) ? 62 : 79),
            playRightX = wiw <= 505 ? 71 : ((wiw <= 808) ? 100 : 129),
            stopLeftX = wiw <= 505 ? 79 : ((wiw <= 808) ? 112 : 145),
            stopRightX = wiw <= 505 ? 104 : ((wiw <= 808) ? 148 : 195);
        /*if (ytSong.pageX >= pauseLeftX && ytSong.pageX <= pauseRightX && ytSong.pageY >= ppsTopY && ytSong.pageY <= ppsBottomY) {
            ytPlayer.pauseVideo();
        } else if (ytSong.pageX >= playLeftX && ytSong.pageX <= playRightX && ytSong.pageY >= ppsTopY && ytSong.pageY <= ppsBottomY) {
            ytPlayer.playVideo();
            document.getElementById('player').style.left = '-1300px';
        } else if (ytSong.pageX >= stopLeftX && ytSong.pageX <= stopRightX && ytSong.pageY >= ppsTopY && ytSong.pageY <= ppsBottomY) {
            //cameraClick.play();
            ytPlayer.stopVideo();
            document.getElementById('player').style.left = '0px';
        }*/
        // This part is for clickable navigation.
        allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        if (ytSong.pageX >= upLeftX && ytSong.pageX <= upRightX && ytSong.pageY >= upTopY && ytSong.pageY <= upBottomY) {
            //click1.play();
            player.handleInput(allowedKeys[38]); // up
        } else if (ytSong.pageX >= leftLeftX && ytSong.pageX <= leftRightX && ytSong.pageY >= ldrTopY && ytSong.pageY <= ldrBottomY) {
            //click1.play();
            player.handleInput(allowedKeys[37]); // left
        } else if (ytSong.pageX >= downLeftX && ytSong.pageX <= downRightX && ytSong.pageY >= ldrTopY && ytSong.pageY <= ldrBottomY) {
            //click1.play();
            player.handleInput(allowedKeys[40]); // down
        } else if (ytSong.pageX >= rightLeftX && ytSong.pageX <= rightRightX && ytSong.pageY >= ldrTopY && ytSong.pageY <= ldrBottomY) {
            //click1.play();
            player.handleInput(allowedKeys[39]); // right
        }
    }
}

function drawMenu() {
    // there are many different combinations to resize a browser window but at the end I decided for this ratio combination
    var ratio = wih <= wiw ? wih / 808 : ((wih > wiw && wiw < 808) ? wiw / 808 : 1);
    //Image Source: http://www.thelibertybeacon.com/wp-content/uploads/2015/11/PlayButtonBlue.png
    imgPlay = 'images/play.png',
        xPlayTheGame = wiw / 2 - (160 * (ratio)),
        yPlayTheGame = wih / 2 - (80 * (ratio)),
        playTheGameWidth = 306 * (ratio),
        playTheGameHeight = 174 * (ratio);
    ctx.drawImage(Resources.get(imgPlay), xPlayTheGame, yPlayTheGame, playTheGameWidth, playTheGameHeight);
    // This will put our hero, Char Boy, at 1/4 top and left.
    var charBoyX = wiw / 4 - (51 * (ratio)),
        charBoyY = wih / 4 - (86 * (ratio)),
        charBoyWidth = 101 * (ratio),
        charBoyHeight = 171 * (ratio),
        playerImage = 'images/char-boy.png';
    ctx.drawImage(Resources.get(playerImage), charBoyX, charBoyY, charBoyWidth, charBoyHeight);
    // This will put our extras, the stars, keys and hearts, at 1/4 top and right.
    var imgEntryScreenExtras = wiw <= 505 ? 'images/Heart.png' : wiw <= 808 ? 'images/Key.png' : 'images/Star.png',
        entryScreenExtrasX = wiw * 0.75 - 51 * ratio,
        entryScreenExtrasY = wih * 0.25 - 86 * ratio;
    // Because all images are the same size (dimension) here I am reusing data from Char Boy.
    ctx.drawImage(Resources.get(imgEntryScreenExtras), entryScreenExtrasX, entryScreenExtrasY, charBoyWidth, charBoyHeight);
    // This will put our enemies, the bugs and bushes, at 1/4 bottom and right.
    var imgEntryScreenBug = wiw <= 505 ? 'images/enemy-bug-yellow.png' : wiw <= 808 ? 'images/enemy-bug-green.png' : 'images/enemy-bug.png',
        entryScreenBugX = wiw * 0.82 - 51 * ratio,
        entryScreenBugY = wih * 0.75 - 86 * ratio,
        // for the bushes
        imgEntryScreenBush = 'images/Tree Short.png',
        entryScreenBushX = wiw * 0.68 - 51 * ratio,
        entryScreenBushY = wih * 0.75 - 86 * ratio;
    // Because all images are the same size (dimension) here I am reusing data from Char Boy.
    ctx.drawImage(Resources.get(imgEntryScreenBug), entryScreenBugX, entryScreenBugY, charBoyWidth, charBoyHeight);
    ctx.drawImage(Resources.get(imgEntryScreenBush), entryScreenBushX, entryScreenBushY, charBoyWidth, charBoyHeight);
    // After reading a story about these beautiful creatures, I decided to put this here even it has nothing to do with the project 3.
    // Vaquita
    var imgEntryScreenVaquita = 'images/vaquita.png',
        entryScreenVaquitaX = 0,
        entryScreenVaquitaY = wih - 252 * ratio,
        vaquitaWidth = 252 * ratio,
        vaquitaHeight = 252 * ratio;
    // Because all images are the same size (dimension) here I am reusing data from Char Boy.
    ctx.drawImage(Resources.get(imgEntryScreenVaquita), entryScreenVaquitaX, entryScreenVaquitaY, vaquitaWidth, vaquitaHeight);
    // This will explain to a visitor (a game player) what to collect in the game.
    ctx.font = "" + 59 * ratio + "px Arial-Bold";
    ctx.fillStyle = "#ffff00";
    ctx.fillText("Collect: 49", wiw * 0.75 - 130 * ratio, wih * 0.13);
    // This will explain to a visitor (a game player) what to avoid in the game.
    ctx.fillText("Avoid", wiw * 0.75 - 90 * ratio, wih * 0.94);
    // for the playButton (starting the game)
    var xPlayTheGameLeft = wiw / 2 - 125 * ratio,
        xPlayTheGameRight = wiw / 2 + 112 * ratio,
        yPlayTheGameTop = wih / 2 - 48 * ratio,
        yPlayTheGameBottom = wih / 2 + 55 * ratio,
        // for the vivavaquita.org
        vaquitaLeft = 22 * ratio,
        vaquitaRight = 229 * ratio,
        vaquitaTop = wih - 229 * ratio,
        vaquitaBottom = wih - 23 * ratio;
    // Here I am reusing Max Yakovenko's code from the canvaslinks.js
    document.onmousemove = function(playButton) {
        var xPlayButton, yPlayButton;
        // Get the mouse position relative to the canvas element
        if (playButton.layerX || playButton.layerX == 0) { // For Firefox
            xPlayButton = playButton.layerX;
            yPlayButton = playButton.layerY;
        }
        // Check if cursor is in the link area
        if (playButton.pageX >= xPlayTheGameLeft && playButton.pageX <= xPlayTheGameRight && playButton.pageY >= yPlayTheGameTop && playButton.pageY <= yPlayTheGameBottom) {
            document.body.style.cursor = "pointer";
        } else if (playButton.pageX >= vaquitaLeft && playButton.pageX <= vaquitaRight && playButton.pageY >= vaquitaTop && playButton.pageY <= vaquitaBottom) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "";
        }
    }
    document.onclick = function(playButton) {
        if (playButton.pageX >= xPlayTheGameLeft && playButton.pageX <= xPlayTheGameRight && playButton.pageY >= yPlayTheGameTop && playButton.pageY <= yPlayTheGameBottom) {
            // Without this line of code a font size from here will apply to the canvas links and this is to prevent that.
            ctx.font = window.innerWidth <= 505 ? "15px Arial-Bold" : "19px Arial-Bold";
            //ytPlayer.playVideo();
            // to set YouTube video volume at 25
            //ytPlayer.setVolume(25);
            // just to add some life to the game, here it is a sound (click)
            //click2.play();
            // to give the sound time to play then to start the game
            window.removeEventListener("resize", drawMenu, false);
            setTimeout(function() {
                startTheGame();
            }, 85);
        } else if (playButton.pageX >= vaquitaLeft && playButton.pageX <= vaquitaRight && playButton.pageY >= vaquitaTop && playButton.pageY <= vaquitaBottom) {
            window.open('http://www.vivavaquita.org');
        }
    }
}