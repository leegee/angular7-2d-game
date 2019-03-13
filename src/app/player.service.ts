import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  position = {
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
    this.position.x = ~~(width / 2);
    this.position.y = ~~(height / 2);
    // tslint:enable: no-bitwise
  }

  _listenKeyDown(e): void {
    switch (e.code) {
      case 'ArrowUp':
        this.dir.y = -1;
        break;
      case 'ArrowDown':
        this.dir.y = 1;
        break;
      case 'ArrowLeft':
        this.dir.x = -1;
        break;
      case 'ArrowRight':
        this.dir.x = 1;
        break;

    }
  }

  nextPosition(): { x: number, y: number } {
    this.next = {
      x: this.position.x + this.dir.x,
      y: this.position.y + this.dir.y
    };
    this.dir = { x: 0, y: 0 }; // XXX
    return this.next;
  }

  die(): any {
    console.log(this.position, this.next, this.dir);
    throw new Error("die not implemented.");
  }

  move(): void {
    this.position = this.next;
  }

}
