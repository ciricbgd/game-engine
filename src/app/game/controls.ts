import * as screen from '../game/screen';
import * as  entities from '../game/entities';
import * as game from '../game/engine';

document.addEventListener('keydown', keyDownHandler, false); //Listener to keydown events
document.addEventListener('keyup', keyUpHandler, false); //Listener to keyup events
document.addEventListener("mousemove", mouseMoveHandler, false); // Listening to mouse movement

//Mouse movement
export function mouseMoveHandler(e) {
    var mouseX = e.clientX - screen.playerCanvas.offsetLeft;
    var mouseY = e.clientY - screen.playerCanvas.offsetTop;

    //Border limitations
    if(mouseX < entities.player.w/2){ entities.player.x = entities.player.w / 2 }
    else if (mouseX + entities.player.w/2 > screen.sw){ entities.player.x = screen.sw - entities.player.w / 2 }
    else{entities.player.x = mouseX;}

    if(mouseY < entities.player.h/2){ entities.player.y = entities.player.h / 2 }
    else if (mouseY + entities.player.h/2 > screen.sh){ entities.player.y = screen.sh - entities.player.h / 2 }
    else{entities.player.y = mouseY;}

}

//Keyboard movement
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
export var escapePressed = false;
var lastPressed = [];


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
        if(escapePressed==true)
        {
            game.togglePause('unpaused');
            escapePressed=false;
        }
        else
        {
            game.togglePause('paused');
            escapePressed=true;
        }
    }
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
}


function playerMove(accel) {
    if (rightPressed) {
        entities.player.x += entities.player.speed * accel;
        lastPressed[0] = 'right';
    }
    else if (leftPressed) {
        entities.player.x -= entities.player.speed * accel;
        lastPressed[0] = 'left';
    }

    if (downPressed) {
        entities.player.y += entities.player.speed * accel;
        lastPressed[1] = 'down';
    }
    else if (upPressed) {
        entities.player.y -= entities.player.speed * accel;
        lastPressed[1] = 'up';
    }
}

function slowDown(accel) {
    if (lastPressed[0] == 'right') { entities.player.x += entities.player.speed * accel; }
    else if (lastPressed[0] == 'left') { entities.player.x -= entities.player.speed * accel; }
    if (lastPressed[1] == 'down') { entities.player.y += entities.player.speed * accel; }
    else if (lastPressed[1] == 'up') { entities.player.y -= entities.player.speed * accel; }
}

export function changeMovement() {
    entities.player.draw();

    if (!rightPressed && !leftPressed && !downPressed && !upPressed && entities.player.accel > 0) {
        entities.player.accel -= 20;
        slowDown(entities.player.accel / 100);
    }
    else if ((rightPressed || leftPressed || downPressed || upPressed) && entities.player.accel < 100) {
        entities.player.accel = 100;
        playerMove(entities.player.accel / 100);
        lastPressed = [];
    }
    else {
        playerMove(entities.player.accel / 100);
    }

    if (entities.player.accel < 0) { entities.player.accel = 0; }
    if (entities.player.accel > 100) { entities.player.accel = 100; }

    //Mouse movement 
    mouseMoveHandler;
    //Border limitations
    if (entities.player.x - entities.player.w / 2 < 0) { entities.player.x = entities.player.w / 2 }
    if (entities.player.x + entities.player.w / 2 > screen.sw) { entities.player.x = screen.sw - entities.player.w / 2 }
    if (entities.player.y - entities.player.h / 2 < 0) { entities.player.y = entities.player.h / 2 }
    if (entities.player.y + entities.player.h / 2 > screen.sh) { entities.player.y = screen.sh - entities.player.h / 2 }

}