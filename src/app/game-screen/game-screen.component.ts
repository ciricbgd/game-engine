import { Component, OnInit } from '@angular/core';
import { Player, Enemy } from '../game/entities';
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
    let sw = $("#container").width(); // Screen width
    let sh = $("#container").height(); // Screen height
    let sp = sw / 1280; // Size point - according to screen width

    //Draw canvas

    //function to clear canvas
    function clearCanvas(screens) {
      screens.clearRect(0, 0, canvas.width, canvas.height);
    }

    //Player canvas
    let canvas: any = document.querySelector("#gameScreen");
    canvas.width = sw;
    canvas.height = sh;
    let playerCanvas = canvas.getContext("2d");

    //Test canvas
    let testCanvas: any = document.querySelector("#testScreen");
    testCanvas.width = sw;
    testCanvas.height = sh;
    let test = testCanvas.getContext("2d");

    //!Draw canvas

    // Entities - player, enemies, bosses
    const player = new Player('Player', sw / 2, sh / 2, sp, playerCanvas);
    player.draw();

    const enemy1 = new Enemy('Test Enemy', sw / 2, sh / 4, sp, test);
    enemy1.boxColor = 'red';
    enemy1.draw();
    // ! Entities - player, enemies, bosses



    function frameChange()//Detects changes on every frame 
    {
      clearCanvas(playerCanvas);//Mandatory clearing of canvas

      //-------Movement Change
      let newValue = changeMovement(sw, sh, player); player.x = newValue.x; player.y = newValue.y; player.accel = newValue.accel;
      player.draw();
      //---!---Movement Change

      //Collision detection
      console.log(player.hp);
      if (collides(player, enemy1)) { player.hurt(enemy1.dmg); }
      requestAnimationFrame(frameChange);//Calling the function itself
    }
    frameChange();
  }
}
