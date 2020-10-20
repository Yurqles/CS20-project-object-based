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
let platforms2 = [];
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
//For second level
platforms2.push({
    x: 520,
    y: 62,
    w: 100,
    h: 16,
},{
    x: 300,
    y: 170,
    w: 100,
    h: 16,
},{
    x: 100,
    y: 290,
    w: 100,
    h: 16,
},{
    x: 500,
    y: 290,
    w: 100,
    h: 16,
},{
    x: 300,
    y: 390,
    w: 100,
    h: 16,
},{
    x: 100,
    y: 490,
    w: 100,
    h: 16,
}, {
    x: 500,
    y: 490,
    w: 100,
    h: 16,
})

//Stage number
let stage = 1;


//Background
let background = [document.getElementById('background'), document.getElementById('background2')]
    
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

//Bat properties
let bats = []; //16 x 18
bats.push({
    x: 0,
    y: 85,
    x_velocity: 0,
    w: 32,
    h: 32,
    spriteX: 0,
    spriteY: 0,
},{
    x: 580,
    y: 200,
    x_velocity: 0,
    w: 32,
    h: 32,
    spriteX: 0,
    spriteY: 0,
},{
    x: 0,
    y: 200,
    x_velocity: 0,
    w: 32,
    h: 32,
    spriteX: 0,
    spriteY: 0,
},{
    x: 580,
    y: 315,
    x_velocity: 0,
    w: 32,
    h: 32,
    spriteX: 0,
    spriteY: 0,
},{
    x: 0,
    y: 315,
    x_velocity: 0,
    w: 32,
    h: 32,
    spriteX: 0,
    spriteY: 0,
},{
    x: 580,
    y: 410,
    x_velocity: 0,
    w: 32,
    h: 32,
    spriteX: 0,
    spriteY: 0,
},{
    x: 0,
    y: 410,
    x_velocity: 0,
    w: 32,
    h: 32,
    spriteX: 0,
    spriteY: 0,
},)

//Spritesheet 16 x 16
let spriteSheetImg = document.getElementById('sprite-sheet');
let spriteY = 0;
let spriteX = 66;

//Platforms with the width and height
let platform = new Image();
platform.src = 'images/platform.png'; 
let bat = new Image();
bat.src = 'images/bats.png';

function horizontalCollision() { 
    if (stage == 1) {
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
    } else if (stage == 2) {
        for (i = 0; i < platforms2.length; i++) {
            if (RectCollision(player, platforms2, i)) { 
                if (player.x_velocity > 0) {//left side
                    player.x = platforms2[i].x - player.w;
                    player.x_velocity = 0;
                } else if (player.x_velocity < 0) {//right side
                    player.x = platforms2[i].x + platforms2[i].w; 
                    player.x_velocity = 0;
                } 
            }
        }
    }
}

function verticalCollision() {
    if (stage == 1) {
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
    } else if (stage == 2) {
        for (i = 0; i < platforms2.length; i++) {
            if (RectCollision(player, platforms2, i)) {
                if (player.y_velocity > 0) {//top
                    player.y = platforms2[i].y - player.h;
                    player.y_velocity = 0;
                    player.jumping = false;
                } else if (player.y_velocity < 0) {//bottom
                    player.y = platforms2[i].y + platforms2[i].h;
                    player.y_velocity = 0;
                } 
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

function nextLevel(){
    if (stage == 1) {
        if (player.x < 565 + 50 &&
            player.x + player.w > 565 &&
            player.y < 120 + 50 &&
            player.y + player.h > 120 && stage == 1) {
                player.x = 530;
                player.y = 0;
                stage = 2;          
        }
    } else if (stage == 2) {
        if (player.y > cnv.height) {
            stage = 3;
        }
    }
}

function drawPlatforms(n, platforms) {
    ctx.drawImage(platform, platforms[n].x, platforms[n].y, platforms[n].w, platforms[n].h);
}  
function drawBats(n) {
    ctx.drawImage(bat, bats[n].spriteX, bats[n].spriteY, 16, 18, bats[n].x, bats[n].y, bats[n].w, bats[n].h)
}

function initialise() {
    if (stage == 1) {
        //Draw the end place
        ctx.rect(565, 120, 50, 50);

        //Draw a background
        ctx.drawImage(background[0], 0, 0, cnv.width, cnv.height);

        //Draw platforms
        for (let n = 0; n < platforms.length; n++) {
            drawPlatforms(n, platforms);
        }
        //Draw a ground
        ctx.strokeStyle = 'black';
        ctx.line(0, 515, 608, 515);
        ctx.stroke();
    } else if (stage == 2) {
        //Draw a background
        ctx.drawImage(background[1], 0, 0, cnv.width, cnv.height);

        //Draw platforms
        for (let n = 0; n < platforms2.length; n++) {
            drawPlatforms(n, platforms2);
        } 
        //Draw bats
        for (let n = 0; n < bats.length; n++) {
            drawBats(n);
        }
    }
    
}

setInterval(animateBat, 160);
function animateBat() {
    for (let n = 0; n < bats.length; n++) {
        bats[n].spriteY = 0;
        bats[n].spriteX += 16;
        if (bats[n].spriteX >= 64) {
            bats[n].spriteX = 0;
        }
    }
}

function collisionBats() {
    if (stage == 2) {
        for (let n = 0; n < bats.length; n++) {
            if (RectCollision(player, bats, n)) {
                player.alive = false;
            }
        }
    }
}

function batsMove() {
    if (stage == 2) {
        for (let n = 1; n < bats.length; n += 2) { 
             if (bats[n].x + bats[n].w >= 608) {
                bats[n].x_velocity = -7;console.log('1')
            } else if (bats[n].x <= 305) {
                bats[n].x_velocity = 7;console.log('2')
            } 
        }
        for (let n = 0; n < bats.length; n += 2) {
            if (bats[n].x <= 0) {
                bats[n].x_velocity = 7;console.log('3')
            } else if (bats[n].x >= 305 + bats[n].w) {
                bats[n].x_velocity = -7;console.log('4')
            }
        }
    }
}
