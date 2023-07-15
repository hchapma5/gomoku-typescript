export default class Button {
   button: HTMLButtonElement;
   private onClick: () => void;

   constructor(text: string, onClick: () => void) {
      this.onClick = onClick;
      this.button = document.createElement("button");
      this.button.classList.add("button");
      this.button.textContent = text;
      this.button.addEventListener("click", this.onClick);
   }
}
