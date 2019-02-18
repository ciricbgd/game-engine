import * as  entities from '../game/entities';
import { viewAttached } from '@angular/core/src/render3/instructions';
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
    progress;
    title;
    background;
    music;
    waves;
    constructor(lvl: any) {
        this.number = lvl.number
        this.progress = 0;
        this.title = lvl.title;
        this.background = lvl.background;
        this.music = lvl.music;
        lvl.waves.forEach(wave => {
            wave.pauseBeforeSet = false;
            wave.pauseAfterSet = false;
            wave.requireClear ? wave.cleared = false : wave.cleared = true;
            if (wave.pause != undefined) {
                wave.pauseSet = false;
                wave.pauseClear = false;
            } else {
                wave.pauseSet = true;
                wave.pauseClear = true;
            }
            wave.enemies.forEach(enemy => {
                enemy.initiated = false;
                if (enemy.pause != undefined) {
                    enemy.pauseClear = false;
                } else {
                    enemy.pauseClear = true;
                }
            });
            wave.pickups.forEach(pickup => {
                pickup.initiated = false;
            });
        });
        this.waves = lvl.waves;

    }
}

export var currentLevel;

//Used for loading new level (1 to initialize the game)
export function changeLevel(lvlnum) {
    $.ajax({
        url: `../src/app/game/levels/${lvlnum}.json`,
        type: 'GET',
        error: function () {
            console.log('Error getting level');//needs to be parsed more
        },
        success: function (level) {
            level.number = lvlnum;
            currentLevel = new Level(level);
            currentLevel.status = "ready"
        }
    });
}

//The timeline and how events play out
export function playLevel(lvl) {
    if (lvl != undefined && lvl.status == "ready") {
        let wave = lvl.waves[lvl.progress];
        //--------Spawning enemies -------------
        let enemiesleft = wave.enemies.length;
        wave.enemies.forEach((enemy, i) => {
            if (!enemy.initiated) {
                if (i == 0) {
                    enemy.initiated = true;
                    entities.spawnEnemy(enemy.id, enemy.pos);
                    enemy.pauseTime = time + enemy.pause;
                }
                else if (wave.enemies[i - 1].pauseClear) {
                    enemy.initiated = true;
                    entities.spawnEnemy(enemy.id, enemy.pos);
                    enemy.pauseTime = time + enemy.pause;
                }
                else if (i > 0 && !wave.enemies[i - 1].pauseClear) {
                    if (time >= wave.enemies[i - 1].pauseTime) {
                        wave.enemies[i - 1].pauseClear = true;
                    }
                }
            }
            else {
                enemiesleft--;
            }
        });
        //!--------Spawning enemies -------------
        //--------Checking if wave is cleared -------------
        if (wave.cleared == false && enemiesleft <= 0 && entities.enemies.length < 1) {
            wave.cleared = true
            //--------Setting pause after a wave --------------
            if (!wave.pauseSet) {
                wave.pauseTime = time + wave.pause;
                wave.pauseSet = true;
            }
            //!--------Setting pause after a wave -------------
        };
        if (wave.pauseSet && !wave.pauseClear) {
            if (time >= wave.pauseTime) {
                wave.pauseClear = true;
            }
        }
        if (wave.cleared == true && wave.pauseClear && currentLevel.progress < currentLevel.waves.length - 1) {
            currentLevel.progress++;
        }
        //!--------Checking if wave is cleared -------------
    }
}