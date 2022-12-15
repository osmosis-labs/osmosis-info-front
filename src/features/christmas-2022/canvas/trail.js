import LightElement from "./light-element"

export default class Trail extends LightElement {
    constructor({ x = 0, y = 0, size = 10, color = "#4dd0e1", maxLighting = 20 }) {
        super({ x, y, color, size, maxLighting })
    }

    init() { }

    update(ctx, mousePos, canvas) {
        super.update(ctx, mousePos, canvas)
        const positionLerped = this.lerp(mousePos)
        this.pos.x = positionLerped.x
        this.pos.y = positionLerped.y
        this.draw(ctx, canvas)
    }

    lerp(targetPosition) {
        const offset = 0.3
        return {
            x: this.pos.x + (targetPosition.x - this.pos.x) * offset,
            y: this.pos.y + (targetPosition.y - this.pos.y) * offset,
        }
    }

    draw(ctx, canvas) {
        super.draw(ctx, canvas)

    }
}