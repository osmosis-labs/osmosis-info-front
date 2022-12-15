import LightElement from "./light-element"

export default class Light extends LightElement {
    constructor({ x = 0, y = 0, size = 10, color = "#4dd0e1", maxLighting = 20 }) {
        super({ x, y, color, size, maxLighting })
    }

    update(ctx, mousePos, canvas) {
        super.update(ctx, mousePos, canvas)
        this.draw(ctx, canvas)
    }

    draw(ctx, canvas) {
        super.draw(ctx, canvas)
    }
}