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
      this.renderGame();
      this.player = PLAYER.BLACK; /* BLACK goes first */

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
      } else if (this.player === PLAYER.WHITE) {
         this.player = PLAYER.BLACK;
      }
   }

   resetGame() {
      this.board.resetBoard();
   }

   changeBoardSize(value: number) {
      this.board.changeBoardSize(value);
   }

   renderGame() {
      this.game?.append(
         this.board.element,
         this.inputSlider.slider,
         this.resetButton.button
      );
   }
}
