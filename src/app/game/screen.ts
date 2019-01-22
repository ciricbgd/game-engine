import * as entities from '../game/entities';

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
//Background canvas
export var background: any;
//Sides
export var leftSide: any;
export var rightSide: any;

export function init(playerCanvasParam, bulletCanvasParam, enemyCanvasParam, backgroundParam, leftSideParam, rightSideParam) {
    playerCanvas = playerCanvasParam;
    bulletCanvas = bulletCanvasParam;
    enemyCanvas = enemyCanvasParam;
    background = backgroundParam;
    leftSide = leftSideParam;
    rightSide = rightSideParam;

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
        background.style.left = sideSpacing;

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

    //Background
    background.width = sw;
    background.height = sh;
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
export function gridPos(place) {
    let x, y, number = place.substr(1), letter = (place.substr(0, 1)).toLowerCase();
    switch (letter) {
        case 'a': letter = 1; break;
        case 'b': letter = 2; break;
        case 'c': letter = 3; break;
        case 'd': letter = 4; break;
        case 'e': letter = 5; break;
        case 'f': letter = 6; break;
        case 'g': letter = 7; break;
        case 'h': letter = 8; break;
        case 'i': letter = 9; break;
        case 'j': letter = 10; break;
        case 'k': letter = 11; break;
        case 'l': letter = 12; break;
        case 'm': letter = 13; break;
        case 'n': letter = 14; break;
        case 'o': letter = 15; break;
        case 'p': letter = 16; break;
        case 'q': letter = 17; break;
        case 'r': letter = 18; break;
        case 's': letter = 19; break;
        case 't': letter = 20; break;
        case 'u': letter = 21; break;
        case 'v': letter = 22; break;
        case 'w': letter = 23; break;
        case 'x': letter = 24; break;
        case 'y': letter = 25; break;
        case 'z': letter = 26; break;
    }

    x = number * cbX * 2 - cbX;
    y = letter * cbY * 2 - cbY;
    return [x, y];
}