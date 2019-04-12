import { Enemy } from './enemy';

export class FatGuy extends Enemy {
    constructor(x, y) {
        super(); this.x = x; this.y = y;

        this.setWidthHeightMultiplier(117, 156, 2);

        this.speed = 15;
        this.dmg = 20;
        this.hp = 200;
        this.sprite.src = "../../assets/sprites/enemies/fatGuy/character.png";
        this.animation.framesPerRow = 1;
        let colorSwatch = (Math.round(Math.random() * (3 - 1) + 1));
        this.animation.states.idle = { "startFrame": colorSwatch, "endFrame": colorSwatch, "startRow": colorSwatch, "endRow": colorSwatch, "fps": 1, }
        this.state('idle');
        this.changeAmmo(2);
    }
}
