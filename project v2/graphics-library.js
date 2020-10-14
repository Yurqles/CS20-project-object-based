//GRAPHICS LIBRARY
//Requires a global cnv and ctx


function initGraphics(initWidth, initHeight) {
    cnv.width = initWidth;
    cnv.height = initHeight;

    //DRAW FUNCTIONS
    ctx.fillTriangle = function(x1, y1, x2, y2, x3, y3) {
        //Draw a filled triangle with verticles
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fill();
    }

    ctx.strokeTriangle = function(x1, y1, x2, y2, x3, y3) {
        //Draw an outline triangle with verticles
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath()
        ctx.stroke()
    }

    ctx.fillCircle = function(x, y, r) {
        //Draw an filled circle with center (x, y) and radius (r)
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fill();
    }

    ctx.strokeCircle = function(x, y, r) {
        //Draw an outlined circle with center (x, y) and radius (r)
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.stroke();
    }

    ctx.line = function(x1, y1, x2, y2) {
        //Draw a line segment from (x1, y1) to (x2, y2)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

//MOUSE STUFF

//Global Variables
let mouseIsPressed = false;
let mouseX, mouseY, pmouseX, pmouseY

document.addEventListener('mousedown', function() {mouseIsPressed = true})
document.addEventListener('mouseup', function() {mouseIsPressed = false})
document.addEventListener('mousemove', mousemoveHandlerLib);

function mousemoveHandlerLib(event) {
    //Save previous mouseX and mouseY
    pmouseX = mouseX;
    pmouseY = mouseY;

    //Update mouseX and mouseY
    let cnvRect = cnv.getBoundingClientRect();
    mouseX = event.x - cnvRect.x;
    mouseY = event.y - cnvRect.y;
}

//Project functions and arrays and variables

//Create an Array to represent the where the platforms will be 
let platforms = [];
platforms.push({
        x: 250,
        y: 430,
        w: 100,
        h: 16,
    },{
        x: 460,
        y: 400,
        w: 100,
        h: 16,
    },{
        x: -40,
        y: 370,
        w: 100,
        h: 16,
    },{
        x: 140,
        y: 340,
        w: 100,
        h: 16,
    },{
        x: 340,
        y: 310,
        w: 100,
        h: 16,
    },{
        x: 520,
        y: 280,
        w: 100,
        h: 16,
    },{
        x: -40,
        y: 250,
        w: 100,
        h: 16,
    },{
        x: 140,
        y: 220,
        w: 100,
        h: 16,
    },{
        x: 340,
        y: 190,
        w: 100,
        h: 16,
    },{
        x: 520,
        y: 160,
        w: 100,
        h: 16,
    },)

    
let player = {
    x: 0,
    y: 500,
    w: 32,
    h: 32,
    x_velocity: 0, // move x
    y_velocity: 0, //move y 
    col: 0,
    row: 0,
    alive : true,
    jumping: false,
}

//Spritesheet 16 x 16
let spriteSheetImg = document.getElementById('sprite-sheet');
let spriteY = 0;
let spriteX = 66;
//Background
let background = document.getElementById('background');
//Platforms with the width and height
let platform = new Image();
platform.src = 'images/platform.png';

function drawPlatforms(n) {
    ctx.drawImage(platform, platforms[n].x, platforms[n].y, platforms[n].w, platforms[n].h)
}   

function horizontalCollision() {
    for (i = 0; i < platforms.length; i++) {
        if (RectCollision(player, platforms, i)) { 
            if (player.x_velocity > 0) {//left side
                player.x = platforms[i].x - player.w; 
                player.x_velocity = 0;
            } else if (player.x_velocity < 0) {//right side
                player.x = platforms[i].x + platforms[i].w; 
                player.x_velocity = 0;
            } 
        }
    }
}

function verticalCollision() {
    for (i = 0; i < platforms.length; i++) {
        if (RectCollision(player, platforms, i)) {
            if (player.y_velocity > 0) {//top
                player.y = platforms[i].y - player.h;
                player.y_velocity = 0;
                player.jumping = false;
            } else if (player.y_velocity < 0) {//bottom
                player.y = platforms[i].y + platforms[i].h;
                player.y_velocity = 0;
            } 
        }
    }
}

function RectCollision(rect1, rect2, i) {
    return (rect1.x < rect2[i].x + rect2[i].w &&
        rect1.x + rect1.w > rect2[i].x &&
        rect1.y < rect2[i].y + rect2[i].h &&
        rect1.y + rect1.h > rect2[i].y)  
}
