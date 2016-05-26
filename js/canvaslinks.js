/*
 * After I finished all my work I decided to add some links to the canvas.
 * Well :-) after some research it came out that there is no such thing.
 * To make long story short, I was able to find some solutions for that problem online.
 * The one I decided to use is from Yakovenko Max: http://stackoverflow.com/users/1649374/yakovenko-max
 * Here is his solution: http://stackoverflow.com/questions/6215841/create-links-in-html-canvas
 */
// To use his solution with the engine.js some modifications are necessary. They are shown in the below code.
// I am declaring a global variable drawLink to assign a function inside a function to it to make that function globally available.
// This function is called from renderEntities() in engine.js.
// Without modification Yakovenko's code works in Google Chrome and Microsoft Edge if called from renderEntities() function.
// However all other browsers are crushing because they do not prevent openings of multiple tabs.
// The Firefox opened something like 1,200 plus tabs before I was able to "kill" the process.
var drawLink;
var OnLoad = function() {
    // Links
    var Links = new Array(); // Links information
    var hoverLink = ""; // Href of the link which cursor points at
    // Draw the link
    drawLink = function(x, y, href, title) {
            var linkTitle = title,
                linkX = x,
                linkY = y,
                linkWidth = ctx.measureText(linkTitle).width,
                linkHeight = parseInt(ctx.font); // Get lineheight out of fontsize
            ctx.font = window.innerWidth <= 505 ? "19px Arial-Bold" : "29px Arial-Bold";
            ctx.fillStyle = "#ffff00";
            ctx.textBaseline = "top";
            ctx.fillText("Student:", 13, 10);
            ctx.fillText("Siniša Jotanović", 13, 40);
            // Draw the link
            ctx.font = window.innerWidth <= 505 ? "15px Arial-Bold" : "19px Arial-Bold"; // Firefox "complains" about 15px Arial-Bold
            ctx.fillText(linkTitle, linkX, linkY);
            ctx.fillStyle = "#ffffff"; // White link color
            ctx.textBaseline = "top"; // Makes left top point a start point for rendering text
            ctx.fillText("Project 3", 13, 85);
            ctx.fillText("Graphics", 13, 102);
            ctx.fillText("Song 1", 13, 119);
            ctx.fillText("Song 2", 13, 136);
            ctx.fillText("Sounds", 13, 153);
            // Add mouse listeners
            document.addEventListener("mousemove", on_mousemove, false);

            document.addEventListener("click", on_click, false);

            // Add link params to array
            Links.push(x + ";" + y + ";" + linkWidth + ";" + linkHeight + ";" + href);
        }
        // Link hover
    var x, y;

    function on_mousemove(ev) {
        // these are YouTube control parameters
        var pauseLeftX = 13,
            pauseRightX = wiw <= 505 ? 38 : ((wiw <= 808) ? 51 : 64),
            // pps - for pause, play and stop (because it will be a same "Y" value for all three)
            ppsTopY = wiw <= 505 ? wih - 38 : ((wiw <= 808) ? wih - 53 : wih - 72),
            ppsBottomY = wiw <= 505 ? wih - 14 : ((wiw <= 808) ? wih - 16 : wih - 22),
            playLeftX = wiw <= 505 ? 46 : ((wiw <= 808) ? 62 : 79),
            playRightX = wiw <= 505 ? 71 : ((wiw <= 808) ? 100 : 129),
            stopLeftX = wiw <= 505 ? 79 : ((wiw <= 808) ? 112 : 145),
            stopRightX = wiw <= 505 ? 104 : ((wiw <= 808) ? 148 : 195),
            // these are navigation parameters
            upLeftX = wiw <= 505 ? wiw - 62 : ((wiw <= 808) ? wiw - 103 : wiw - 112),
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
        // Get the mouse position relative to the canvas element
        if (ev.layerX || ev.layerX == 0) { // For Firefox
            x = ev.layerX;
            y = ev.layerY;
        }
        // Link hover
        for (var i = Links.length - 1; i >= 0; i--) {
            var params = new Array();
            // Get link params back from array
            params = Links[i].split(";");
            var linkX = parseInt(params[0]),
                linkY = parseInt(params[1]),
                linkWidth = parseInt(params[2]),
                linkHeight = parseInt(params[3]),
                linkHref = params[4];
            // Check if cursor is in the link area
            if (x >= linkX && x <= (linkX + linkWidth) && y >= linkY && y <= (linkY + linkHeight)) {
                document.body.style.cursor = "pointer";
                hoverLink = linkHref;
                break;
            } else if (ev.layerX >= pauseLeftX && ev.layerX <= pauseRightX && ev.layerY >= ppsTopY && ev.layerY <= ppsBottomY) { // here starts YT
                document.body.style.cursor = "pointer";
            } else if (ev.layerX >= playLeftX && ev.layerX <= playRightX && ev.layerY >= ppsTopY && ev.layerY <= ppsBottomY) {
                document.body.style.cursor = "pointer";
            } else if (ev.layerX >= stopLeftX && ev.layerX <= stopRightX && ev.layerY >= ppsTopY && ev.layerY <= ppsBottomY) {
                document.body.style.cursor = "pointer";
            } else if (ev.layerX >= upLeftX && ev.layerX <= upRightX && ev.layerY >= upTopY && ev.layerY <= upBottomY) { // here starts nav
                document.body.style.cursor = "pointer";
            } else if (ev.layerX >= leftLeftX && ev.layerX <= leftRightX && ev.layerY >= ldrTopY && ev.layerY <= ldrBottomY) {
                document.body.style.cursor = "pointer";
            } else if (ev.layerX >= downLeftX && ev.layerX <= downRightX && ev.layerY >= ldrTopY && ev.layerY <= ldrBottomY) {
                document.body.style.cursor = "pointer";
            } else if (ev.layerX >= rightLeftX && ev.layerX <= rightRightX && ev.layerY >= ldrTopY && ev.layerY <= ldrBottomY) {
                document.body.style.cursor = "pointer";
            } else {
                document.body.style.cursor = "";
                hoverLink = "";
            }
        };
    }
    // Link click
    function on_click(e) {
        if (hoverLink) {
            window.open(hoverLink); // Use this to open in new tab
        }
    }
    drawLink(13, 85, "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001#project_modal_2696458597", "Project 3");
    drawLink(13, 102, "http://www.lostgarden.com/2007/05/dancs-miraculously-flexible-game.html", "Graphics");
    drawLink(13, 119, "http://ironhorsebluegrass.com/home/", "Song 1");
    drawLink(13, 136, "http://feufollet.net/", "Song 2");
    drawLink(13, 153, "http://www.freesound.org/", "Sounds");
}