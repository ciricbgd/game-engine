import { player } from './entities';
import *  as debug from './debug';

export var hpBar: any;
var gameScreen: any;
var pauseScreen: any;

export function init(hpBarParam, gameScreenParam, pauseScreenParam) {
    hpBar = hpBarParam;
    gameScreen = gameScreenParam;
    pauseScreen = pauseScreenParam;
}

export function updateHp(hp) {
    hpBar.style.width = hp + '%';
    console.log(hp);
}


//Hiding mouse cursor
export function updateUi(gameStatus) {
    // if (gameStatus == 'unpaused') {
    //     gameScreen.style.cursor = 'none';
    //     pauseScreen.style.display = 'none';
    // }
    // else if (gameStatus == 'paused') {
    //     gameScreen.style.cursor = 'auto';
    //     pauseScreen.style.display = 'inherit';
    // }
}

export var titleDisplayed;
let titleDisplayProgress = -60;
let Title, SubTitle, TitleGroup;
export function displayTitle(title, subtitle) {
    if (!debug.skipIntro) {
        if (titleDisplayProgress == -60) {
            TitleGroup = <HTMLElement>document.querySelector("#titlegroup")
            Title = <HTMLElement>document.querySelector("#titlegroup > #leveltitle");
            SubTitle = <HTMLElement>document.querySelector("#titlegroup > #levelsubtitle");
            Title.innerHTML = title;
            SubTitle.innerHTML = subtitle;
        }
        else if (titleDisplayProgress >= 380) {
            titleDisplayed = true;
            player.shootAllowed = true;
        }
        else {
            TitleGroup.style.marginTop = titleDisplayProgress / 3 + 'vmin';
        }
        titleDisplayProgress++;
    }
    else {
        titleDisplayed = true;
        player.shootAllowed = true;
    }
}