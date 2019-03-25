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
    layer0: { obj: undefined, speed: 0, height: undefined, width: undefined, pos: 0, delay: 0, },
    layer1: { obj: undefined, speed: 0, height: undefined, width: undefined, pos: 0, delay: 0, },
    layer2: { obj: undefined, speed: 0, height: undefined, width: undefined, pos: 0, delay: 0, },
    layer(num) {
        switch (num) {
            case 0: return bg.layer0;
            case 1: return bg.layer1;
            case 2: return bg.layer2;
        }
    }
}

export function setBackground(bgLayer) {
    bgLayer.forEach((bcg, i) => {
        if (bcg != null) {
            bg.layer(i).obj.style.backgroundImage = "url('../../assets/sprites/maps/" + bcg.src + "')";
            bg.layer(i).speed = bcg.speed;
            bg.layer(i).height = bcg.height;
            bg.layer(i).width = bcg.width;
            bg.layer(i).delay = bcg.delay
            if (i > 0) {
                bg.layer(i).obj.style.width = bcg.size + '%';
                bcg.margin == undefined ? bcg.margin = 0 : bcg.margin;
                switch (bcg.place) {
                    case 'left': bg.layer(i).obj.style.left = bcg.margin + '%'; break;
                    case 'right': bg.layer(i).obj.style.right = bcg.margin + '%'; break;
                }

            }
        }
    });
}

export function moveBackground(bgLayer) {
    bgLayer.forEach((bcg, i) => {
        bcg.obj.style.backgroundPosition = '0px ' + bcg.pos + 'px';
        let speed = sp * bcg.speed;
        if (i == 0) {
            let height = (bcg.height * bg.layer0.obj.offsetHeight) / bcg.width;
            if (bcg.pos >= height) { bcg.pos = speed - (height - bcg.pos); } else { bcg.pos += speed; }
        }
        else {
            if (bcg.pos >= bg.layer0.obj.offsetHeight) { bcg.pos = - bcg.height - bcg.delay } else { bcg.pos += speed; }
        }
    });
}

