import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  pos = {
    x: 0,
    y: 0
  };

  dir = {
    x: 0,
    y: 0
  };

  next = {
    x: 0,
    y: 0
  };

  constructor() { }

  startInput(): void {
    window.addEventListener('keydown', this._listenKeyDown.bind(this));
  }

  stopInput(): void {
    window.removeEventListener('keydown', this._listenKeyDown.bind(this));
  }

  init(width: number, height: number): any {
    // tslint:disable: no-bitwise
    this.pos.x = ~~(width / 2);
    this.pos.y = ~~(height / 2);
    // tslint:enable: no-bitwise
  }

  _listenKeyDown(e): void {
    switch (e.code) {
      case 'ArrowUp':
        this.next.y = -1;
        break;
      case 'ArrowDown':
        this.next.y = 1;
        break;
      case 'ArrowLeft':
        this.next.x = -1;
        break;
      case 'ArrowRight':
        this.next.x = 1;
        break;

    }
  }

  nextPosition(): { x: number, y: number } {
    return {
      x: this.pos.x + this.next.x,
      y: this.pos.y + this.next.y
    };
  }

  die(): any {
    throw new Error("die not implemented.");
  }

  move(): void {
    this.pos.x += this.pos.x;
    this.pos.y += this.pos.y;
}

}
