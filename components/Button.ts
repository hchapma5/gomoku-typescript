export default class Button {
    element: HTMLButtonElement;
    private onClick: () => void;

    constructor(text: string, onClick: () => void) {
        this.onClick = onClick;
        this.element = document.createElement("button");
        this.element.classList.add("button");
        this.element.textContent = text;
        this.element.addEventListener("click", this.onClick);
    }
}
