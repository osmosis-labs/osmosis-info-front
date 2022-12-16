import { newShade } from "../../../helpers/helpers"

export default class LightElement {
    constructor({ x = 0, y = 0, size = 10, color = "#4dd0e1", maxLighting = 20 }) {
        this.pos = { x, y }
        this.size = size
        this.maxLighting = maxLighting
        this.lightingVelocity = 1
        this.lighting = 0
        this.colorIn = color
        this.colorOut = newShade(this.colorIn, 10)
        this.colorBlur = newShade(this.colorIn, 20)
    }

    init() { }

    update(ctx, mousePos, canvas) {
        if (this.lighting > this.maxLighting) {
            this.lightingVelocity = -1
        }
        if (this.lighting === 0) {
            this.lightingVelocity = 1

        }
        this.lighting += this.lightingVelocity
    }

    updateColor(color) {
        this.colorIn = color
        this.colorOut = newShade(this.colorIn, 10)
        this.colorBlur = newShade(this.colorIn, 20)
    }

    draw(ctx, canvas) {
        const gradient = ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.size);
        gradient.addColorStop(0, this.colorIn);
        gradient.addColorStop(1, this.colorOut);

        ctx.beginPath();

        // ctx.fillStyle = gradient;
        ctx.shadowBlur = this.lighting;
        ctx.shadowColor = this.colorBlur;
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x, this.pos.y);

        // ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    }
}