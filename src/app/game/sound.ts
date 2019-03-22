import { userActive } from './engine';

export function sound(src?) {
    this.sound = document.createElement("audio");
    src == undefined ? this.sound.src = '' : this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.src = function (src) {
        this.sound.src = src;
    }
    this.play = function () {
        if (userActive) { this.sound.play(); }
    }
    this.stop = function () {
        this.sound.pause();
    }
}

//Background music
export var BgMusic = new sound();


