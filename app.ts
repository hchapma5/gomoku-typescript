import Board from "./Board";

const game = new Board(10,10);
document.getElementById('gomoku')?.appendChild(game.element);