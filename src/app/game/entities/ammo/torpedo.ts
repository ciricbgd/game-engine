import { Bullet } from './bullet';
import { Explosion } from './explosion';

export class Torpedo extends Bullet {
    constructor(x?, y?) {
        super();
        this.x = x;
        this.y = y;
        this.boxColor = '#f44741';
        this.double = true;
        this.onhit = () =>{ 
            var explosion = new Explosion(this.x,this.y);
            explosion.type = 'friendly';
            this.spawn(explosion);
        }
    }
    height = 85;
    width = 25;
    h = this.height * this.sp;
    w = this.width * this.sp;
    dmg = 15;
    speed = 15 * this.sp;
    interval = 0; //interval between shots in ms
}