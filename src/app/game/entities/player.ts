import { Unit } from './unit';
import { playerScreen, sw, sh } from '../screen';
import { time, delayTime } from '../engine';
import { bulletType, friendlyAttacks } from './ammo/ammoCollection';
import { gameOutcome } from '../ui';

export class Player extends Unit {
    inv; //invulnerability timer
    energy = 100; // energy for shooting special atacks
    constructor() {
        super();
        this.type = 'friend';
        this.screen = playerScreen;

        this.x = sw / 2;
        this.y = sh - (this.h / 2 + 100 * this.sp);
        this.hp = 100;
        this.speed = 20 * this.sp;
        this.draw();
        this.changeAmmo(1);
        this.changeSpecialAmmo(3);
        this.shootAllowed = false;

        this.setWidthHeightMultiplier(90, 118, 1.2);

        this.sprite.src = "../../assets/sprites/player/boat.png";
        this.animation.framesPerRow = 1;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 1, "startRow": 1, "endRow": 1, "fps": 1, }
    }
    hurt(dmg) {
        let clock = new Date();
        let time = clock.getTime();
        if (this.inv == null) {
            this.inv = clock.getTime() + 1000//Time in ms of invulnerability;
            this.hp -= dmg;
            //this.screen.filter = "invert(50%)";
        }
        else if (this.inv != null && time > this.inv) {
            //this.screen.filter = "invert(100%)";
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
                let x = this.x + this.w * 0.7;
                let y = this.y - this.h / 2 - this.bulletInstance.h / 2;
                let attack = new bulletType[this.specialammo](x, y);
                attack.type = "friendly";
                friendlyAttacks.push(attack);
                x = this.x - this.w * 0.7;
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
        gameOutcome.lost();
    }
}