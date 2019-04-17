import { Enemy } from './enemy';

export class Pirana extends Enemy {
    constructor(x, y) {
        super(); this.x = x; this.y = y;

        this.setWidthHeightMultiplier(27, 42, 2);

        this.speed = 15;
        this.dmg = 20;
        this.hp = 200;

        let colorSwatch = (Math.round(Math.random() * (3 - 1) + 1));
        this.sprite.src = "../../assets/sprites/enemies/pirana/pirana.png";
        this.animation.framesPerRow = 4;
        this.animation.states.idle = { "startFrame": (colorSwatch * 5) - colorSwatch - 3, "endFrame": (colorSwatch * 5) - colorSwatch, "startRow": colorSwatch, "endRow": colorSwatch, "fps": 16, }
        this.state('idle');
        this.changeAmmo(2);

        this.shoot = function () {
            this.y += 1;
        }
    }
}