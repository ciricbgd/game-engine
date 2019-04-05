import { sp } from '../screen';

export class Entity {
    id;
    name; //Name of an entity
    status;//Current status of an enemie - idle - dying - spawning
    x; //X coordinate of where the entity is drawn
    y; //Y coordinate of where the entity is drawn
    w; //Entity hitbox width
    width;
    h; //Entity hitbox height
    height;
    speed; //Speed of an entity
    sp;// Screen point for scaling
    boxColor = "#AAAAAA"; //Hitbox color - used mostly for testing purposes
    screen; //Canvas ("layer") where entity is drawn
    accel = 100; //Acceleration of an entity 0-100
    hp; //Health points
    multiplier; // multiplier fo image scaling
    sprite = new Image();
    sound = {
        "death": { play() { console.log(`Death sound missing`) } }
    }

    constructor() {
        this.sp = sp;
    }

    setWidthHeightMultiplier(SpriteWidth, SpriteHeight, Multiplier) {

        this.multiplier = Multiplier;

        this.width = SpriteWidth * Multiplier; this.w = SpriteWidth * Multiplier * this.sp;
        this.height = SpriteHeight * Multiplier; this.h = SpriteHeight * Multiplier * this.sp;

        this.animation.w = SpriteWidth;
        this.animation.h = SpriteHeight;
    }

    // Changes screen point on resize
    changeSp(sp) {
        this.sp = sp;
        this.w = this.width * this.sp;
        this.h = this.height * this.sp;
    }

    draw() {
        this.screen.fillStyle = this.boxColor;
        if (this.sprite.src != '') {
            this.screen.drawImage(this.sprite, this.animation.x, this.animation.y, this.animation.w, this.animation.h, this.x - this.w / 2, this.y - this.h / 2, this.width * this.sp, this.height * this.sp);
        }
        else { this.screen.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.width * this.sp, this.height * this.sp); }
    }
    hurt(dmg) {
        this.hp -= dmg;
    }
    changestatus(status) {
        this.status = status;
    }
    animation = {
        "row": 0,
        "frame": 0,
        "framesPerRow": 4,
        "frameRowPos": 0,
        "frameCount": 0,
        "x": 0,
        "y": 0,
        "w": 32,
        "h": 32,
        "state": "idle",
        "states": {
            "idle": {}, "death": {}, "prefire": {}, "postfire": {}
        }
    }
    animate() {
        if (this.animation.frameCount > 60 / this.animation.states[this.animation.state].fps) {
            let startFrameRowPos = this.animation.states[this.animation.state].startFrame - (this.animation.states[this.animation.state].startRow * this.animation.framesPerRow - this.animation.framesPerRow) - 1;
            this.animation.frame++;
            if (this.animation.frameRowPos >= this.animation.framesPerRow - 1) {
                if (this.animation.row >= this.animation.states[this.animation.state].endRow - 1) {
                    this.animation.row = this.animation.states[this.animation.state].startRow - 1;
                }
                else {
                    this.animation.row++;
                }
                if (this.animation.row > this.animation.states[this.animation.state].startRow - 1) {
                    this.animation.frameRowPos = 0;

                }
                else {
                    this.animation.frameRowPos = startFrameRowPos;
                }

            }
            else {
                this.animation.frameRowPos++;
            }
            if (this.animation.frame >= this.animation.states[this.animation.state].endFrame) {
                this.animation.row = this.animation.states[this.animation.state].startRow - 1;
                this.animation.frameRowPos = startFrameRowPos;
                this.animation.frame = this.animation.states[this.animation.state].startFrame - 1;
            }
            this.animation.frameCount = 0;
        }
        else this.animation.frameCount++;
        this.animation.x = this.animation.frameRowPos * this.animation.w;
        this.animation.y = this.animation.row * this.animation.h;
    }
    state(state) {
        this.animation.state = state;
        this.animation.frame = this.animation.states[this.animation.state].startFrame - 1;
        this.animation.row = this.animation.states[this.animation.state].startRow - 1;
        this.animation.frameRowPos = this.animation.states[this.animation.state].startFrame - (this.animation.states[this.animation.state].startRow * this.animation.framesPerRow - this.animation.framesPerRow) - 1;
    }
}