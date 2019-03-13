import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  cells!: number[][];
  cellsWidth!: number;
  cellsHeight!: number;
  onScreen: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  } = {
      canvas: null,
      ctx: null
    };
  offScreen: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  } = {
      canvas: null,
      ctx: null
    };

  init(
    canvas: HTMLCanvasElement,
    width = 10,
    height = 10
  ) {
    this.cellsWidth = width;
    this.cellsHeight = height;
    this.onScreen.canvas = canvas;
    this.onScreen.canvas.width = this.cellsWidth;
    this.onScreen.canvas.height = this.cellsHeight;
    this.onScreen.ctx = canvas.getContext('2d', { alpha: false });

    // Use OffscreenCanvas when available
    this.offScreen.canvas = document.createElement('canvas');
    this.offScreen.canvas.width = this.cellsWidth;
    this.offScreen.canvas.height = this.cellsHeight;
    this.offScreen.ctx = this.offScreen.canvas.getContext('2d', { alpha: false });

    this.cells = Array(width).fill(
      Array(height).fill(0)
    );

    this.scaleOnscreenCanvas();
  }

  scaleOnscreenCanvas(): void {
    const scaleX = window.innerWidth / this.cellsWidth;
    const scaleY = window.innerHeight / this.cellsHeight;

    const scaleToFit = Math.max(scaleX, scaleY);

    this.onScreen.canvas.style.transformOrigin = '0 0';
    this.onScreen.canvas.style.transform = 'scale(' + scaleToFit + ')';
  }

  render(player: PlayerService): void {
    this.offScreen.ctx.fillStyle = 'black';
    this.offScreen.ctx.fillRect(
      0, 0, this.offScreen.canvas.width, this.offScreen.canvas.height
    );

    this.offScreen.ctx.fillStyle = 'red';
    this.offScreen.ctx.fillRect(
      player.position.x,
      player.position.y,
      1, 1
    );

    console.log(player.position);

    this.onScreen.ctx.drawImage(this.offScreen.canvas, 0, 0);
  }

}
