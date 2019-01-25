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
export function gridPos(place: any) {
    //If it is a single place
    if (typeof place == "string") {
        let numberX = parseInt(place.toString().substr(1)), letter = (place.toString().substr(0, 1)).toLowerCase(), numberY;
        switch (letter) {
            case 'a': numberY = 1; break;
            case 'b': numberY = 2; break;
            case 'c': numberY = 3; break;
            case 'd': numberY = 4; break;
            case 'e': numberY = 5; break;
            case 'f': numberY = 6; break;
            case 'g': numberY = 7; break;
            case 'h': numberY = 8; break;
            case 'i': numberY = 9; break;
            case 'j': numberY = 10; break;
            case 'k': numberY = 11; break;
            case 'l': numberY = 12; break;
            case 'm': numberY = 13; break;
            case 'n': numberY = 14; break;
            case 'o': numberY = 15; break;
            case 'p': numberY = 16; break;
            case 'q': numberY = 17; break;
            case 'r': numberY = 18; break;
            case 's': numberY = 19; break;
            case 't': numberY = 20; break;
            case 'u': numberY = 21; break;
            case 'v': numberY = 22; break;
            case 'w': numberY = 23; break;
            case 'x': numberY = 24; break;
            case 'y': numberY = 25; break;
            case 'z': numberY = 26; break;
        }

        let x = numberX * cbX * 2 - cbX;
        let y = numberY * cbY * 2 - cbY;
        return [x, y];
    }
    //If it's multiple places
    else if (typeof place == "object") {
        let coordinates = [];
        place.forEach(place => {
            let numberX = parseInt(place.toString().substr(1)), letter = (place.toString().substr(0, 1)).toLowerCase(), numberY;
            switch (letter) {
                case 'a': numberY = 1; break;
                case 'b': numberY = 2; break;
                case 'c': numberY = 3; break;
                case 'd': numberY = 4; break;
                case 'e': numberY = 5; break;
                case 'f': numberY = 6; break;
                case 'g': numberY = 7; break;
                case 'h': numberY = 8; break;
                case 'i': numberY = 9; break;
                case 'j': numberY = 10; break;
                case 'k': numberY = 11; break;
                case 'l': numberY = 12; break;
                case 'm': numberY = 13; break;
                case 'n': numberY = 14; break;
                case 'o': numberY = 15; break;
                case 'p': numberY = 16; break;
                case 'q': numberY = 17; break;
                case 'r': numberY = 18; break;
                case 's': numberY = 19; break;
                case 't': numberY = 20; break;
                case 'u': numberY = 21; break;
                case 'v': numberY = 22; break;
                case 'w': numberY = 23; break;
                case 'x': numberY = 24; break;
                case 'y': numberY = 25; break;
                case 'z': numberY = 26; break;
            }

            let x = numberX * cbX * 2 - cbX;
            let y = numberY * cbY * 2 - cbY;
            coordinates.push([x, y]);
        });
        return coordinates;
    }
}