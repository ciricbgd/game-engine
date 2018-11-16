import { Component, OnInit } from '@angular/core';
import { Player, Aicorn, MosquitoBot,initEntities } from '../game/entities';
import { changeMovement } from '../game/controls';
import { collides } from '../game/collision';
declare let $: any;

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    //Screen vars
    var sw = $("#container").width(); // Screen width
    let sh = $("#container").height(); // Screen height
    let sp = sw / 1280; // Size point - according to screen width

    //Draw canvas

    //function to clear canvas
    function clearCanvas(screens) {
      screens.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    }

    //Player canvas
    let playerCanvas: any = document.querySelector("#gameScreen");
    playerCanvas.width = sw;
    playerCanvas.height = sh;
    let playerScreen = playerCanvas.getContext("2d");

    //Enemy canvas
    let enemyCanvas: any = document.querySelector("#testScreen");
    enemyCanvas.width = sw;
    enemyCanvas.height = sh;
    let enemyScreen = enemyCanvas.getContext("2d");

    //!Draw canvas

    //-------Initializator - passing values to other components
    initEntities(playerScreen,enemyScreen,sp,sw,sh);
    //---!---Initializator - passing values to other components

    // Entities - player, enemies, bosses
    let enemies = [];//Array of enemies
    let enemyAttacks = [];//Array of enemy bullets and other attacks
    let friendlyAttacks = [];//Array of friendly bullets and special attacks

    const player = new Player();
    player.draw();

    const enemy1 = new MosquitoBot(sw / 2, sh / 4);
    enemy1.boxColor = 'red';
    enemy1.draw();
    // ! Entities - player, enemies, bosses


    function frameChange()//Detects changes on every frame 
    {
      clearCanvas(playerScreen);//Mandatory clearing of canvas

      //-------Movement Change
      let newValue = changeMovement(sw, sh, player); player.x = newValue.x; player.y = newValue.y; player.accel = newValue.accel;
      player.draw();
      //---!---Movement Change

      //Collision detection
      if (collides(player, enemy1)) { player.hurt(enemy1.dmg); }
      requestAnimationFrame(frameChange);//Calling the function itself
    }
    frameChange();
  }
}
