export default class InputSlider {
  slider: HTMLInputElement;
  label: HTMLLabelElement;
  container: HTMLDivElement;
  private onChange: (value: number) => void;

  constructor(
    value: number,
    min: number,
    max: number,
    onChange: (value: number) => void
  ) {
    this.onChange = onChange;
    this.slider = document.createElement('input');
    this.slider.type = 'range';
    this.slider.classList.add('slider');
    this.slider.min = String(min);
    this.slider.max = String(max);
    this.slider.value = String(value);

    this.label = document.createElement('label');
    this.label.classList.add('slider-label');
    this.label.textContent = String(value);

    this.container = document.createElement('div');
    this.container.classList.add('slider-container');
    this.container.appendChild(this.label);
    this.container.appendChild(this.slider);

    this.slider.addEventListener('input', () => {
      const value = Number(this.slider.value);
      this.label.textContent = String(value);
      this.onChange(value);
    });
  }

  disable(): void {
    this.slider.disabled = true;
    this.container.style.display = 'none';
  }

  enable(): void {
    this.slider.disabled = false;
    this.container.style.display = 'flex';
  }
}
