function sound(src?) {
    this.sound = document.createElement("audio");
    this.sound.src = '';
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.src = function (src) {
        this.sound.src = 'src';
    }
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

// export var BgMusic = new sound();
// BgMusic.play();



import { Component, OnInit } from '@angular/core';

export class Sound implements OnInit {

    ngOnInit() {

        console.log('a');

    }
}
