import Board from "./Board";

type Game = {
    rowNumber: number;
    tileNumberPerRow: number;
    occupiedTiles?: number[];
}

export default class Gomoku {
    board: Board;

    constructor({ rowNumber, tileNumberPerRow, occupiedTiles }: Game) {
        this.board = new Board(rowNumber, tileNumberPerRow, occupiedTiles);
    }
}
