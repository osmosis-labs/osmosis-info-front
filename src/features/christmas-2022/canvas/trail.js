import { random } from "../../../helpers/helpers";
import LightElement from "./light-element"

export default class Trail extends LightElement {
    constructor({ x = 0, y = 0, size = 10, color = "#4dd0e1", maxLighting = 20 }) {
        super({ x, y, color, size, maxLighting })
        this.maxParticle = 10
        this.particlesLife = 10
        this.particles = []
        //❅
    }

    init() { }

    lerp(targetPosition) {
        const offset = 0.3
        return {
            x: this.pos.x + (targetPosition.x - this.pos.x) * offset,
            y: this.pos.y + (targetPosition.y - this.pos.y) * offset,
        }
    }

    createParticles() {
        if (this.particles.length < this.maxParticle) {
            this.particles.push({
                x: (this.pos.x) + (random(0, 10 * 2) - 10),
                y: (this.pos.y) + (random(0, 10 * 2) - 10),
                vx: (random(0, 100) - 50) / 1000,
                vy: (random(0, 100) - 50) / 1000,
                radius: random(0.5, 1.5),
                alpha: random(80, 100) / 100,
                life: 0
            });
        }
    }

    updateParticles() {
        let i = this.particles.length;
        while (i--) {
            let p = this.particles[i];
            p.vx += (random(0, 100) - 50) / 750;
            p.vy += (random(0, 100) - 50) / 750;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= .01;
            p.life++
            if (p.life >= this.particlesLife) {
                this.particles.splice(i, 1)
            }
        }
    }

    drawParticles(ctx) {
        let i = this.particles.length;
        while (i--) {
            const p = this.particles[i];
            ctx.beginPath();
            // ctx.fillRect(p.x, p.y, p.radius, p.radius);
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, ${p.alpha})`;
            ctx.fill();
            ctx.closePath();
        }
    }

    update(ctx, mousePos, canvas) {
        super.update(ctx, mousePos, canvas)
        this.createParticles();
        this.updateParticles();
        const positionLerped = this.lerp(mousePos)
        this.pos.x = positionLerped.x
        this.pos.y = positionLerped.y
        this.draw(ctx, canvas)
    }


    draw(ctx, canvas) {
        // super.draw(ctx, canvas)
        this.drawParticles(ctx)

    }
}