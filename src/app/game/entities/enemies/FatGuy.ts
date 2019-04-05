import { Enemy } from './enemy';


export class FatGuy extends Enemy {
    constructor(x, y) {
        super(); this.x = x; this.y = y;

        this.setWidthHeightMultiplier(34, 31, 3);

        this.speed = 15;
        this.dmg = 20;
        this.hp = 200;

        this.sprite.src = "../../assets/sprites/enemies/fly/character.png";
        this.animation.framesPerRow = 1;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 2, "startRow": 1, "endRow": 2, "fps": 16, }
        this.animation.states.prefire = { "startFrame": 1, "endFrame": 2, "startRow": 1, "endRow": 2, "fps": 16, }
        this.animation.states.postfire = { "startFrame": 1, "endFrame": 2, "startRow": 1, "endRow": 2, "fps": 16, }
        this.state('prefire');

        this.changeAmmo(2);
    }
}