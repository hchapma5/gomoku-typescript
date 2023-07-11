import Row from "./Row";

export default class Board {
    rows: Row[];
    selectedTiles: number[] = [];
    element: HTMLDivElement;

    constructor(
        rowNumber: number,
        tileNumberPerRow: number,
        occupiedTiles: number[] = []
    ) {
        this.rows = Array.from({ length: rowNumber }).map((_, index) => {
            return new Row(index, tileNumberPerRow, occupiedTiles);
        });
        this.element = document.createElement("div");
        this.element.classList.add("board");
        this.element.append(...this.rows.map((row) => row.element));
        this.element.addEventListener("click", () => {
            this.getSelectedTilesId()
        })
    }

    getSelectedTilesId() {
        this.selectedTiles = this.rows.map(row => row.selectedTilesId).flat();
        console.log(`selected tile: ${this.selectedTiles.join(",")}`);
    }

}   