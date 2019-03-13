import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  game: GameService;

  constructor(game: GameService) {
    this.game = game;
  }

  ngAfterViewInit(): void {
    this.game.start(
      document.getElementById('game-board') as HTMLCanvasElement
    );
  }

}



