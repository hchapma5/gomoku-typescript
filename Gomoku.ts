import Board from "./Board";
import Button from "./Button";
import InputSlider from "./InputSlider";

enum PLAYER {
    BLACK = "BLACK",
    WHITE = "WHITE",
}

enum STATUS {
    PRE_GAME,
    IN_GAME,
    POST_GAME,
}

const DEFAULT_SIZE: number = 5;
const MIN_BOARD_SIZE: number = 5;
const MAX_BOARD_SIZE: number = 19;

export default class Gomoku {
    status: STATUS.PRE_GAME | STATUS.IN_GAME | STATUS.POST_GAME;
    player: PLAYER.BLACK | PLAYER.WHITE;
    board: Board;
    button: Button;
    inputSlider: InputSlider;
    game: HTMLElement | null;
    textBox: HTMLDivElement;

    constructor() {
        this.board = new Board(DEFAULT_SIZE, DEFAULT_SIZE);
        this.button = new Button("Reset game", () => this.resetGame());
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
        this.handleTurn();
    }

    handleTurn() {
        this.board.rows.forEach((row) => {
            row.tiles.forEach((tile) => {
                tile.element.addEventListener("click", () => {
                    if (tile.isAvailable() === false) {
                        return;
                    } else {
                        if (this.player === PLAYER.BLACK) {
                            tile.setBlack();
                        } else {
                            tile.setWhite();
                        }
                        this.evaluateWin(this.player);
                        this.checkDraw();
                        this.swapTurn();
                    }
                });
            });
        });
    }

    swapTurn() {
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
        this.textBox.textContent = `${this.player}'s turn`;
    }

    changeBoardSize(value: number) {
        this.board.changeBoardSize(value);
    }

    renderGame() {
        this.game?.append(
            this.board.element,
            this.textBox,
            this.inputSlider.slider,
            this.button.button
        );
    }

    evaluateWin(player: PLAYER) {
        if (this.checkWin(player) === true) {
            console.log(`${player} wins!`);
            this.textBox.textContent = `${player} wins!`;
        }
    }

    checkDraw() {
        for (let i = 0; i < this.board.rows.length; i++) {
            for (let j = 0; j < this.board.rows[i].tiles.length; j++) {
                if (this.board.rows[i].tiles[j].isAvailable()) {
                    return false; // If any tile is available, it's not a draw
                }
            }
        }
        console.log("It's a draw!");
        return true; // All tiles are occupied, it's a draw
    }

    checkWin(player: PLAYER) {
        if (this.checkHorizontalWin(player) === true) {
            return true;
        }

        if (this.checkVerticalWin(player) === true) {
            return true;
        }

        if (this.checkDiagonalWin(player) === true) {
            return true;
        }

        return false;
    }

    checkHorizontalWin(player: PLAYER) {
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
    }

    checkVerticalWin(player: PLAYER) {
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
    }

    checkDiagonalWin(player: PLAYER) {
        const rowCount = this.board.rows.length;
        const colCount = this.board.rows[0].tiles.length;
        const targetCount = 5; // Number of consecutive tiles required to win

        // Check diagonal win (top-left to bottom-right)
        for (let i = 0; i <= rowCount - targetCount; i++) {
            for (let j = 0; j <= colCount - targetCount; j++) {
                let count = 0;
                for (let k = 0; k < targetCount; k++) {
                    if (
                        this.board.rows[i + k].tiles[j + k].status.valueOf() ===
                        player
                    ) {
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
                    if (
                        this.board.rows[i + k].tiles[j - k].status.valueOf() ===
                        player
                    ) {
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
