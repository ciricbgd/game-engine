import { Component, OnInit } from '@angular/core';
import * as  entities from '../game/entities';
import * as controls from '../game/controls';
import * as collision from '../game/collision';
import * as game from '../game/engine';
import * as screen from '../game/screen';
import * as ui from '../game/ui';

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
      document.querySelector("#background"),
      document.querySelector("#left-side"),
      document.querySelector("#right-side")
    );
    ui.init(
      document.getElementById('statHp'),
      document.getElementById("game-screen"),
      document.getElementById("pauseScreen")
    );
    entities.init();
    controls;



    game.changeLevel(1);

    function frameChange()//Detects changes on every frame 
    {
      game.checkGameStatus();
      //Hide mouse cursor
      ui.updateUi(game.status);

      if (game.status != 'paused') {

        //Update game time
        game.updateTime();

        //Screen clearing
        screen.clearScreen();

        //Draw and move player
        controls.changeMovement();

        //Draw entities
        entities.drawEntities();

        //Move enemies
        entities.moveEnemies();

        //Collision detection
        collision.collisionDetection();

        //Game sequencing in order (waves, items, spawning etc...)
        game.playLevel(game.currentLevel);

      }


      requestAnimationFrame(frameChange);//Calling the function itself
    }
    frameChange();



  }
}
