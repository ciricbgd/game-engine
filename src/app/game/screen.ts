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

export function init(swParam, shParam, playerCanvasParam, bulletCanvasParam, enemyCanvasParam, backgroundParam) {
    //Landscape
    if (swParam > shParam) {
        sh = shParam;
        sw = sh;
        sp = sh / 1280;
    }
    //Portrait
    else {
        sw = swParam;
        sh = sw;
        sp = sh / 1280;
    }


    //Player canvas
    playerCanvas = playerCanvasParam;
    playerCanvas.width = sw;
    playerCanvas.height = sh;
    playerScreen = playerCanvas.getContext("2d");

    //Bullet canvas
    bulletCanvas = bulletCanvasParam;
    bulletCanvas.width = sw;
    bulletCanvas.height = sh;
    bulletScreen = bulletCanvas.getContext("2d");

    //Enemy canvas
    enemyCanvas = enemyCanvasParam;
    enemyCanvas.width = sw;
    enemyCanvas.height = sh;
    enemyScreen = enemyCanvas.getContext("2d");

    //Background
    background = backgroundParam;
    background.width = sw;
    background.height = sh;
}

//Resize event
window.addEventListener("resize", resize);
function resize() {
    console.log('resized');
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