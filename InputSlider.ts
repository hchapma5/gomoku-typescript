export default class InputSlider {
    slider: HTMLInputElement;
    private onChange: (value: number) => void;

    constructor(value: number, min: number, max: number, onChange: (value: number) => void) {
        this.onChange = onChange;
        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.classList.add('slider');
        this.slider.min = String(min);
        this.slider.max = String(max);
        this.slider.value = String(value);

        this.slider.addEventListener('input', () => {
            const value = Number(this.slider.value);
            this.onChange(value);
        });
    }
}