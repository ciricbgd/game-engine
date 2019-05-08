import { Entity } from '../entity';
import { playerScreen } from '../../screen';
import { pickups } from './pickupCollection';
import { player } from '../../entities';
import {sound} from '../../sound';

export class Pickup extends Entity {
    balloon;
    constructor() {
        super();
        this.screen = playerScreen;
        this.sound.death = new sound(`../../assets/sound/fx/1up/MP3/1up 2 - Sound effects Pack 2.mp3`);
        this.sound.death.volume(0.1);

    

        console.log();
    }
    spawnBalloon() {
        this.balloon = new Balloon(this.x, this.y, this.animation.h, this.animation.w, this.multiplier * 1);
    }
    die(i) {
        pickups.splice(i, 1);
    }
    activate(i) {
        this.onPickup(player);
        this.sound.death.play();
        this.die(i);
    }

    onPickup(player) {
        console.log(`This pickup does nothing ¯\\_(ツ)_/¯`);
    }
}

export class Balloon extends Entity {
    constructor(x, y, w, h, m) {
        super();
        this.x = x - w / 4; this.y = y - h / 4;
        this.screen = playerScreen;

        this.setWidthHeightMultiplier(50, 50, m);

        this.sprite.src = "../../assets/sprites/pickups/bouble.png";

        this.animation.framesPerRow = 1;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 6, "startRow": 1, "endRow": 1, "fps": 10, }
        this.state('idle');
    }
}

export class BalloonBurst extends Balloon {
    constructor(x, y, w, h, m) {
        super(x, y, w, h, m);
        this.animation.framesPerRow = 6;
    }
}