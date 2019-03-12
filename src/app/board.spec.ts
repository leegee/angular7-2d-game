import { BoardService } from './board.service';

describe('Board', () => {
  it('should create an instance', () => {
    expect(new BoardService()).toBeTruthy();
  });
});
