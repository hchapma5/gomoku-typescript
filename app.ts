import Gomoku from "./Gomoku";

const game = new Gomoku({rowNumber: 15, tileNumberPerRow: 15});

document.getElementById('gomoku')?.appendChild(game.board.element);
document.getElementById('gomoku')?.appendChild(game.resetButton.button);
