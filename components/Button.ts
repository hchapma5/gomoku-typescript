export default class Button {
  element: HTMLButtonElement;
  private onClick: () => void;

  constructor(text: string, onClick: () => void) {
    this.onClick = onClick;
    this.element = document.createElement('button');
    this.element.classList.add('button');
    this.element.textContent = text;
    this.element.addEventListener('click', this.onClick);
  }

  disable() {
    this.element.removeEventListener('click', this.onClick);
    this.element.disabled = true;
    this.element.setAttribute('hidden', 'hidden');
  }

  enable() {
    this.element.removeEventListener('click', this.onClick);
    this.element.disabled = false;
    this.element.removeAttribute('hidden');
  }
}
