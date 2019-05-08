import { Bullet } from './bullet';
import { Explosion } from './explosion';
import {sound} from '../../sound';

export class Torpedo extends Bullet {
    constructor(x?, y?) {
        super();
        this.x = x;
        this.y = y;
        this.boxColor = '#f44741';
        this.double = true;
        this.onhit = () => {
            var explosion = new Explosion(this.x, this.y);
            explosion.type = 'friendly';
            this.spawn(explosion);
        }

        this.setWidthHeightMultiplier(24, 100, 0.8);
        this.sprite.src = "../../assets/sprites/ammo/torpedo/grey.png";
        this.animation.framesPerRow = 1;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 1, "startRow": 1, "endRow": 1, "fps": 1, }
    
        this.sound.spawn = new sound(`../../assets/sound/dan sound effects MP3/beep_030.mp3`);
        this.sound.spawn.volume(0.01);
        this.sound.spawn.play();
    
    }


    dmg = 25;
    speed = 11 * this.sp;
    cost = 25;//cost in energy
    interval = 0; //interval between shots in ms
}