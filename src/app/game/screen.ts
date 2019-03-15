import * as entities from '../game/entities';
import { BlockingProxy } from 'blocking-proxy';

export var sw;// Screen width
export var sh;// Screen height
export var sp;// Size point - according to screen width
export var cbX;//Checkerboard point in width
export var cbY;//Checkerboard point in height

//Player canvas
export var playerCanvas: any;
export var playerScreen;
//Bullet canvas
export var bulletCanvas: any;
export var bulletScreen;
//Enemy canvas
export var enemyCanvas: any;
export var enemyScreen;

//Sides
export var leftSide: any;
export var rightSide: any;

export function init(playerCanvasParam, bulletCanvasParam, enemyCanvasParam, leftSideParam, rightSideParam, bg0, bg1, bg2) {
    playerCanvas = playerCanvasParam;
    bulletCanvas = bulletCanvasParam;
    enemyCanvas = enemyCanvasParam;
    leftSide = leftSideParam;
    rightSide = rightSideParam;

    bg.layer0.obj = bg0;
    bg.layer1.obj = bg1;
    bg.layer2.obj = bg2;

    resize();
}

//Resize event
window.addEventListener("resize", resize);
function resize() {
    //Landscape
    if (window.innerWidth > window.innerHeight) {
        sh = window.innerHeight;
        sw = sh;
        sp = sh / 1280;

        //Setting the sides
        let sideSpacing = (window.innerWidth - sw) / 2 + 'px';

        leftSide.style.width = sideSpacing;
        rightSide.style.width = sideSpacing;

        //Centering the screen
        playerCanvas.style.left = sideSpacing;
        enemyCanvas.style.left = sideSpacing;
        bulletCanvas.style.left = sideSpacing;

    }
    //Portrait
    else {
        sw = window.innerWidth;
        sh = sw;
        sp = sh / 1280;
    }

    //Checkerboard points
    cbX = sw / 54;
    cbY = sw / 52;

    //Player canvas
    playerCanvas.width = sw;
    playerCanvas.height = sh;
    playerScreen = playerCanvas.getContext("2d");

    //Bullet canvas
    bulletCanvas.width = sw;
    bulletCanvas.height = sh;
    bulletScreen = bulletCanvas.getContext("2d");

    //Enemy canvas
    enemyCanvas.width = sw;
    enemyCanvas.height = sh;
    enemyScreen = enemyCanvas.getContext("2d");

}

//Function to clear canvas
export function clearCanvas(screen, canvas) {
    screen.clearRect(0, 0, canvas.width, canvas.height);
}

//Function to clear all canvases
export function clearScreen() {
    clearCanvas(playerScreen, playerCanvas);
    clearCanvas(bulletScreen, bulletCanvas);
    clearCanvas(enemyScreen, enemyCanvas);
}


//Gets coordinates from spawn grid (src/assets/SpawnGrid.jpg)
export function letterToNumber(letter) {
    switch (letter) {
        case 'a': return 1;
        case 'b': return 2;
        case 'c': return 3;
        case 'd': return 4;
        case 'e': return 5;
        case 'f': return 6;
        case 'g': return 7;
        case 'h': return 8;
        case 'i': return 9;
        case 'j': return 10;
        case 'k': return 11;
        case 'l': return 12;
        case 'm': return 13;
        case 'n': return 14;
        case 'o': return 15;
        case 'p': return 16;
        case 'q': return 17;
        case 'r': return 18;
        case 's': return 19;
        case 't': return 20;
        case 'u': return 21;
        case 'v': return 22;
        case 'w': return 23;
        case 'x': return 24;
        case 'y': return 25;
        case 'z': return 26;
    }
}

export function gridPos(place: any) {
    //If it is a single place
    if (typeof place == "string") {
        let numberX = parseInt(place.toString().substr(1)), letter = (place.toString().substr(0, 1)).toLowerCase();
        let numberY = letterToNumber(letter);

        let x = numberX * cbX * 2 - cbX;
        let y = numberY * cbY * 2 - cbY;
        return [x, y];
    }
    //If it's multiple places
    else if (typeof place == "object") {
        let coordinates = [];
        place.forEach(place => {
            let numberX = parseInt(place.toString().substr(1)), letter = (place.toString().substr(0, 1)).toLowerCase();
            let numberY = letterToNumber(letter);

            let x = numberX * cbX * 2 - cbX;
            let y = numberY * cbY * 2 - cbY;
            coordinates.push([x, y]);
        });
        return coordinates;
    }
}

// ------------ Background --------------------
export var bg = {
    layer0: { obj: undefined, speed: 0, height: undefined, width: undefined, pos: 0 },
    layer1: { obj: undefined, speed: 0, height: undefined, width: undefined, pos: 0 },
    layer2: { obj: undefined, speed: 0, height: undefined, width: undefined, pos: 0 },
}

export function setBackground(bg0, bg1, bg2) {
    if (bg0 != null) { bg.layer0.obj.style.backgroundImage = "url('../../assets/sprites/maps/" + bg0.src + "')"; bg.layer0.speed = bg0.speed; bg.layer0.height = bg0.height; bg.layer0.width = bg0.width; }
    if (bg1 != null) { bg.layer1.obj.style.backgroundImage = "url('../../assets/sprites/maps/" + bg1.src + "')"; bg.layer1.speed = bg1.speed; bg.layer1.height = bg1.height; bg.layer1.width = bg1.width; }
    if (bg2 != null) { bg.layer0.obj.style.backgroundImage = "url('../../assets/sprites/maps/" + bg2.src + "')"; bg.layer2.speed = bg2.speed; bg.layer2.height = bg2.height; bg.layer2.width = bg2.width; }
}

export function moveBackground(bcg) {
    bcg.obj.style.backgroundPosition = '0px ' + bcg.pos + 'px';
    let speed = sp * bcg.speed,
        height = (bcg.height * bg.layer0.obj.offsetHeight) / bcg.width;
    if (bcg.pos >= height) { bcg.pos = speed - (height - bcg.pos); } else { bcg.pos += speed; }
}

