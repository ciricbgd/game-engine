class Base {
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    player;
    lastPressed = [];
}

let base = new Base(); // Making "base". Alternative to "this" outside of function scope
document.addEventListener('keydown', keyDownHandler, false); //Listener to keydown events
document.addEventListener('keyup', keyUpHandler, false); //Listener to keyup events


function keyDownHandler(event) {
    if (event.keyCode == 39) {
        base.rightPressed = true;

    }
    else if (event.keyCode == 37) {
        base.leftPressed = true;

    }
    if (event.keyCode == 40) {
        base.downPressed = true;

    }
    else if (event.keyCode == 38) {
        base.upPressed = true;

    }
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        base.rightPressed = false;

    }
    else if (event.keyCode == 37) {
        base.leftPressed = false;

    }
    if (event.keyCode == 40) {
        base.downPressed = false;

    }
    else if (event.keyCode == 38) {
        base.upPressed = false;

    }
}


export function changeMovement(sw, sh, player) {
    base.player = player;

    if (!base.rightPressed && !base.leftPressed && !base.downPressed && !base.upPressed && base.player.accel > 0) {
        base.player.accel -= 12;
        slowDown(base.player.accel / 100);
    }
    else if ((base.rightPressed || base.leftPressed || base.downPressed || base.upPressed) && base.player.accel < 100) {
        base.player.accel = 100;
        playerMove(base.player.accel / 100);
        base.lastPressed = [];
    }
    else {
        playerMove(base.player.accel / 100);
    }

    if (base.player.accel < 0) { base.player.accel = 0; }
    if (base.player.accel > 100) { base.player.accel = 100; }

    //Border limitations
    if (base.player.x - base.player.w / 2 < 0) { base.player.x = base.player.w / 2 }
    if (base.player.x + base.player.w / 2 > sw) { base.player.x = sw - base.player.w / 2 }
    if (base.player.y - base.player.h / 2 < 0) { base.player.y = base.player.h / 2 }
    if (base.player.y + base.player.h / 2 > sh) { base.player.y = sh - base.player.h / 2 }
    return {
        x: base.player.x,
        y: base.player.y,
        accel: base.player.accel,
        lastPressed: base.lastPressed,
    };
}

function playerMove(accel) {
    if (base.rightPressed) {
        base.player.x += base.player.speed * accel;
        base.lastPressed[0] = 'right';
    }
    else if (base.leftPressed) {
        base.player.x -= base.player.speed * accel;
        base.lastPressed[0] = 'left';
    }

    if (base.downPressed) {
        base.player.y += base.player.speed * accel;
        base.lastPressed[1] = 'down';
    }
    else if (base.upPressed) {
        base.player.y -= base.player.speed * accel;
        base.lastPressed[1] = 'up';
    }
}

function slowDown(accel) {
    if (base.lastPressed[0] == 'right') { base.player.x += base.player.speed * accel; }
    else if (base.lastPressed[0] == 'left') { base.player.x -= base.player.speed * accel; }
    if (base.lastPressed[1] == 'down') { base.player.y += base.player.speed * accel; }
    else if (base.lastPressed[1] == 'up') { base.player.y -= base.player.speed * accel; }
}