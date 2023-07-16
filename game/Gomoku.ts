import Board from "../components/Board";
import Button from "../components/Button";
import InputSlider from "../components/InputSlider";
import TextBox from "../components/TextBox";

enum PLAYER {
    BLACK = "BLACK",
    WHITE = "WHITE",
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
    status: STATUS;
    player: PLAYER;
    board: Board;
    button: Button;
    inputSlider: InputSlider;
    textBox: TextBox;
    game: HTMLElement | null;

    constructor() {
        this.board = new Board(DEFAULT_SIZE);
        this.button = new Button("Start game", () => this.startGame());
        this.textBox = new TextBox();
        this.inputSlider = new InputSlider(
            DEFAULT_SIZE,
            MIN_BOARD_SIZE,
            MAX_BOARD_SIZE,
            (value) => this.changeBoardSize(value)
        );
        this.game = document.getElementById("gomoku");
        this.resetGame();
        this.renderGame();
    }

    startGame(): void {
        this.status = STATUS.IN_GAME;
        this.player = PLAYER.BLACK;
        this.textBox.element.textContent = `${this.player}'s turn`;
        const button = new Button("Reset game", () => this.resetGame()).element;
        this.button.element.parentNode?.replaceChild(
            button,
            this.button.element
        );
        this.button.element = button;
        this.handleTurn();
    }

    resetGame(): void {
        this.status = STATUS.PRE_GAME;
        const newBoard: Board = new Board(DEFAULT_SIZE);
        this.board.element.parentNode?.replaceChild(
            newBoard.element,
            this.board.element
        );
        this.board = newBoard;
        this.textBox.element.textContent = "Select board size and start game";
        const button = new Button("Start game", () => this.startGame()).element;
        this.button.element.parentNode?.replaceChild(
            button,
            this.button.element
        );
        this.button.element = button;
    }

    renderGame(): void {
        this.game?.append(
            this.board.element,
            this.textBox.element,
            this.inputSlider.element,
            this.button.element
        );
    }

    changeBoardSize(value: number): void {
        if (this.status === STATUS.PRE_GAME) this.board.changeBoardSize(value);
    }

    handleTurn(): void {
        this.board.rows.forEach((row) => {
            row.tiles.forEach((tile) => {
                const clickHandler = () => {
                    if (
                        tile.isAvailable() === false ||
                        this.status === STATUS.POST_GAME
                    ) {
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

                tile.element.addEventListener("click", clickHandler);

                // Remove the click event listener when the game is over
                if (this.status === STATUS.POST_GAME) {
                    tile.element.removeEventListener("click", clickHandler);
                }
            });
        });
    }

    processTurn(player: PLAYER): void {
        if (this.checkWin(player) === true) {
            this.textBox.element.textContent = `Game over, ${player} wins!`;
            this.status = STATUS.POST_GAME;
        } else if (this.checkDraw() === true) {
            this.textBox.element.textContent = "Game over, It's a draw!";
            this.status = STATUS.POST_GAME;
        } else {
            this.player =
                this.player === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK;
            this.textBox.element.textContent = `${this.player}'s turn`;
        }
    }

    checkDraw(): boolean {
        for (let i = 0; i < this.board.rows.length; i++) {
            for (let j = 0; j < this.board.rows[i].tiles.length; j++) {
                if (this.board.rows[i].tiles[j].isAvailable()) {
                    return false; // If any tile is available, it's not a draw
                }
            }
        }
        return true; // All tiles are occupied, it's a draw
    }

    checkWin(player: PLAYER): boolean {
        if (this.checkHorizontalWin(player) === true) return true;

        if (this.checkVerticalWin(player) === true) return true;

        if (this.checkDiagonalWin(player) === true) return true;

        return false;
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
