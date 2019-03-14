import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  player: PlayerService;
  board: BoardService;
  animationFrameId!: number;

  constructor(
    player: PlayerService,
    board: BoardService
  ) {
    this.player = player;
    this.board = board;
  }

  start(
    canvas: HTMLCanvasElement
  ) {
    this.board.init(canvas);
    this.player.init(this.board.cellsDimWidth, this.board.cellsDimHeight);
    window.requestAnimationFrame(this.step.bind(this));
  }

  step() {
    this.collisionDetection();
    this.player.tick();
    this.render();

    this.animationFrameId = window.requestAnimationFrame(
      this.step.bind(this)
    );
  }

  collisionDetection() {
    const playerNextPos = this.player.nextPosition();
    const playerGridX = Math.floor(playerNextPos.x / this.board.cellOnScreenWidth);
    const playerGridY = Math.floor(playerNextPos.y / this.board.cellOnScreenHeight);

    if (playerGridX < 0 || playerGridY < 0 ||
      playerGridX > this.board.cellsDimWidth || playerGridY > this.board.cellsDimHeight
    ) {
      this.die();
    }
  }

  render() {
    this.board.render(
      this.player
    );
  }

  die() {
    console.log('dead', this.player);
    this.player.die();
    window.cancelAnimationFrame(this.animationFrameId);
    // alert('d e d');
    // document.location.reload();
  }
}
