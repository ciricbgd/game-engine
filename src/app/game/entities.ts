import * as game from '../game/engine';
import * as screen from '../game/screen';
import * as ui from '../game/ui';
// class Base {
//     playerScreen;
//     enemyScreen;
//     bulletScreen;
//     sp;//Screen point - used to scale entities
//     sw;
//     sh;
// }
export var player;


//export var base = new Base(); // Making "base". Alternative to "this" outside of function scope
// Entities - player, enemies, bosses
export var enemies = [];//Array of existing enemies
export var ammo = [];//Array of existing bullets
export var enemyAttacks = [];//Array of enemy bullets and other attacks
export var friendlyAttacks = [];//Array of friendly bullets and special attacks

export function init() {
    player = new Player();
}

//--------------------- ENTITIES ---------------------------------------------------------------ENTITIES-----------------------------------/



class Entity {
    id;
    name; //Name of an entity
    status;//Current status of an enemie - idle - dying - spawning
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
    sprite = new Image();
    draw() {
        this.screen.fillStyle = this.boxColor;
        //this.screen.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        this.screen.drawImage(this.sprite, this.animation.x, this.animation.y, this.animation.w, this.animation.h, this.x, this.y, this.w, this.h);
    }
    hurt(dmg) {
        this.hp -= dmg;
    }
    changestatus(status) {
        this.status = status;
    }
    animation = {
        "row": 0,
        "frame": 0,
        "framesPerRow": 4,
        "frameRowPos": 0,
        "frameCount": 0,
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32,
        "state": "idle",
        "states": {
            "idle": { "startFrame": 1, "endFrame": 16, "startRow": 0, "endRow": 4, "fps": 12 },
            "death": {}
        }
    }
    animate() {
        if (this.animation.frameCount > this.animation.states[this.animation.state].fps) {
            console.log(this.animation.frameRowPos);
            this.animation.frame++;
            if (this.animation.frameRowPos >= this.animation.framesPerRow - 1) {
                if (this.animation.row >= this.animation.states[this.animation.state].endRow - 1) {
                    this.animation.row = this.animation.states[this.animation.state].startRow - 1;
                }
                else {
                    this.animation.row++;
                }
                if (this.animation.row == this.animation.states[this.animation.state].startRow - 1) {
                    this.animation.frameRowPos = 1;
                }
                else {
                    this.animation.frameRowPos = 0;
                }

            }
            else {
                this.animation.frameRowPos++;
            }
            if (this.animation.frame >= this.animation.states[this.animation.state].endFrame) {
                this.animation.row = this.animation.states[this.animation.state].startRow - 1;

                //this.animation.frameRowPos = this.animation.states[this.animation.state].startFrame - 1;
                this.animation.frameRowPos = 1;

                this.animation.frame = this.animation.states[this.animation.state].startFrame - 1;

            }
            this.animation.frameCount = 0;
        }
        else this.animation.frameCount++;
        this.animation.x = this.animation.frameRowPos * this.animation.w;
        this.animation.y = this.animation.row * this.animation.h;
    }
}

//!--------------------- ENTITIES ---------------------------------------------------------------ENTITIES-----------------------------------/


//--------------------- UNIT ---------------------------------------------------------------UNIT-----------------------------------/


//Unit
class Unit extends Entity {
    type;
    ammo = undefined;
    bulletInstance = undefined;
    shootWait = undefined;
    shootAllowed = false;
    changeAmmo(ammoId) {
        this.ammo = ammoId;
        this.bulletInstance = new bulletType[ammoId];
    }
}

//!--------------------- UNIT ---------------------------------------------------------------UNIT-----------------------------------/


//--------------------- PLAYER ---------------------------------------------------------------PLAYER-----------------------------------/


//Player
export class Player extends Unit {
    inv; //invulnerability timer
    constructor() {
        super();
        this.type = 'friend';
        this.screen = screen.playerScreen;
        this.height = 120;
        this.h = this.height * screen.sp;
        this.width = 100;
        this.w = this.width * screen.sp;
        this.x = screen.sw / 2;
        this.y = screen.sh - (this.h / 2 + 100 * screen.sp);
        this.hp = 100;
        this.speed = 20 * screen.sp;
        this.draw();
        this.changeAmmo(1);
        this.shootAllowed = true;
    }
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
    shoot() {
        if (this.shootAllowed) {
            if (this.shootWait == null || this.shootWait == undefined || game.time >= this.shootWait) {
                if (this.ammo != null || this.ammo != undefined) {
                    let x = this.x;
                    let y = this.y - this.h / 2 - this.bulletInstance.h / 2;
                    let attack = new bulletType[this.ammo](x, y);
                    friendlyAttacks.push(attack);
                    this.shootWait = game.delayTime(attack.interval);//Interval between shots
                }
            }
        }
    }
    die() {
        console.log('Game Over');
    }
}

//!--------------------- PLAYER ---------------------------------------------------------------PLAYER-----------------------------------/


//--------------------- ENEMIES ---------------------------------------------------------------ENEMIES-----------------------------------/

//Enemies

class Enemy extends Unit {
    dmg = 0;
    speed = 0;
    spawnpath = {
        "progress": {
            "start": 0,
            "finish": undefined
        },
        "places": undefined,
        "speed": undefined,
        "moveX": undefined,
        "moveY": undefined
    }
    constructor(x?: number, y?: number) {
        super();
        this.type = 'enemy';
        this.boxColor = '#a52929';
        this.screen = screen.enemyScreen;
        this.x = x;
        this.y = y;
        this.status = "spawning";
        this.spawnpath.speed = screen.sp * 110;
    }
    die(i) {
        enemies.splice(i, 1);
    }
    hurt(dmg) {
        this.hp -= dmg;
    }
    shoot() {
        if (this.shootAllowed) {
            if (this.shootWait == null || this.shootWait == undefined || game.time >= this.shootWait) {
                if (this.ammo != null || this.ammo != undefined) {
                    let x = this.x;
                    let y = this.y + this.h / 2 + this.bulletInstance.h / 2;
                    let attack = new bulletType[this.ammo](x, y);
                    enemyAttacks.push(attack);
                    this.shootWait = game.delayTime(attack.interval);//Interval between shots
                }
            }
        }
    }
    followSpawnPath() {
        let pointB = { x: undefined, y: undefined, location: screen.gridPos(this.spawnpath.places[this.spawnpath.progress.start]) };
        pointB.x = pointB.location[0];
        pointB.y = pointB.location[1];

        let difference = { x: Math.abs(pointB.x - this.x), y: Math.abs(pointB.y - this.y) }

        if (this.spawnpath.moveX == undefined) { this.spawnpath.moveX = difference.x / this.spawnpath.speed }
        if (this.spawnpath.moveY == undefined) { this.spawnpath.moveY = difference.y / this.spawnpath.speed }

        if (difference.x <= this.speed && difference.y <= this.speed) {
            this.spawnpath.progress.start++;
            if (this.spawnpath.progress.start == this.spawnpath.progress.finish) { this.status = "idle"; }
        }
        else {
            if (difference.x >= this.speed && this.x < pointB.x) { this.x += this.spawnpath.moveX }
            else if (difference.x >= this.speed && this.x > pointB.x) { this.x -= this.spawnpath.moveY }
            if (difference.y >= this.speed && this.y < pointB.y) { this.y += this.spawnpath.moveY }
            else if (difference.y >= this.speed && this.y > pointB.y) { this.y -= this.spawnpath.moveY }

        }
    }

}

export class MosquitoBot extends Enemy {
    constructor(x, y) {
        super();
        this.id = 1;
        this.height = 120;
        this.h = this.height * screen.sp;
        this.width = 80;
        this.w = this.width * screen.sp;
        this.speed = 5;
        this.dmg = 20;
        this.hp = 100;
        this.x = x;
        this.y = y;
        this.changeAmmo(1);

        this.sprite.src = "../../assets/sprites/test/girl.png";
        this.animation.framesPerRow = 4;
        this.animation.w = 125;
        this.animation.h = 125;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 16, "startRow": 1, "endRow": 4, "fps": 24, }
    }
}

export class Fatty extends Enemy {
    constructor(x, y) {
        super();
        this.id = 2;
        this.height = 200;
        this.h = this.height * screen.sp;
        this.width = 200;
        this.w = this.width * screen.sp;
        this.speed = 2;
        this.dmg = 40;
        this.hp = 2400;
        this.x = x;
        this.y = y;
        this.changeAmmo(1);

        this.sprite.src = "../../assets/sprites/enemies/fatty/character.png";
        this.animation.framesPerRow = 2;
        this.animation.w = 480;
        this.animation.h = 480;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 5, "startRow": 1, "endRow": 3, "fps": 12, }
        this.animation.states.death = { "startFrame": 6, "endFrame": 10, "startRow": 3, "endRow": 5, "fps": 24, }
        this.animation.state = "death";
        this.animation.frame = this.animation.states[this.animation.state].startFrame - 1;
        this.animation.row = this.animation.states[this.animation.state].startRow - 1;
        this.animation.frameRowPos = 1;
    }
}

// List of enemy types
export var enemyType = [
    undefined,//0
    MosquitoBot,//1
    Fatty,//2
];
//!--------------------- ENEMIES ---------------------------------------------------------------ENEMIES-----------------------------------/

//--------------------- BULLETS ---------------------------------------------------------------BULLETS-----------------------------------/

//Bullets 
class Bullet extends Entity {
    type;
    screen = screen.bulletScreen;
    boxColor = '#ffe14f';
    constructor(x?: number, y?: number) {
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
    h = 35 * screen.sp;
    w = 20 * screen.sp;
    dmg = 15;
    speed = 10;
    interval = 200; //interval between shots in ms
}

export var bulletType = [
    undefined,//0
    Aicorn//1
];

//!--------------------- BULLETS ---------------------------------------------------------------BULLETS-----------------------------------/



//--------------------- FUNCTIONS ---------------------------------------------------------------FUNCTIONS-----------------------------------/

//Spawning enemies
export function spawnEnemy(id, place) {
    let pos = screen.gridPos(place);
    let startX, startY;
    if (pos.length <= 1) {
        startX = (pos[0][0] < screen.sw / 2) ? (-pos[0][0]) : (screen.sw + pos[0][0]);
        startY = (pos[0][1] < screen.sh / 2) ? (-pos[0][1]) : (screen.sh + pos[0][1]);
    }
    else {
        let A = { x: pos[0][0], y: pos[0][1], quadrant: undefined }, B = { x: pos[1][0], y: pos[1][1], quadrant: undefined }, C = { x: undefined, y: undefined }

        //Quad1
        if (A.x > screen.sw / 2 && A.y < screen.sh / 2) {
            let paramX = A.x, paramY = screen.sh - A.y;
            if (paramY >= paramX) { C.y = -A.y; A.x >= B.x ? C.x = A.x + (A.x - B.x) : C.x = A.x - (B.x - A.x) }
            else { C.x = screen.sw + A.x; A.y >= B.y ? C.y = A.y + (A.y - B.y) : C.y = A.y - (B.y - A.y) }
        }
        //Quad2
        else if (A.x < screen.sw / 2 && A.y < screen.sh / 2) {
            if (A.x >= A.y) { C.y = -A.y; A.x >= B.x ? C.x = A.x + (A.x - B.x) : C.x = A.x - (B.x - A.x) }
            else { C.x = -A.x; A.y >= B.y ? C.y = A.y + (A.y - B.y) : C.y = A.y - (B.y - A.y) }
        }
        //Quad3
        else if (A.x < screen.sw / 2 && A.y > screen.sh / 2) {
            let paramX = screen.sw - A.x, paramY = A.y;
            if (paramX >= paramY) { C.x = -A.x; A.y >= B.y ? C.y = A.y + (A.y - B.y) : C.y = A.y - (B.y - A.y) }
            else { C.y = screen.sh + A.y; A.x >= B.x ? C.x = A.x + (A.x - B.x) : C.x = A.x - (B.x - A.x) }
        }
        //Quad4
        else if (A.x > screen.sw / 2 && A.y > screen.sh / 2) {
            if (A.x >= A.y) { C.x = screen.sw + A.x; A.y >= B.y ? C.y = A.y + (A.y - B.y) : C.y = A.y - (B.y - A.y) }
            else { C.y = screen.sh + A.y; A.x >= B.x ? C.x = A.x + (A.x - B.x) : C.x = A.x - (B.x - A.x) }
        }

        startX = C.x; startY = C.y;
    }
    pos.unshift([startX, startY]);
    let enemy = new enemyType[id](pos[0][0], pos[0][1]);
    enemy.spawnpath.progress.finish = place.length;
    enemy.spawnpath.places = place;
    enemy.spawnpath.progress.finish = place.length;
    let a = new Image();
    enemies.push(enemy);
}

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
    }

    //Draw enemy bullets
    enemies.forEach(enemy => {
        enemy.shoot();
    });
    for (let i = 0; i < enemyAttacks.length; i++) {
        enemyAttacks[i].draw(); // Drawing the bullets
        enemyAttacks[i].y += enemyAttacks[i].speed; //Moving the bullets
        if (enemyAttacks[i].y > screen.sw) { enemyAttacks.splice(i, 1); } //Removing bullets when they get off screen
    }
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
    enemies.forEach(enemy => {
        if (enemy.status == "spawning") {
            enemy.followSpawnPath();
        }
    });
}


//!--------------------- FUNCTIONS ---------------------------------------------------------------FUNCTIONS-----------------------------------/
