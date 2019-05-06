import { Entity } from './entity';
import { playerScreen, sw, sh } from '../screen';

export class Avatar extends Entity {
    constructor(x,y) {
        super();
        this.screen = playerScreen;

        this.x = x==undefined? sw/2 : x;
        this.y = y==undefined? sh/2 : y;
        
        this.setWidthHeightMultiplier(55, 72, 1.2);

        this.sprite.src = "../../assets/sprites/player/avatar.png";
        this.animation.framesPerRow = 4;
        this.animation.states.idle = { "startFrame": 1, "endFrame": 4, "startRow": 1, "endRow": 1, "fps": 7, }
        
    }

    move(x,y){   
            this.x = x;
            this.y = y;  
            this.animate();
            this.draw();
            console.log(this);
    }
}