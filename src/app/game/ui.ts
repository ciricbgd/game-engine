import { player } from './entities';
import *  as debug from './debug';
import { changeLevel, togglePause } from './engine';
import { skipVideoIntro, skipVideoOutro } from './debug';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
import { disablePause } from './controls';


export var hpBar: any;
export var energyBar: any;
var gameScreen: any;
var pauseScreen: any;
export var videoSrc: any;
export var videoStage = 1;
declare let $: any;

export function init(hpBarParam, gameScreenParam, pauseScreenParam, videoScreen, theGameElement, energyBarElement) {
    hpBar = hpBarParam;
    gameScreen = gameScreenParam;
    pauseScreen = pauseScreenParam;
    theGame = theGameElement;
    energyBar = energyBarElement;
    videoSrc = <HTMLElement>document.querySelector("#videoScreen > source");
    gameWon = <HTMLElement>document.querySelector("#gameWon");
    gameLost = <HTMLElement>document.querySelector("#gameLost");
    gamePaused = <HTMLElement>document.querySelector("#gamePaused");
    initVideo(videoScreen);

    cryAgain = <HTMLElement>document.querySelector("#cryAgain");

    $.ajax({
        url: `https://api.giphy.com/v1/gifs/random?api_key=IH5OMHObs41e3oPajWu2hWD258XrAylr&tag=cry&rating=PG-13`,
        type: 'GET',
        error: function () { },
        success: function (gif) {
            cryAgain.href = gif.data.images.original.url;

            console.log(cryAgain.href);
        }
    });

}

export function updateStats() {
    hpBar.style.width = player.hp + '%';
    energyBar.style.width = player.energy + '%';
    player.energy += 0.025; // const rate of energy recharge;
}


//Hiding mouse cursor
export function updateUi(gameStatus) {
    if (gameStatus == 'unpaused') {
        gameScreen.style.cursor = 'none';
        pauseScreen.style.display = 'none';
    }
    else if (gameStatus == 'paused') {
        gameScreen.style.cursor = 'auto';
        pauseScreen.style.display = 'inherit';
    }
}

export var titleDisplayed;
export var titleDisplayProgress = -60;
let Title, SubTitle, TitleGroup;
export function displayTitle(title, subtitle) {
    if (!debug.skipIntro) {
        if (titleDisplayProgress == -60) {
            TitleGroup = <HTMLElement>document.querySelector("#titlegroup");
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
    video.muted = true;

    video.onended = function () {
        //After the video ends
        playNextVideo();
    }

    document.addEventListener("click", function () { skipClicked = true; playNextVideo() });

    let playNextVideo = function playNextVideo() {

        if (videoStage == 3) {


            if (skipClicked) {
                videoStage++;
                video.muted = true;
                video.style.display = "none";
                theGame.style.display = "block";
                togglePause("unpaused");

                introEnded();

                changeLevel(1);
            }

        }
        else if (videoStage < 3) {
            skipClicked = false;
            videoStage++;
            video.pause();
            videoSrc.setAttribute('src', `../../assets/Intro-${videoStage}.mp4`);
            if (videoStage == 3) { video.loop = true }
            video.load();
            video.play();
        }
    }

    let skipClicked = false;
    function introEnded() {
        document.removeEventListener("click", function () { skipClicked = true; playNextVideo() });
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

export function playOutro(msg?) {
    video.src = '../../assets/outro.mp4';
    theGame.style.display = "none";
    video.style.display = "block";

    video.onended = function () {
        //After the video ends
        gameOutcome.won();
    }

    if (skipVideoOutro) {
        //Debug skipping video outro
        gameOutcome.won();
    }
    else {
        video.play();
        outroVideoExecuted = true;
    }
}


var cryAgain = undefined;
var gameLost, gameWon, gamePaused;

export var gameOutcome = {
    won() {
        disablePause();
        togglePause('paused');
        gamePaused.style.display = "none";
        gameWon.style.display = "block";
    },
    lost() {
        disablePause();
        togglePause('paused');
        gamePaused.style.display = "none";
        gameLost.style.display = "block";
    }
}