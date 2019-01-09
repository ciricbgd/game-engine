export var hpBar: any;
var gameScreen:any;
var pauseScreen:any;

export function init(hpBarParam, gameScreenParam, pauseScreenParam) {
    hpBar = hpBarParam;
    gameScreen = gameScreenParam;
    pauseScreen = pauseScreenParam;
}

export function updateHp(hp) {
    hpBar.innerHTML = hp;
}


export function updateUi(gameStatus){
    if(gameStatus=='unpaused'){
        gameScreen.style.cursor = 'none';
        pauseScreen.style.display='none';
    }
    else if(gameStatus=='paused'){
        gameScreen.style.cursor = 'auto';
        pauseScreen.style.display='inherit';
    }
}