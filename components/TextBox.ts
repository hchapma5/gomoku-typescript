export default class TextBox {
    element: HTMLDivElement;

    constructor() {
        this.element = document.createElement("div");
        this.element.classList.add("text-box");
    }
}
