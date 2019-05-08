import { Bullet } from './bullet';
import {sound} from '../../sound';

export class Explosion extends Bullet {
    dieonhit = false;
    constructor(x?, y?) {
        super();
        this.x = x;
        this.y = y;
        this.boxColor = '#df42f4';
        this.dieonhit = false;
        this.setlifetime(2000);

        this.setWidthHeightMultiplier(50, 50, 6);
        this.sprite.src = "../../assets/sprites/ammo/explosion/1.png";
        this.animation.framesPerRow = 22;
        this.animation.states.idle = { "startFrame": 0, "endFrame": 23, "startRow": 1, "endRow": 1, "fps": 16, }

        this.sound.spawn = new sound(`../../assets/sound/fx/Explosions/MP3/Explosion 8 - Sound effects Pack 2.mp3`);
        this.sound.spawn.volume(0.5);
        this.sound.spawn.play();
    }
    onhit() {
        this.dmg = 0;
    }
    dmg = 75;
    speed = 0 * this.sp;
    interval = 0; //interval between shots in ms
}