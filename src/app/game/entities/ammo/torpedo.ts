import { Bullet } from './bullet';

export class Explosion extends Bullet {
    constructor(x?, y?) {
        super();
        this.x = x;
        this.y = y;
        this.boxColor = '#f44741';
        this.double = true;
    }
    height = 85;
    width = 25;
    h = this.height * this.sp;
    w = this.width * this.sp;
    dmg = 50;
    speed = 15 * this.sp;
    interval = 0; //interval between shots in ms
}