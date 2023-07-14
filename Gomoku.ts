import Board from "./Board";
import ResetButton from "./ResetButton";
import InputSlider from "./InputSlider";

enum PLAYER {
   BLACK = "BLACK",
   WHITE = "WHITE",
}

const DEFAULT_SIZE: number = 15;
const MIN_BOARD_SIZE: number = 5;
const MAX_BOARD_SIZE: number = 19;

export default class Gomoku {
   board: Board;
   resetButton: ResetButton;
   inputSlider: InputSlider;
   game: HTMLElement | null;
   player: PLAYER.BLACK | PLAYER.WHITE;
   textBox: HTMLDivElement;

   constructor() {
      this.board = new Board(DEFAULT_SIZE, DEFAULT_SIZE);
      this.resetButton = new ResetButton(() => this.resetGame());
      this.inputSlider = new InputSlider(
         DEFAULT_SIZE,
         MIN_BOARD_SIZE,
         MAX_BOARD_SIZE,
         (value) => this.changeBoardSize(value)
      );
      this.game = document.getElementById("gomoku");

      this.player = PLAYER.BLACK; /* BLACK goes first */

      this.textBox = document.createElement("div");
      this.textBox.classList.add("text-box");
      this.textBox.textContent = `${this.player}'s turn`;

      this.renderGame();

      this.board.rows.forEach((row) => {
         row.tiles.forEach((tile) => {
            tile.element.addEventListener("click", () => {
               switch (this.player) {
                  case PLAYER.BLACK: {
                     tile.setBlack();
                     this.swapTurn();
                     break;
                  }
                  case PLAYER.WHITE: {
                     tile.setWhite();
                     this.swapTurn();
                     break;
                  }
               }
            });
         });
      });
   }

   swapTurn() {
      console.log(this.player);
      if (this.player === PLAYER.BLACK) {
         this.player = PLAYER.WHITE;
         this.textBox.textContent = `${this.player}'s turn`;
      } else if (this.player === PLAYER.WHITE) {
         this.player = PLAYER.BLACK;
         this.textBox.textContent = `${this.player}'s turn`;
      }
   }

   resetGame() {
      this.board.resetBoard();
      this.player = PLAYER.BLACK;
   }

   changeBoardSize(value: number) {
      this.board.changeBoardSize(value);
   }

   renderGame() {
      this.game?.append(
         this.board.element,
         this.textBox,
         this.inputSlider.slider,
         this.resetButton.button
      );
   }
}
