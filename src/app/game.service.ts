import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { BoardService } from './board.service';

const MAX_MS_BETWEEN_MOVES = 1000;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  player: PlayerService;
  board: BoardService;

  constructor(
    player: PlayerService,
    board: BoardService
  ) {
    this.player = player;
    this.board = board;

    this.player.init(this.board.cellsWidth, this.board.cellsHeight);
  }

  start(
    canvas: HTMLCanvasElement,
  ) {
    this.board.init(canvas, 10, 10);
    this.player.startInput();
    window.requestAnimationFrame(this.step.bind(this));
  }

  step() {
    this.collisionDetection();
    this.player.move();
    this.render();

    window.requestAnimationFrame(
      this.step.bind(this)
    );
  }

  collisionDetection() {
    const playerNextPos = this.player.nextPosition();
    console.log('playerNextPos', playerNextPos);
    if (playerNextPos.x > this.board.cellsWidth || playerNextPos.x < 0 ||
      playerNextPos.y > this.board.cellsHeight || playerNextPos.y < 0
    ) {
      this.player.die();
    }
  }

  render() {
    this.board.render(
      this.player
    );
  }
}
