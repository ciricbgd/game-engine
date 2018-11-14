class Entity {
    name; //Name of an entity
    x; //X coordinate of where the entity is drawn
    y; //Y coordinate of where the entity is drawn
    w; //Entity hitbox width
    h; //Entity hitbox height
    sp; //Screen point - used in combination of W and H to scale entity
    speed; //Speed of an entity
    boxColor = "#AAAAAA"; //Hitbox color - used mostly for testing purposes
    screen; //Canvas ("layer") where entity is drawn
    accel = 100; //Acceleration of an entity 0-100
    hp; //Health points
    constructor(name, x, y, sp, screen) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.sp = sp;
        this.screen = screen;
    }
    draw = function () {
        this.screen.fillStyle = this.boxColor;
        this.screen.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
    hurt = function (dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
            this.die();
        }
    }
    die = function () {
    }
}

//Player
export class Player extends Entity {
    h = 120 * this.sp;
    w = 100 * this.sp;
    hp = 100;
    speed = 18;
    inv; //invulnerability timer
    hurt = function (dmg) {
        let clock = new Date();
        let time = clock.getTime();
        if (this.inv == null) {
            this.inv = clock.getTime() + 500;
            this.hp -= dmg;
        }
        else if (this.inv != null && time > this.inv) {
            this.inv = null;
        }
        else {
            //What to do if invulnerable
        }

        if (this.hp <= 0) {
            this.die();
        }
    }
}

//Enemies
export class Enemy extends Entity {
    h = 100 * this.sp;
    w = 50 * this.sp;
    speed = 8;
    dmg = 20;
}