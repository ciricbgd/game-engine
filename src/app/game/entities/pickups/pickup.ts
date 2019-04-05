import { Entity } from '../entity';
import { playerScreen } from '../../screen';
import { pickups } from './pickupCollection';
import { player } from '../../entities';

export class Pickup extends Entity {
    balloon;
    constructor() {
        super();
        this.screen = playerScreen;

        console.log();
    }
    spawnBalloon() {
        this.balloon = new Balloon(this.x, this.y, this.animation.h, this.animation.w, this.multiplier * 1.6);
    }
    die(i) {
        pickups.splice(i, 1);
    }
    activate(i) {
        this.onPickup(player);
        this.die(i);
    }

    onPickup(player) {
        console.log(`This pickup does nothing ¯\\_(ツ)_/¯`);
    }
}

export class Balloon extends Entity {
    constructor(x, y, w, h, m) {
        super();
        this.x = x; this.y = y;
        this.screen = playerScreen;

        this.setWidthHeightMultiplier(w, h, m);

        this.sprite.src = "../../assets/sprites/pickups/balloon.png";

        this.animation.framesPerRow = 1;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 1, "startRow": 1, "endRow": 1, "fps": 1, }
        this.state('idle');
    }
}