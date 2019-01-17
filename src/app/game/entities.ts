import * as game from '../game/engine';
import * as screen from '../game/screen';
import * as ui from '../game/ui';
class Base {
    playerScreen;
    enemyScreen;
    bulletScreen;
    sp;//Screen point - used to scale entities
    sw;
    sh;
}
export var player;


export var base = new Base(); // Making "base". Alternative to "this" outside of function scope
// Entities - player, enemies, bosses
export var enemies = [];//Array of existing enemies
export var ammo = {};//Array of existing bullets
export var enemyAttacks = [];//Array of enemy bullets and other attacks
export var friendlyAttacks = [];//Array of friendly bullets and special attacks

export function init(playerScreen, bulletScreen, enemyScreen, sp, sw, sh) {
    base.playerScreen = playerScreen;
    base.bulletScreen = bulletScreen;
    base.enemyScreen = enemyScreen;

    base.sp = sp;
    base.sw = sw;
    base.sh = sh;

    ammo['Aicorn'] = new Aicorn(null, null);

    player = new Player();
    player.draw();
}

class Entity {
    id;
    name; //Name of an entity
    x; //X coordinate of where the entity is drawn
    y; //Y coordinate of where the entity is drawn
    w; //Entity hitbox width
    width;
    h; //Entity hitbox height
    height;
    speed; //Speed of an entity
    boxColor = "#AAAAAA"; //Hitbox color - used mostly for testing purposes
    screen; //Canvas ("layer") where entity is drawn
    accel = 100; //Acceleration of an entity 0-100
    hp; //Health points
    draw() {
        this.screen.fillStyle = this.boxColor;
        this.screen.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
    hurt(dmg) {
        this.hp -= dmg;
    }
}

//Unit
class Unit extends Entity {
    ammo;
    type;
    shootWait = null;
    shoot(allowed: boolean) {
        if (allowed) {
            if (this.shootWait == null || game.time >= this.shootWait) {
                if (this.type == 'friend') {
                    let x = this.x;
                    let y = this.y - this.h / 2 - this.ammo.h / 2;
                    let attack = new Aicorn(x, y);
                    friendlyAttacks.push(attack);
                }
                this.shootWait = game.delayTime(this.ammo.interval);//Interval between shots
            }
        }
    }
}

//Player
export class Player extends Unit {
    type = 'friend';
    screen = base.playerScreen;
    ammo = ammo['Aicorn'];
    height = 120;
    h = this.height * base.sp;
    width = 100;
    w = this.width * base.sp;
    x = base.sw / 2;
    y = base.sh - (this.h / 2 + 100 * base.sp);
    hp = 100;
    speed = 20 * base.sp;
    inv; //invulnerability timer
    hurt(dmg) {
        let clock = new Date();
        let time = clock.getTime();
        if (this.inv == null) {
            this.inv = clock.getTime() + 500//Time in ms of invulnerability;
            this.hp -= dmg;
            ui.updateHp(this.hp);
        }
        else if (this.inv != null && time > this.inv) {
            this.inv = null;
        }
        else {
            //What to do if invulnerable
        }

        if (this.hp <= 0) {
            player.die();
        }
    }
    die() {
        console.log('Game Over');
    }
}

//Enemies
class Enemy extends Unit {
    boxColor = '#a52929';
    type = 'enemy';
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    screen = base.enemyScreen;
    die(i) {
        enemies.splice(i, 1);
    }
    hurt(dmg) {
        this.hp -= dmg;
    }
}

export class MosquitoBot extends Enemy {
    id = 1;
    height = 120;
    h = this.height * base.sp;
    width = 80;
    w = this.width * base.sp;
    speed = 8;
    dmg = 20;
    hp = 100;
}

//Bullets 
class Bullet extends Entity {
    type;
    screen = base.bulletScreen;
    boxColor = '#ffe14f';
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
    interval;//interval of bullets generated per time unit
    die(i) {
        if (this.type = 'friendly') {
            friendlyAttacks.splice(i, 1);
        }
        else if (this.type = 'enemy') {
            enemyAttacks.splice(i, 1);
        }
    }
}
export class Aicorn extends Bullet {
    h = 35 * base.sp;
    w = 20 * base.sp;
    dmg = 15;
    speed = 10;
    interval = 200; //interval between shots in ms
}


// List of enemy types
export var enemyTypes = [
    undefined,//0
    MosquitoBot//1

];

//Spawning enemies
export function spawnEnemy(id, place) {
    let pos = screen.gridPos(place);
    let enemy = new enemyTypes[id](pos[0], pos[1]);
    enemies.push(enemy);
}

//Drawing all entities
export function drawEntities() {
    //Draw enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }

    //Draw friendly bullets
    for (let i = 0; i < friendlyAttacks.length; i++) {
        friendlyAttacks[i].draw(); // Drawing the bullets
        friendlyAttacks[i].y -= friendlyAttacks[i].speed; //Moving the bullets
        if (friendlyAttacks[i].y < 0) { friendlyAttacks.splice(i, 1); } //Removing bullets when they get off screen
    }
}

//Update entities on screen resize
export function updateEntities() {
    if (player != undefined) {
        player.h = player.height * base.sp;
        player.w = player.width * base.sp;
    }
    if (enemies != undefined) {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].h = enemies[i].height * base.sp;
            enemies[i].w = enemies[i].width * base.sp;
        }
    }
}