//Project

//Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
// 19 rows and 17 columns - 32 x 32
initGraphics(608, 544)

//Create objects to represent the map
let map = {
    x1: 50,
    y1: 430,
    x2: 250,
    y2: 430,
    x3: 450,
    y3: 430,
    x4: 356,
    y4: 330,
    x5: 150,
    y5: 330,
    x6: -50,
    y6: 330,
    x7: 560,
    y7: 330,
    tileW : 100,
    tileH : 16,
}

let player = {
    x: 300,
    y: 0,
    w: 32,
    h: 32,
    x_velocity: 0, // move x
    y_velocity: 0, //move y 
    col: 0,
    row: 0,
    alive : true,
    jumping: false,
}

let controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    //Function named keyboard
    keyboard: function (event) {

        let key_state = (event.type == "keydown")

        switch (event.keyCode) {
            case 65: // a key
                controller.left = key_state;
                break;
            case 87: // w key
                controller.up = key_state;
                break;
            case 68: // d key
                controller.right = key_state;
                break;
            case 83: // s key
                controller.down = key_state;
            break;
        }
    }
};

document.addEventListener("keydown", controller.keyboard);
document.addEventListener('keyup', controller.keyboard);

//Spritesheet 16 x 16
let spriteSheetImg = document.getElementById('sprite-sheet');
let spriteY = 0;
let spriteX = 66;
//Background
let background = document.getElementById('background');
//Platforms with the width and height
let platform = new Image();
platform.src = 'images/platform.png';


// Main Program Loop
requestAnimationFrame(draw);

function draw() {
    //Logic
    horizontalCollision();
    //verticalCollision();
    //Collision();

    // KEYBOARD CONTROLS
    player.x += player.x_velocity;
    player.y += player.y_velocity;

    if (controller.up && player.jumping == false) {
        player.y_velocity -= 19;
        player.jumping = true;
    }
    if (controller.left) {
        player.x_velocity -= 0.6;
    }
    if (controller.right) {
        player.x_velocity += 0.6;
    }

    //Gravity - always active
    player.y_velocity += 1.3;

    //Friction - will slide a bit and come to a stop
    player.x_velocity *= 0.9;
    player.y_velocity *= 0.9;

    //Make the player stay within the area
    if (player.y > 483) {
        player.y = 483;
        player.jumping = false;
    } 
    if (player.x < -20) {
        player.x = 608;
    } else if (player.x > 608) {
        player.x = -20;
    }

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    //Draw a background
    ctx.drawImage(background, 0, 0, 608, 544)

    //Draw platforms
    ctx.drawImage(platform, map.x1, map.y1, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x2, map.y2, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x3, map.y3, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x4, map.y4, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x5, map.y5, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x5, map.y5, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x6, map.y6, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x7, map.y7, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x8, map.y8, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x9, map.y9, map.tileW, map.tileH);
    ctx.drawImage(platform, map.x10, map.y10, map.tileW, map.tileH);

    //Draw a ground
    ctx.strokeStyle = 'black';
    ctx.line(0, 515, 608, 515);
    ctx.stroke();

    //hitbox sorta
    ctx.strokeStyle= 'grey';
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fill();

    //Draw the player
    ctx.drawImage(spriteSheetImg, spriteX, spriteY, 16, 16, player.x, player.y, player.w, player.h)

    // Request another Animation Frame
    requestAnimationFrame(draw);
}

function horizontalCollision() {console.log(player.x);
    if (player.x < map.x1 - map.tileW) {// right side of platform
        player.x = map.x1 + 30;
    } else if (player.x + player.w > map.x1) {//left side of platform
        player.x = map.x1 - 30;
    }
}

function verticalCollision() {

}


rect1.x < rect2.x + rect2.width &&
rect1.x + rect1.width > rect2.x &&
rect1.y < rect2.y + rect2.height &&
rect1.y + rect1.height > rect2.y