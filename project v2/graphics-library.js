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