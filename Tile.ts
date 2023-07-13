enum STATUS {
   AVAILABLE = "AVAILABLE",
   BLACK = "BLACK",
   WHITE = "WHITE",
}

export default class Tile {
   id: number;
   status: STATUS;
   element: HTMLDivElement;

   constructor(id: number) {
      this.id = id;
      this.status = STATUS.AVAILABLE;
      this.element = document.createElement("div");
      this.element.classList.add("tile");
      this.element.classList.add(this.status.toLowerCase());
   }

   isAvailable() {
      return this.status === STATUS.AVAILABLE;
   }

   setAvailable() {
      this.element.classList.remove(this.status.toLowerCase());
      this.status = STATUS.AVAILABLE;
      this.element.classList.add(this.status.toLowerCase());
   }

   setBlack() {
      if (this.isAvailable()) {
         this.status = STATUS.BLACK;
         this.element.classList.add(this.status.toLowerCase());
      }
   }

   setWhite() {
      if (this.isAvailable()) {
         this.status = STATUS.WHITE;
         this.element.classList.add(this.status.toLowerCase());
      }
   }
}
