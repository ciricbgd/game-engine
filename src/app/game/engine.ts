import * as  entities from '../game/entities';
declare let $: any;

// let htpp;
// export function changeLevel(lvl) {

//     http.get(`C:/UrosCiric/Razno/zavrsni/src/app/game/levels/${lvl}.json`)
//         .subscribe(response => { console.log(response) });
//     console.log(level);
// }

var clock = new Date();
export var time = clock.getTime();
export var level;

export function updateTime() {
    let clock = new Date();
    time = clock.getTime();
}

export function delayTime(timeMs) {
    return (time + timeMs);
}

export var status = 'unpaused';

export function togglePause(pauseButton) {
    status = pauseButton;
}


export function checkGameStatus() {
    if (status == 'paused') {
        //The game is paused

    }
}

//The class of a current level
export class Level {
    number;
    constructor(number = undefined) {
        this.number = number;
    }
}

export var currentLevel = new Level();

//Used for loading new level (1 to initialize the game)
export function changeLevel(lvl) {
    $.ajax({
        url: `../src/app/game/levels/${lvl}.json`,
        type: 'GET',
        error: function () {
            console.log('Error getting level');//needs to be parsed more
        },
        success: function (level) {
            playLevel(level.waves);
            currentLevel.number = lvl;
        }
    });
}

//The timeline and how events play out
export function playLevel(waves) {
    let wave = waves[0];
    wave.enemies.forEach(enemy => {
        entities.spawnEnemy(enemy.id, enemy.pos);
    });
}


export var sequence;
//Playing out the level in order
export function sequencing() {

}