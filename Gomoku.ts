import Board from "./Board";
import ResetButton from "./ResetButton";
import InputSlider from "./InputSlider";

type Game = {
    rowNumber: number;
    tileNumberPerRow: number;
    occupiedTiles?: number[];
}

export default class Gomoku {
    board: Board;
    resetButton: ResetButton;
    inputSlider: InputSlider;

    constructor({ rowNumber, tileNumberPerRow, occupiedTiles }: Game) {
        this.board = new Board(rowNumber, tileNumberPerRow, occupiedTiles);
        this.resetButton = new ResetButton(() => this.resetGame());
        this.inputSlider = new InputSlider(tileNumberPerRow, 5, 19, (value) => this.changeBoardSize(value));

        const container = document.getElementById('gomoku');
        container?.append(
            this.board.element,
            this.inputSlider.slider,
            this.resetButton.button
        );
    }

    resetGame() {
        this.board.resetBoard();
    }

    changeBoardSize(value: number) {
        this.board.changeBoardSize(value);
    }

}