import { Enemy } from './enemy';

export class Pirana extends Enemy {
    constructor(x, y) {
        super(); this.x = x; this.y = y;

        this.setWidthHeightMultiplier(27, 42, 2);

        this.speed = 15;
        this.dmg = 20;
        this.hp = 200;
        this.sprite.src = "../../assets/sprites/enemies/pirana/pirana.png";
        this.animation.framesPerRow = 4;
        //let colorSwatch = (Math.round(Math.random() * (3 - 1) + 1));
        this.animation.states.idle = { "startFrame": 1, "endFrame": 4, "startRow": 1, "endRow": 1, "fps": 16, }
        this.state('idle');
        this.changeAmmo(2);

        this.shoot = function () {
            this.y += 1;
        }
    }
}
