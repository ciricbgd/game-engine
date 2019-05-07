import { Bullet } from './bullet';
import {sound} from '../../sound';

export class LightRound extends Bullet {
    constructor(x?, y?) {
        super();
        this.x = x;
        this.y = y;
        this.boxColor = '#ffe14f';
        this.sound.spawn = new sound("../../assets/sound/fx/wilhelmscream.wav");
        this.sound.spawn.play();
    }
    height = 35;
    width = 20;
    h = this.height * this.sp;
    w = this.width * this.sp;
    dmg = 15;
    speed = 10 * this.sp;
    interval = 100; //interval between shots in ms

}