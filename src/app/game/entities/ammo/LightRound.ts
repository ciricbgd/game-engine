import { Bullet } from './bullet';

export class LightRound extends Bullet {
    constructor(x?, y?) {
        super();
        this.x = x;
        this.y = y;
    }
    height = 35;
    width = 20;
    h = this.height * this.sp;
    w = this.width * this.sp;
    dmg = 15;
    speed = 10 * this.sp;
    interval = 200; //interval between shots in ms
}