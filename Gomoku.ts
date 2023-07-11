import Board from "./Board";
import ResetButton from "./ResetButton";

type Game = {
    rowNumber: number;
    tileNumberPerRow: number;
    occupiedTiles?: number[];
}

export default class Gomoku {
    board: Board;
    resetButton: ResetButton;

    constructor({ rowNumber, tileNumberPerRow, occupiedTiles }: Game) {
        this.board = new Board(rowNumber, tileNumberPerRow, occupiedTiles);
        this.resetButton = new ResetButton(() => this.resetGame());
    }

    resetGame() {
        this.board.resetBoard();
    }

}