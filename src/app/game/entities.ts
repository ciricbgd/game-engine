import * as screen from '../game/screen';

//Entities
import { enemyType, enemies } from './entities/enemies/enemyCollection';
import { pickups, pickupType } from './entities/pickups/pickupCollection';
import { bulletType, enemyAttacks, friendlyAttacks } from './entities/ammo/ammoCollection';

import { Player } from './entities/player';
//!Entities

export var player;

export function getEntities() {
    return player != undefined ? [player].concat(enemies, pickups, friendlyAttacks, enemyAttacks) : [];
}

export function init() {
    player = new Player();
}


//--------------------- FUNCTIONS ---------------------------------------------------------------FUNCTIONS-----------------------------------/

//Spawning enemies
export function spawnEnemy(id, place) {
    let pos = screen.gridPos(place);
    let A = { x: pos[0][0], y: pos[0][1] }, C = { x: undefined, y: undefined }
    //Spawning enemies as a single position for input
    if (pos.length <= 1) {
        C.x = (A.x < screen.sw / 2) ? (-A.x) : (screen.sw + A.x);
        C.y = (A.y < screen.sh / 2) ? (-A.y) : (screen.sh + A.y);
    }
    //Spawning enemies with an array of position paths to follow at spawn
    else {
        let B = { x: pos[1][0], y: pos[1][1] }
        C.x = A.x - (B.x - A.x);
        C.y = A.y - (B.y - A.y);
    }
    pos.unshift([C.x, C.y]);
    let enemy = new enemyType[id](pos[0][0], pos[0][1]);
    enemy.spawnpath.progress.finish = place.length;
    enemy.spawnpath.places = place;
    enemy.spawnpath.progress.finish = place.length;
    enemies.push(enemy);
}

//Spawning pickups
export function spawnPickup(id, place) {
    let pos = screen.gridPos(place);
    let pickup = new pickupType[id](pos[0], -pos[1]);
    //pickup.balloon = new Balloon(pos[0], -pos[1]);
    pickups.push(pickup);
}

//Move everything that moves with the same speed of background

//Drawing all entities
export function drawEntities() {
    //Draw enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        enemies[i].animate();
    }

    //Draw friendly bullets
    player.shoot();
    for (let i = 0; i < friendlyAttacks.length; i++) {
        friendlyAttacks[i].draw(); // Drawing the bullets
        friendlyAttacks[i].y -= friendlyAttacks[i].speed; //Moving the bullets
        if (friendlyAttacks[i].y < 0) { friendlyAttacks.splice(i, 1); } //Removing bullets when they get off screen
        //Removing bullets that have a lifetime
        else if (friendlyAttacks[i].timetodie != undefined) {
            let clock = new Date();
            let currenttime = clock.getTime();
            if (currenttime >= friendlyAttacks[i].timetodie) {
                friendlyAttacks.splice(i, 1);
            }
        }
    }

    //Draw enemy bullets
    enemies.forEach(enemy => {
        enemy.shoot();
    });
    for (let i = 0; i < enemyAttacks.length; i++) {
        enemyAttacks[i].draw(); // Drawing the bullets
        enemyAttacks[i].y += enemyAttacks[i].speed; //Moving the bullets
        if (enemyAttacks[i].y > screen.sh) { enemyAttacks.splice(i, 1); } //Removing bullets when they get off screen
    }

    //Draw pickups
    pickups.forEach(pickup => {
        pickup.draw();
        pickup.animate();
        pickup.balloon.draw();
        pickup.balloon.animate();
    });
}

//Update entities on screen resize
export function updateEntities() {
    if (player != undefined) {
        player.h = player.height * screen.sp;
        player.w = player.width * screen.sp;
    }
    if (enemies != undefined) {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].h = enemies[i].height * screen.sp;
            enemies[i].w = enemies[i].width * screen.sp;
        }
    }
}


//Moving enemies
export function moveEnemies() {
    enemies.forEach((enemy, i) => {
        if (enemy.status == "spawning") {
            enemy.followSpawnPath();
        }
        //Deleting enemies below screen
        if (enemy.y - enemy.height / 2 > screen.sh) { enemy.die(i); }
    });
}

//Moving stationary items
export function moveStationary() {
    let speed = screen.bg.layer0.speed * screen.sp;

    pickups.forEach((pickup, i) => {
        pickup.y += speed;
        pickup.balloon.y += speed;
        //Removing item if it's off screen
        if (pickup.y - pickup.h > screen.sh) { pickups.splice(i, 1); }
    });
}
//!--------------------- FUNCTIONS ---------------------------------------------------------------FUNCTIONS-----------------------------------/
