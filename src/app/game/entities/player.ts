import { Unit } from './unit';
import { playerScreen, sw, sh } from '../screen';
import { time, delayTime } from '../engine';
import { bulletType, friendlyAttacks } from './ammo/ammoCollection';

export class Player extends Unit {
    inv; //invulnerability timer
    energy = 100; // energy for shooting special atacks
    constructor() {
        super();
        this.type = 'friend';
        this.screen = playerScreen;
        this.height = 120;
        this.h = this.height * this.sp;
        this.width = 100;
        this.w = this.width * this.sp;
        this.x = sw / 2;
        this.y = sh - (this.h / 2 + 100 * this.sp);
        this.hp = 100;
        this.speed = 20 * this.sp;
        this.draw();
        this.changeAmmo(1);
        this.changeSpecialAmmo(3);
        this.shootAllowed = false;
    }
    hurt(dmg) {
        let clock = new Date();
        let time = clock.getTime();
        if (this.inv == null) {
            this.inv = clock.getTime() + 1000//Time in ms of invulnerability;
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
    shoot() {
        if (this.shootAllowed) {
            if (this.shootWait == null || this.shootWait == undefined || time >= this.shootWait) {
                if (this.ammo != null || this.ammo != undefined) {
                    let x = this.x;
                    let y = this.y - this.h / 2 - this.bulletInstance.h / 2;
                    let attack = new bulletType[this.ammo](x, y);
                    attack.type = "friendly";
                    friendlyAttacks.push(attack);

                    this.shootWait = delayTime(attack.interval);//Interval between shots
                }
            }
        }
    }
    shootspecial() {
        if (this.shootAllowed && this.energy >= this.specialbulletInstance.cost) {
            if (this.specialbulletInstance.double) {
                let x = this.x + this.w * 0.65;
                let y = this.y - this.h / 2 - this.bulletInstance.h / 2;
                let attack = new bulletType[this.specialammo](x, y);
                attack.type = "friendly";
                friendlyAttacks.push(attack);
                x = this.x - this.w * 0.65;
                attack = new bulletType[this.specialammo](x, y);
                attack.type = "friendly";
                friendlyAttacks.push(attack);
            }
            this.energy -= this.specialbulletInstance.cost;
        }
    }
    heal(hp) {
        this.hp = this.hp + hp >= 100 ? 100 : this.hp + hp;
    }

    die() {
        this.sound.death.play();
        console.log('Game Over');
    }
}