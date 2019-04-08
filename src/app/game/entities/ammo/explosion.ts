import { Bullet } from './bullet';

export class Explosion extends Bullet {
    dieonhit= false;
    constructor(x?, y?) {
        super();
        this.x = x;
        this.y = y;
        this.boxColor = '#df42f4';
        this.double = true; 
        this.dieonhit= false;
        this.setlifetime(1200);
        console.log('booom');
    }
    onhit(){
        this.dmg=0;
    }
    height = 500;
    width = 500;
    h = this.height * this.sp;
    w = this.width * this.sp;
    dmg = 60;
    speed = 0 * this.sp;
    interval = 0; //interval between shots in ms
}