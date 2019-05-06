import { Component, OnInit } from '@angular/core';
import * as  entities from '../game/entities';
import * as controls from '../game/controls';
import * as collision from '../game/collision';
import * as game from '../game/engine';
import * as screen from '../game/screen';
import * as ui from '../game/ui';
import * as sound from '../game/sound';

declare let $: any;

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit {

  ngOnInit() {
    //initializing some of game engine logic
    game;
    collision;
    screen;
    ui;
    //Passing values to components
    screen.init(
      document.querySelector("#playerScreen"),
      document.querySelector("#bulletScreen"),
      document.querySelector("#enemyScreen"),
      document.querySelector("#left-side"),
      document.querySelector("#right-side"),
      document.querySelector("#background-0"),
      document.querySelector("#background-1"),
      document.querySelector("#background-2"),
    );
    ui.init(
      document.getElementById('fullheart'),
      document.getElementById("game-screen"),
      document.getElementById("pauseScreen"),
      document.getElementById("videoScreen"),
      document.getElementById("theGame"),
      document.getElementById("fullenergy")
    );
    

    entities.init();

    //Avatar movement
    document.addEventListener("mousemove", mouseMoveHandler, false); // Listening to mouse movement
    let  mouseX, mouseY;
    function mouseMoveHandler(e) {
         mouseX = e.clientX - screen.playerCanvas.offsetLeft;
         mouseY = e.clientY - screen.playerCanvas.offsetTop;
    }

    controls;
    sound;

    function frameChange()//Detects changes on every frame 
    {
      game.checkGameStatus();
      //Hide mouse cursor
      ui.updateUi(game.status);

      if (game.status != "paused") {

        //Update game time
        game.updateTime();

        //Screen clearing
        screen.clearScreen();

        //Draw and move player
        controls.changeMovement();
        //Move the ghost
        entities.avatar.move(mouseX,mouseY);

        //Draw entities
        entities.drawEntities();

        //Move enemies
        entities.moveEnemies();

        //Move stationary items (move with the speed of background)
        entities.moveStationary();

        //Collision detection
        collision.collisionDetection();

        //Move background
        screen.moveBackground([screen.bg.layer0, screen.bg.layer1]);

        //Game sequencing in order (waves, items, spawning etc...)
        game.playLevel(game.currentLevel);

        //Update player stats like hp and energy
        ui.updateStats();
      }


      requestAnimationFrame(frameChange);//Calling the function itself
    }
    frameChange();



  }
}
