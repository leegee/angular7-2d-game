import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';

const CELLS_DIM_WIDTH = 32;
const CELLS_DIM_HEIGHT = 32;

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  cells!: number[][];
  cellsDimWidth!: number;
  cellsDimHeight!: number;
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
  cellOnScreenWidth: number;
  cellOnScreenHeight: number;
  cellOnScreenWidthHalf: number;
  cellOnScreenHeightHalf: number;

  init(
    canvas: HTMLCanvasElement
  ) {
    this.cellsDimWidth = CELLS_DIM_WIDTH;
    this.cellsDimHeight = CELLS_DIM_HEIGHT;

    this.cells = Array(this.cellsDimWidth).fill(
      Array(this.cellsDimHeight).fill(0)
    );

    this.cellOnScreenWidth = Math.floor(window.innerWidth / this.cellsDimWidth);
    this.cellOnScreenHeight = Math.floor(window.innerHeight / this.cellsDimHeight);
    this.cellOnScreenWidthHalf = this.cellOnScreenWidth / 2;
    this.cellOnScreenHeightHalf = this.cellOnScreenHeight / 2;

    this.onScreen.canvas = canvas;
    this.onScreen.canvas.width = window.innerWidth;
    this.onScreen.canvas.height = window.innerHeight;
    this.onScreen.ctx = canvas.getContext('2d', { alpha: false });

    // Use OffscreenCanvas when available
    this.offScreen.canvas = document.createElement('canvas');
    this.offScreen.canvas.width = this.onScreen.canvas.width;
    this.offScreen.canvas.height = this.onScreen.canvas.height;
    this.offScreen.ctx = this.offScreen.canvas.getContext('2d', { alpha: false });

    // this.scaleOnscreenCanvas();
  }

  scaleOnscreenCanvas(): void {
    const scaleX = window.innerWidth / this.cellsDimWidth;
    const scaleY = window.innerHeight / this.cellsDimHeight;

    const scaleToFit = Math.min(scaleX, scaleY);

    this.onScreen.canvas.style.transformOrigin = '0 0';
    this.onScreen.canvas.style.transform = 'scale(' + scaleToFit + ')';
  }

  render(player: PlayerService): void {
    this.offScreen.ctx.fillStyle = 'black';
    this.offScreen.ctx.fillRect(
      0, 0, this.offScreen.canvas.width, this.offScreen.canvas.height
    );

    this.offScreen.ctx.fillStyle = 'white';
    this.offScreen.ctx.fillRect(
      Math.floor(player.position.x - this.cellOnScreenWidthHalf),
      Math.floor(player.position.y - this.cellOnScreenHeightHalf),
      this.cellOnScreenWidth,
      this.cellOnScreenHeight
    );

    this.onScreen.ctx.drawImage(this.offScreen.canvas, 0, 0);
  }

}
