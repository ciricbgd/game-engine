import { Unit } from '../unit';
import { enemyScreen, gridPos } from '../../screen';
import { enemyAttacks, bulletType } from '../ammo/ammoCollection';
import { time, delayTime } from '../../engine';

import { enemies } from './enemyCollection';


export class Enemy extends Unit {
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
        this.screen = enemyScreen;
        this.x = x;
        this.y = y;
        this.status = "spawning";
        this.spawnpath.speed = this.sp * 110;
        this.shootAllowed = true;
        //this.sound.death = new sound("../../assets/sound/fx/wilhelmscream.wav");
    }
    die(i) {
        enemies.splice(i, 1);
        this.sound.death.play();
    }
    shoot() {
        if (this.shootAllowed) {
            if (this.shootWait == null || this.shootWait == undefined || time >= this.shootWait) {
                if (this.ammo != null || this.ammo != undefined) {
                    let x = this.x;
                    let y = this.y + this.h / 2 + this.bulletInstance.h / 2;
                    let attack = new bulletType[this.ammo](x, y);
                    attack.type = 'enemy';
                    enemyAttacks.push(attack);
                    this.shootWait = delayTime(attack.interval);//Interval between shots
                }
            }
        }
    }
    followSpawnPath() {
        let B = { x: undefined, y: undefined, location: gridPos(this.spawnpath.places[this.spawnpath.progress.start]) };
        B.x = B.location[0];
        B.y = B.location[1];

        let difference = { x: Math.abs(B.x - this.x), y: Math.abs(B.y - this.y) }

        let moveSpeed = (this.sp / 5) * this.speed;

        if (this.spawnpath.moveX == undefined) { this.spawnpath.moveX = difference.x / this.spawnpath.speed }
        if (this.spawnpath.moveY == undefined) { this.spawnpath.moveY = difference.y / this.spawnpath.speed }

        if (difference.x <= this.speed && difference.y <= this.speed) {
            this.spawnpath.progress.start++;
            if (this.spawnpath.progress.start == this.spawnpath.progress.finish) { this.status = "idle"; }
        }
        else {
            if (difference.x >= this.speed && this.x < B.x) { this.x += this.spawnpath.moveX * moveSpeed }
            else if (difference.x >= this.speed && this.x > B.x) { this.x -= this.spawnpath.moveY * moveSpeed }
            if (difference.y >= this.speed && this.y < B.y) { this.y += this.spawnpath.moveY * moveSpeed }
            else if (difference.y >= this.speed && this.y > B.y) { this.y -= this.spawnpath.moveY * moveSpeed }

        }
    }

}