import { player } from './entities';
import *  as debug from './debug';
import { changeLevel, togglePause } from './engine';
import { skipVideoIntro, skipVideoOutro } from './debug';

export var hpBar: any;
export var energyBar: any;
var gameScreen: any;
var pauseScreen: any;

export function init(hpBarParam, gameScreenParam, pauseScreenParam, videoScreen, theGameElement, energyBarElement) {
    hpBar = hpBarParam;
    gameScreen = gameScreenParam;
    pauseScreen = pauseScreenParam;
    theGame = theGameElement;
    energyBar = energyBarElement;
    initVideo(videoScreen);
}

export function updateStats() {
    hpBar.style.width = player.hp + '%';
    energyBar.style.width = player.energy + '%';
    player.energy += 0.025; // const rate of energy recharge;
}


//Hiding mouse cursor
export function updateUi(gameStatus) {
    if (gameStatus == 'unpaused') {
        //gameScreen.style.cursor = 'none';
        pauseScreen.style.display = 'none';
    }
    else if (gameStatus == 'paused') {
        //gameScreen.style.cursor = 'auto';
        pauseScreen.style.display = 'inherit';
    }
}

export var titleDisplayed;
export var titleDisplayProgress = -60;
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

export function resetTitle() {
    titleDisplayed = false;
    titleDisplayProgress = -60;
}


// Intro video
export var video;
export var theGame;

function initVideo(videoElement) {
    video = videoElement;

    video.onended = function () {
        //After the video ends
        video.muted = true;
        video.style.display = "none";
        theGame.style.display = "block";
        togglePause("unpaused");
        changeLevel(1);
    }


    //Play the video
    if (skipVideoIntro) {
        video.style.display = "none";
        togglePause("unpaused");
        changeLevel(1);
        theGame.style.display = "block";
    }
    else {
        video.style.display = "block";
        video.play();
    }
}


// Outro video
export var outroVideoExecuted = false;

export function playOutro() {
    video.src = '../../assets/outro.mp4';
    theGame.style.display = "none";
    video.style.display = "block";

    video.onended = function () {
        //After the video ends
        alert('You did it 💩');
        location.reload();
    }

    if (skipVideoOutro) {
        //Debug skipping video outro
        alert('You did it 💩');
        location.reload();
    }
    else {
        video.play();
        outroVideoExecuted = true;
    }
}