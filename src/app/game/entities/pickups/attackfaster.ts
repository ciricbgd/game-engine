import { Pickup } from './pickup';

export class AttackFaster extends Pickup {
    constructor(x, y) {
        super(); this.x = x; this.y = y;

        this.setWidthHeightMultiplier(24, 24, 2);

        //this.sprite.src = "../../assets/sprites/pickups/balloon.png";

        this.animation.framesPerRow = 1;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 1, "startRow": 1, "endRow": 1, "fps": 1, }
        this.state('idle');
        this.spawnBalloon();
    }
}