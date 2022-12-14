export default class Trail {
    constructor({ x = 0, y = 0, size = 10 }) {
        this.pos = { x, y }
        this.size = size
        this.color = '#e91e63'
        this.strokeColor = '#f8bbd0'
    }
    init = () => { }

    update = (ctx, mousePosRef, canvas) => {
        const positionLerped = this.lerp(mousePosRef.current)
        this.pos.x = positionLerped.x
        this.pos.y = positionLerped.y
        this.draw(ctx, canvas)
    }

    lerp = (targetPosition) => {
        const offset = 0.3
        return {
            x: this.pos.x + (targetPosition.x - this.pos.x) * offset,
            y: this.pos.y + (targetPosition.y - this.pos.y) * offset,
        }
    }

    draw = (context, canvas) => {
        context.beginPath();

        const gradient = context.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, this.size);
        gradient.addColorStop(0, '#f8bbd0');
        gradient.addColorStop(1, '#ff94c2');

        context.fillStyle = gradient;
        context.fill();

        context.fillStyle = gradient

        context.moveTo(this.pos.x, this.pos.y);
        context.lineTo(this.pos.x, this.pos.y);

        context.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2, true);
        context.fill();
    }
}