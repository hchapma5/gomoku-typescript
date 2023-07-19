import Row from './Row';

// pass click handler through the board class
// iterate through each row and tile and apply the click handler

export default class Board {
  rows: Row[];
  selectedTiles: number[] = [];
  element: HTMLDivElement;

  constructor(boardSize: number) {
    this.rows = Array.from({ length: boardSize }).map((_, index) => {
      return new Row(index, boardSize);
    });
    this.element = document.createElement('div');
    this.element.classList.add('board');
    this.element.append(...this.rows.map((row) => row.element));
  }

  resetBoard() {
    this.rows.forEach((row) =>
      row.tiles.forEach((tile) => tile.setAvailable())
    );
  }

  changeBoardSize(value: number) {
    this.rows = Array.from({ length: value }).map((_, index) => {
      return new Row(index, value);
    });
    this.element.replaceChildren(...this.rows.map((row) => row.element));
  }
}
