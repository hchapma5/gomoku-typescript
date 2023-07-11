export default class ResetButton {
    button: HTMLButtonElement;
    private onClick: () => void;

    constructor(onClick: () => void) {
        this.onClick = onClick;
        this.button = document.createElement('button');
        this.button.classList.add('reset-button');
        this.button.textContent = 'Reset Game';
        this.button.addEventListener('click', this.onClick);
    }

}