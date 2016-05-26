###Student: Siniša Jotanović
#Char Boy's Adventure in the Land of Bosona
###(also known as Udacity FEND [Project 3](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001#project_modal_2696458597) - OO JavaScript)

##How to Play

The game starts after a user clicks the "_Play_" button, located at the entry screen, and ends either after a user has collected 49 collectible items (the hearts, keys and stars) or he or she came in "contact" three times with the bugs crawling from the left to the right on the screen.
<br>During the game some annoying creatures hiding in the moving bushes are trying to steal Char Boy's items making a player's effort to collect 49 of them more challenging.

##Included Files

* Index.html

Index.html contains all necessary links to the JavaScript and CSS files making the game possible.

----------
* ctyle.css

Style.css file contains all necessary styling. Even the game is made to be full screen (window) canvas some CSS code was necessary, if nothing else than for the `<div>` tag containing a YouTube player.

----------
###JavaScript Files
1. **engine.js** is the game's engine and makes all other JavaScript files running smoothly together. While I made some modifications to this file, my comments are included and they describe in details what I was doing and for what reason.
2. **resources.js** is the supporting file for engine.js and I did not make any changes to this file from its original state.
3. **app.js** is the file where all enemies and our game character interact with each other. Additionally to the basic character interaction this file contains the sound objects and the navigation and "pause, play and stop" images located in the bottom right and left corner of the screen. The clickable functionality of these images is controlled from the **youtube.js** while the "mouse over" effects come from the **canvaslinks.js**.
4. **canvaslinks.js** gives some extra look to the game by providing clickable links to **_"credits"_** and functionality to the images in the left and right corner of the screen.
5. **youtube.js** was my idea to make the game more alive by using some YouTube's videos as the background music for the game. While it started only as that with the time it turned out to be the perfect place to add some additional functionality to the mentioned images.


----------
###Known Issues

While the game runs in all major browsers, some of them are not supportive to all media types equally. For that reason I created **"safariapp.js"** file to make game available to those users who are using one of those browsers that have known issues playing a sound files. I called the file safariapp.js because my Window's version Safari 5.1.7(7534.57.2)) is one of those browsers that will not play the game unless the sound files are removed. I was trying to find a solution to this issue but unfortunately without a success. Even some pages suggest installing Apple's QuickTime and I tried that the problem never was solved on my side. Thankfully not many people these days use outdated browsers and this game runs without problems in any modern browser.

Another known issue is that modern day's browser block auto-play to protect user's data usage for mobile users and for that reason there is possible that the game will not play a YouTube song unless a page has been refreshed. It does not happen often but it is possible.