export class LightHTML {
    constructor({ x, y, size, color }) {
        this.element = document.createElement("span");
        this.element.classList.add("light");
        this.element.style.top = y + "px";
        this.element.style.left = x + "px";
        this.element.style.width = size + "px";
        this.element.style.height = size + "px";
        this.element.style.position = "fixed";
        this.element.style.backgroundColor = color;
    }

    die() {
        this.element.classList.add("lightDie");

    }
}