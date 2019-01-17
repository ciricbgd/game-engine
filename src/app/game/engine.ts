import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';

@Component({
    selector: 'Game',
})

@Injectable()
export class Game {
    constructor(private http: HttpClient) { }
    changeLevel(lvl) {
        this.http.get(`C:/UrosCiric/Razno/zavrsni/src/app/game/levels/${lvl}.json`)
            .subscribe(response => { console.log(response) });
        console.log(level);
    }
}



// let htpp;
// export function changeLevel(lvl) {

//     http.get(`C:/UrosCiric/Razno/zavrsni/src/app/game/levels/${lvl}.json`)
//         .subscribe(response => { console.log(response) });
//     console.log(level);
// }

var clock = new Date();
export var time = clock.getTime();
export var level;

export function updateTime() {
    let clock = new Date();
    time = clock.getTime();
}

export function delayTime(timeMs) {
    return (time + timeMs);
}

export var status = 'unpaused';

export function togglePause(pauseButton) {
    status = pauseButton;
}


export function checkGameStatus() {
    if (status == 'paused') {
        //The game is paused

    }
}