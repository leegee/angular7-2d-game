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

  move = {
    x: 0,
    y: 0
  }

  constructor() { }

  startInput() {
    window.addEventListener('keydown', this._listenKeyDown);
  }

  stopInput() {
    window.removeEventListener('keydown', this._listenKeyDown);
  }

  _listenKeyDown(e) {
    switch (e.code) {
      case 'ArrowUp':
        this.move.y = -1;
        break;
      case 'ArrowDown':
        this.move.y = 1;
        break;
      case 'ArrowLeft':
        this.move.x = -1;
        break;
      case 'ArrowRight':
        this.move.x = 1;
        break;

    }
  }

}
