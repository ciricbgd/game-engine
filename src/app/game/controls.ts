import { playerCanvas, sw, sh } from './screen';
import { player } from '../game/entities';
import { togglePause } from './engine';

document.addEventListener('keydown', keyDownHandler, false); //Listener to keydown events
document.addEventListener('keyup', keyUpHandler, false); //Listener to keyup events
document.addEventListener("mousemove", mouseMoveHandler, false); // Listening to mouse movement
document.addEventListener("click", detectLeftButton, false); // Listening to mouse click
export var MovementType = 'keyboard';


//Mouse movement
export var mouseX;
export var mouseY;
export function mouseMoveHandler(e) {
    mouseX = e.clientX - playerCanvas.offsetLeft;
    mouseY = e.clientY - playerCanvas.offsetTop;
    MovementType = 'mouse';
}



//Keyboard movement
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
export var escapePressed = false;
var lastPressed = [];


function detectLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
        player.shootspecial();
    }
}

function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;

    }
    else if (event.keyCode == 37) {
        leftPressed = true;

    }
    if (event.keyCode == 40) {
        downPressed = true;

    }
    else if (event.keyCode == 38) {
        upPressed = true;

    }

    if (event.keyCode == 27) {
        if (escapePressed == true) {
            togglePause('unpaused');
            escapePressed = false;
        }
        else {
            togglePause('paused');
            escapePressed = true;
        }
    }
    MovementType = 'keyboard';
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;

    }
    else if (event.keyCode == 37) {
        leftPressed = false;

    }
    if (event.keyCode == 40) {
        downPressed = false;

    }
    else if (event.keyCode == 38) {
        upPressed = false;

    }
    MovementType = 'keyboard';
}


function playerMove(accel) {
    if (rightPressed) {
        player.x += player.speed * accel;
        lastPressed[0] = 'right';
    }
    else if (leftPressed) {
        player.x -= player.speed * accel;
        lastPressed[0] = 'left';
    }

    if (downPressed) {
        player.y += player.speed * accel;
        lastPressed[1] = 'down';
    }
    else if (upPressed) {
        player.y -= player.speed * accel;
        lastPressed[1] = 'up';
    }
}

function slowDown(accel) {
    if (lastPressed[0] == 'right') { player.x += player.speed * accel; }
    else if (lastPressed[0] == 'left') { player.x -= player.speed * accel; }
    if (lastPressed[1] == 'down') { player.y += player.speed * accel; }
    else if (lastPressed[1] == 'up') { player.y -= player.speed * accel; }
}

export function changeMovement() {

    if (MovementType == 'mouse') {
        //Mouse movement 
        mouseMoveHandler;
        let differenceX = mouseX - player.x;
        let differenceY = mouseY - player.y;

        //Border limitations

        if (Math.abs(differenceX) >= player.speed) {
            player.x += differenceX > 0 ? player.speed : -player.speed;
        }
        else {
            player.x = mouseX;
        }


        if (Math.abs(differenceY) >= player.speed) {
            player.y += differenceY > 0 ? player.speed : -player.speed;
        }
        else {
            player.y = mouseY;
        }

    }
    else {
        //Keyboard Movement
        if (!rightPressed && !leftPressed && !downPressed && !upPressed && player.accel > 0) {
            player.accel -= 20;
            slowDown(player.accel / 100);
        }
        else if ((rightPressed || leftPressed || downPressed || upPressed) && player.accel < 100) {
            player.accel = 100;
            playerMove(player.accel / 100);
            lastPressed = [];
        }
        else {
            playerMove(player.accel / 100);
        }

        if (player.accel < 0) { player.accel = 0; }
        if (player.accel > 100) { player.accel = 100; }
    }

    if (player.x < player.w / 2) { player.x = player.w / 2 }
    else if (player.x + player.w / 2 > sw) { player.x = sw - player.w / 2 }
    if (player.y < player.h / 2) { player.y = player.h / 2 }
    else if (player.y + player.h / 2 > sh) { player.y = sh - player.h / 2 }

    player.draw();


}