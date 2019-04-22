import { Enemy } from './enemy';


export class ScooterGirl extends Enemy {
    constructor(x, y) {
        super();
        this.id = 3;
        this.height = 62;
        this.h = this.height * this.sp;
        this.width = 68;
        this.w = this.width * this.sp;
        this.speed = 25;
        this.dmg = 10;
        this.hp = 85;
        this.x = x;
        this.y = y;

        this.sprite.src = "../../assets/sprites/enemies/fly/character.png";
        this.animation.framesPerRow = 1;
        this.animation.w = 34;
        this.animation.h = 31;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 2, "startRow": 1, "endRow": 2, "fps": 16, }

        this.changeAmmo(2);
    }
}