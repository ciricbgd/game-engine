import { spawnEnemy, spawnPickup } from './entities';
import { enemies } from './entities/enemies/enemyCollection';
import { pickups } from './entities/pickups/pickupCollection';
import { displayTitle, titleDisplayed, resetTitle, playOutro, outroVideoExecuted } from './ui';
import { bg, setBackground, enemyScreen } from './screen';
import { BgMusic } from './sound';
import * as debug from './debug';

declare let $: any;

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

export var status = "paused";

export function togglePause(pauseButton) {
    status = pauseButton;
}


// Music plays if user is active
export function checkGameStatus() {
    if (status == 'paused') {
        //The game is paused

    }
}
document.addEventListener('mouseover', function () {
    if (!userActive) { userActive = true; BgMusic.play(); }
})
//! Music plays if user is active

export var userActive = false;

export var numberOfLevels = 1;

//The class of a current level
export class Level {
    number;
    progress;
    title;
    background;
    music;
    waves;
    subtitle;
    bg0; bg1; bg2;
    status;
    constructor(lvl: any) {
        this.number = lvl.number
        this.progress = 0;
        this.title = lvl.title;
        this.subtitle = lvl.subtitle;
        this.background = lvl.background;
        this.music = '../../assets/sound/background/' + lvl.music;
        //setting screen background
        this.bg0 = lvl.background[0];
        this.bg1 = lvl.background[1];
        this.bg2 = lvl.background[2];
        setBackground([this.bg0, this.bg1, this.bg2]);
        //!setting screen background
        lvl.waves.forEach(wave => {
            wave.cleared = false;
            wave.requireClear = wave.requireClear != undefined ? true : false;
            wave.pauseBeforeSet = false;
            wave.pauseAfterSet = false;
            if (wave.pause != undefined) {
                wave.pauseSet = false;
                wave.pauseClear = false;
            } else {
                wave.pauseSet = true;
                wave.pauseClear = false;
            }
            wave.enemies.forEach(enemy => {
                enemy.initiated = false;
                enemy.pauseClear = enemy.pauseClear != undefined ? enemyScreen.pauseClear : 0;
            });

            wave.pickups.forEach(pickup => {
                pickup.initiated = false;
                if (pickup.pause == undefined) { pickup.pause = 0; }
            });
        });
        this.waves = lvl.waves;
        this.status = 'ready';
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

            resetTitle();

            let loadMusic = new Promise(function (resolve, reject) {
                BgMusic.src(currentLevel.music);

                let musicLoaded = true;
                if (musicLoaded) { resolve(true); } else { reject(false); }
            });

            loadMusic.then(function () {
                BgMusic.play();
            });
        }
    });
}



//The timeline and how events play out
export function playLevel(lvl) {
    if (lvl != undefined && lvl.status == "ready") {
        if (titleDisplayed) {

            let wave = lvl.waves[lvl.progress];
            //--------Spawning enemies -------------
            let enemiesToSpawn = wave.enemies.length;
            if (enemiesToSpawn > 0) {
                wave.enemies.forEach((enemy, i) => {
                    if (!enemy.initiated) {
                        if (i == 0) {
                            enemy.initiated = true;
                            spawnEnemy(enemy.id, enemy.pos);
                            enemy.pauseTime = time + enemy.pause;
                        }
                        else if (wave.enemies[i - 1].pauseClear) {
                            enemy.initiated = true;
                            enemy.pauseClear = true;
                            spawnEnemy(enemy.id, enemy.pos);
                            if (enemy.pause == undefined) { enemy.pauseTime = time + enemy.pause };
                        }
                        else if (time >= wave.enemies[i - 1].pauseTime) {
                            wave.enemies[i - 1].pauseClear = true;
                        }
                    }
                    else {
                        enemiesToSpawn--;
                    }
                });
            }
            //!--------Spawning enemies -------------

            //---------Spawning pickups -------------
            let pickupsToSpawn = wave.pickups.length;
            if (pickupsToSpawn > 0) {
                wave.pickups.forEach((pickup, i) => {
                    if (!pickup.initiated) {
                        if (i == 0) {
                            pickup.initiated = true;
                            spawnPickup(pickup.id, pickup.pos);
                            pickup.pauseTime = time + pickup.puse;
                        }
                        else if (wave.pickups[i - 1].pauseClear) {
                            pickup.initiated = true;
                            pickup.pauseClear = true;
                            spawnPickup(pickup.id, pickup.pos);
                            if (pickup.pause == undefined) pickup.pauseTime = time + pickup.pause;
                        }
                        else {
                            if (time >= wave.pickups[i - 1].pauseTime) {
                                wave.pickups[i - 1].pauseClear = true;
                            }
                        }
                    }
                    else {
                        pickupsToSpawn--;
                    }
                });
            }
            //!---------Spawning pickups -------------

            //--------Checking if wave is cleared -------------
            let everythingSpawned: boolean = (enemiesToSpawn <= 0 && pickupsToSpawn <= 0) ? true : false;
            let enemiesKilledIfRequired: boolean = ((wave.requireClear && enemies.length <= 0) || !wave.requireClear) ? true : false;

            if (!wave.pauseSet) {
                if (everythingSpawned && enemiesKilledIfRequired) {
                    //--------Setting pause after a wave --------------
                    wave.pauseTime = time + wave.pause;
                    wave.pauseSet = true;
                    //!--------Setting pause after a wave -------------
                };
            }
            else if (wave.pauseSet && !wave.pauseClear) {
                if (time >= wave.pauseTime) {
                    wave.pauseClear = true;
                    wave.cleared = true;
                }
            }
            else if (wave.cleared == true) {
                if (currentLevel.progress < currentLevel.waves.length - 1) {
                    //Send in the next wave
                    currentLevel.progress++;
                }
                else {
                    //Send in the next level
                    if (currentLevel.number < numberOfLevels) {
                        changeLevel(currentLevel.number + 1);
                    }
                    else {
                        // Game finished, you win!
                        if (!outroVideoExecuted) { playOutro(); }
                    }
                }
            }
        }
        //!--------Checking if wave is cleared -------------
        else {
            //---------Displaying title -------------
            displayTitle(lvl.title, lvl.subtitle);
            //!--------Displaying title -------------
        }
    }
}
