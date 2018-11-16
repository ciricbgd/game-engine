class Base {
    playerScreen;
    enemyScreen;
    bulletScreen;
    sp;//Screen point - used to scale entities
    sw;
    sh;
}
let base = new Base(); // Making "base". Alternative to "this" outside of function scope

export function initEntities(playerScreen,enemyScreen,sp,sw,sh){
    base.playerScreen = playerScreen;
    base.enemyScreen = enemyScreen;
    //base.bulletScreen = bulletScreen; add later
    base.sp=sp;
    base.sw=sw;
    base.sh=sh;
}
class Entity {
    name; //Name of an entity
    x; //X coordinate of where the entity is drawn
    y; //Y coordinate of where the entity is drawn
    w; //Entity hitbox width
    h; //Entity hitbox height
    speed; //Speed of an entity
    boxColor = "#AAAAAA"; //Hitbox color - used mostly for testing purposes
    screen; //Canvas ("layer") where entity is drawn
    accel = 100; //Acceleration of an entity 0-100
    hp; //Health points
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
class Unit extends Entity{
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
export class Player extends Unit {
    screen=base.playerScreen;
    ammo="Aicorn";
    h = 120 * base.sp;
    w = 100 * base.sp;
    x=base.sw/2;
    y=base.sh-(this.h/2+100*base.sp);
    hp = 100;
    speed = 18;
    inv; //invulnerability timer
    fire = function(){

    }
}

//Enemies
class Enemy extends Unit {
    screen=base.enemyScreen;
    h = 100 * base.sp;
    w = 50 * base.sp;
    speed = 8;
    dmg = 20;
}
export class MosquitoBot extends Enemy{

}

//Bullets 
class Bullet extends Entity{
    interval;//interval of bullets generated per time unit
}
class FriendlyBullet extends Bullet{
}
class EnemyBullet extends Bullet{
}
export class Aicorn extends FriendlyBullet{
    dmg=15;
    speed=30;
    interval=30;
}