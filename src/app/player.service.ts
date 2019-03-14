import { Injectable, ɵConsole } from '@angular/core';

const KEEP_MOVING = false;
const ONE_DIRECTION = true;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  position = { x: 0, y: 0 };
  nextDir = { x: 0, y: 0 };
  dir = { x: 0, y: 0 };
  nextPos = { x: 0, y: 0 };
  cellOnScreenWidth: number;
  cellOnScreenHeight: number;

  constructor() { }

  startInput(): void {
    window.addEventListener('keydown', this._listenKeyDown.bind(this));
  }

  stopInput(): void {
    window.removeEventListener('keydown', this._listenKeyDown.bind(this));
  }

  die(): void {
    this.stopInput();
    this.init(this.cellOnScreenWidth, this.cellOnScreenHeight);
  }

  init(width: number, height: number): void {
    this.nextPos = { x: 0, y: 0 };
    this.dir = { x: 0, y: 0 };
    this.nextDir = { x: 0, y: 0 };
    this.cellOnScreenWidth = width;
    this.cellOnScreenHeight = height;
    this.position.x = Math.floor((this.cellOnScreenWidth * width) / 2);
    this.position.y = Math.floor((this.cellOnScreenHeight * height) / 2);
    console.log(this);
    this.startInput();
  }

  _listenKeyDown(e: KeyboardEvent): void {
    switch (e.code) {
      case 'ArrowUp':
        this.nextDir.y = -1;
        if (ONE_DIRECTION) {
          this.nextDir.x = 0;
        }
        break;
      case 'ArrowDown':
        this.nextDir.y = 1;
        if (ONE_DIRECTION) {
          this.nextDir.x = 0;
        }
        break;
      case 'ArrowLeft':
        this.nextDir.x = -1;
        if (ONE_DIRECTION) {
          this.nextDir.y = 0;
        }
        break;
      case 'ArrowRight':
        this.nextDir.x = 1;
        if (ONE_DIRECTION) {
          this.nextDir.y = 0;
        }
        break;
    }
  }

  tick() {
    this.dir = this.nextDir;
    this.position = this.nextPos;
  }

  nextPosition(): { x: number, y: number } {
    this.nextPos = {
      x: this.position.x + this.dir.x,
      y: this.position.y + this.dir.y
    };
    if (!KEEP_MOVING) {
      this.dir = { x: 0, y: 0 };
    }
    return this.nextPos;
  }

}
