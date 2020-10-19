//Project

//Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
initGraphics(608, 544)

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

// Main Program Loop
requestAnimationFrame(draw);

function draw() {
    //Logic
    nextLevel();
    // KEYBOARD CONTROLS
    player.x += player.x_velocity;
    horizontalCollision();
    player.y += player.y_velocity;
    for (let n = 0;n < bats.length; n++) {
        bats[n].x += bats[n].x_velocity;
    }
    verticalCollision();
    //Bat collision and bats movement pattern
    batsMove();
    collisionBats();
    if (controller.up && player.jumping == false) {
        player.y_velocity -= 20;
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
    if (stage == 1) {
        if (player.y > 483) {
            player.y = 483;
            player.jumping = false;
        } 
    }
    if (player.x < -20) {
        player.x = 608;
    } else if (player.x > 608) {
        player.x = -20;
    }
    //death
    if (player.alive == false) {
        stage = 3;
    }
    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    //Draw the map
    initialise();

    //Draw the player
    ctx.drawImage(spriteSheetImg, spriteX, spriteY, 16, 16, player.x, player.y, player.w, player.h)

    // Request another Animation Frame
    requestAnimationFrame(draw);
}
