import { Pickup } from './pickup';

export class Heal extends Pickup {
    constructor(x, y) {
        super(); this.x = x; this.y = y;

        this.setWidthHeightMultiplier(24, 24, 2);

        this.sprite.src = "../../assets/sprites/pickups/heart.png";

        this.animation.framesPerRow = 1;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 1, "startRow": 1, "endRow": 1, "fps": 1, }
        this.state('idle');
        this.spawnBalloon();
    }
}

export class Heal1 extends Heal {
    onPickup(player) {
        player.heal(10);
    }
}
export class Heal2 extends Heal {
    onPickup(player) {
        player.heal(20);
    }
}
export class Heal3 extends Heal {
    onPickup(player) {
        player.heal(30);
    }
}
export class Heal4 extends Heal {
    onPickup(player) {
        player.heal(40);
    }
}
export class Heal5 extends Heal {
    onPickup(player) {
        player.heal(50);
    }
}