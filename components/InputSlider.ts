export default class InputSlider {
    element: HTMLInputElement;
    private onChange: (value: number) => void;

    constructor(
        value: number,
        min: number,
        max: number,
        onChange: (value: number) => void
    ) {
        this.onChange = onChange;
        this.element = document.createElement("input");
        this.element.type = "range";
        this.element.classList.add("slider");
        this.element.min = String(min);
        this.element.max = String(max);
        this.element.value = String(value);

        this.element.addEventListener("input", () => {
            const value = Number(this.element.value);
            this.onChange(value);
        });
    }
}
