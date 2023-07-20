import Board from '../components/Board';
import Button from '../components/Button';
import InputSlider from '../components/InputSlider';
import TextBox from '../components/TextBox';

enum PLAYER {
  BLACK = 'BLACK',
  WHITE = 'WHITE',
}

enum STATUS {
  PRE_GAME,
  IN_GAME,
  POST_GAME,
}

const DEFAULT_SIZE: number = 15;
const MIN_BOARD_SIZE: number = 5;
const MAX_BOARD_SIZE: number = 19;

export default class Gomoku {
  private status: STATUS;
  private player: PLAYER;
  private board: Board;
  private buttonStart: Button;
  private buttonReset: Button;
  private textBox: TextBox;
  private inputSlider: InputSlider;
  private game: HTMLElement | null;

  constructor() {
    this.game = document.getElementById('gomoku');
    this.board = new Board(DEFAULT_SIZE);
    this.textBox = new TextBox();
    this.buttonStart = new Button('Start game', () => this.startGame());
    this.buttonReset = new Button('Reset game', () => this.resetGame());
    this.inputSlider = new InputSlider(
      DEFAULT_SIZE,
      MIN_BOARD_SIZE,
      MAX_BOARD_SIZE,
      (value) =>
        this.status === STATUS.PRE_GAME
          ? this.board.changeBoardSize(value)
          : null
    );
    this.renderGame();
    this.resetGame(); // Initiate PRE_GAME settings
  }

  private startGame(): void {
    this.status = STATUS.IN_GAME;
    this.player = PLAYER.BLACK;
    this.textBox.element.textContent = `${this.player}'s turn`;
    this.buttonStart.disable();
    this.buttonReset.enable();
    this.inputSlider.disable();
    this.handleTurn();
  }

  private resetGame(): void {
    this.status = STATUS.PRE_GAME;
    this.player = PLAYER.BLACK;
    this.board.resetBoard();
    this.textBox.element.textContent = 'Select board size and start the game';
    this.buttonReset.disable();
    this.buttonStart.enable();
    this.inputSlider.enable();
  }

  private renderGame(): void {
    if (this.game) {
      this.game.append(
        this.board.element,
        this.textBox.element,
        this.inputSlider.container,
        this.buttonStart.element,
        this.buttonReset.element
      );
    }
  }

  private handleTurn(): void {
    this.board.rows.forEach((row) => {
      row.tiles.forEach((tile) => {
        const clickHandler = () => {
          if (!tile.isAvailable() || this.status !== STATUS.IN_GAME) {
            return;
          } else {
            if (this.player === PLAYER.BLACK) {
              tile.setBlack();
            } else {
              tile.setWhite();
            }
            this.processTurn(this.player);
          }
        };
        tile.element.addEventListener('click', clickHandler);
      });
    });
  }

  private processTurn(player: PLAYER): void {
    if (this.checkWin(player)) {
      this.textBox.element.textContent = `Game over! ${player} wins!`;
      this.status = STATUS.POST_GAME;
    } else if (this.checkDraw()) {
      this.textBox.element.textContent = "Game over! It's a draw!";
      this.status = STATUS.POST_GAME;
    } else {
      this.player = this.player === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK;
      this.textBox.element.textContent = `${this.player}'s turn`;
    }
  }

  private checkDraw(): boolean {
    return this.board.rows.every((row) =>
      row.tiles.every((tile) => !tile.isAvailable())
    );
  }

  private checkWin(player: PLAYER): boolean {
    return (
      this.checkHorizontalWin(player) ||
      this.checkVerticalWin(player) ||
      this.checkDiagonalWin(player)
    );
  }

  checkHorizontalWin(player: PLAYER): boolean {
    for (let i = 0; i < this.board.rows.length; i++) {
      let count = 0;
      for (let j = 0; j < this.board.rows[i].tiles.length; j++) {
        if (this.board.rows[i].tiles[j].status.valueOf() === player) {
          count++;
          if (count === 5) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  checkVerticalWin(player: PLAYER): boolean {
    for (let i = 0; i < this.board.rows.length; i++) {
      let count = 0;
      for (let j = 0; j < this.board.rows[i].tiles.length; j++) {
        if (this.board.rows[j].tiles[i].status.valueOf() === player) {
          count++;
          if (count === 5) return true;
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  checkDiagonalWin(player: PLAYER): boolean {
    const rowCount = this.board.rows.length;
    const colCount = this.board.rows[0].tiles.length;
    const targetCount = 5; // Number of consecutive tiles required to win

    // Check diagonal win (top-left to bottom-right)
    for (let i = 0; i <= rowCount - targetCount; i++) {
      for (let j = 0; j <= colCount - targetCount; j++) {
        let count = 0;
        for (let k = 0; k < targetCount; k++) {
          if (this.board.rows[i + k].tiles[j + k].status.valueOf() === player) {
            count++;
            if (count === targetCount) {
              return true;
            }
          } else {
            count = 0;
          }
        }
      }
    }

    // Check diagonal win (top-right to bottom-left)
    for (let i = 0; i <= rowCount - targetCount; i++) {
      for (let j = colCount - 1; j >= targetCount - 1; j--) {
        let count = 0;
        for (let k = 0; k < targetCount; k++) {
          if (this.board.rows[i + k].tiles[j - k].status.valueOf() === player) {
            count++;
            if (count === targetCount) {
              return true;
            }
          } else {
            count = 0;
          }
        }
      }
    }

    return false;
  }
}
