import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  cells!: number[][];
  width!: number;
  height!: number;

  constructor(
    width = 10,
    height = 10
  ) {
    this.width = width;
    this.height = height;
    this.cells = Array(width).fill(
      Array(height).fill(0)
    );

  }
}
