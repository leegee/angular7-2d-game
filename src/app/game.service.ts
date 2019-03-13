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

    this.player.init( this.board.width, this.board.height);
  }

  start(
    canvas: HTMLCanvasElement,
  ) {
    this.board.init(10, 10);
    this.canvas = canvas;
    this.player.startInput();
    window.requestAnimationFrame(this.step.bind(this));
  }

  step(timestamp: number = null) {
    this.collisionDetection();
    // update directions
    // window.requestAnimationFrame(this.step);
  }

  collisionDetection() {
    const next = this.player.nextPosition();
    if (next.x > this.board.width || next.x < 0 || next.y > this.board.height) {
      this.player.die();
    }

    this.player.move();
  }
}
