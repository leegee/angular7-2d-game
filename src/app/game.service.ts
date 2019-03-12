import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  canvas!: HTMLCanvasElement;
  player: PlayerService;
  board: BoardService;

  constructor(
    player: PlayerService,
    board: BoardService
  ) {
    this.player = player;
    this.board = board;
  }

  start(
    canvas: HTMLCanvasElement,
  ) {
    this.canvas = canvas;
    this.player.startInput();
    window.requestAnimationFrame(this.step);
  }

  step(timestamp: number = null) {
    // this.userInput();
    // update directions
    // collision detection
    // window.requestAnimationFrame(this.step);
  }

  userInput() {

  }
}
