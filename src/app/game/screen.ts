import * as entities from '../game/entities';

export var sw;// Screen width
export var sh;// Screen height
export var sp;// Size point - according to screen width

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

    //Update screen width and height for redrawing entities
    if (entities.base != undefined) {
        entities.base.sw = sw;
        entities.base.sh = sh;
        entities.base.sp = sp;
        entities.updateEntities();
    }

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