import Tile from "./Tile";

export default class Row {
    id: number;
    tiles: Tile[];
    element: HTMLDivElement;

    constructor(id: number, tileNumber: number) {
        this.id = id;
        this.tiles = Array.from({ length: tileNumber }).map((_, index) => {
            const tileId = tileNumber * id + index;
            return new Tile(tileId);
        });
        this.element = document.createElement("div");
        this.element.classList.add("row");
        this.element.append(...this.tiles.map((tile) => tile.element));
    }
}
