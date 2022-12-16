import { random } from "../../helpers/helpers";

const onClick = (e) => {
    const body = document.querySelector("body");
    requestAnimationFrame((timestamp) => {
        let size = random(20, 30)
        let ball = new Ball({
            x: e.clientX, y: e.clientY,
            direction: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
            size,
        });
        body.appendChild(ball.element);
        ball.move(timestamp);
        window.setTimeout(() => {
            body.removeChild(ball.element);
        }, Ball.timeAlive);
    });
}
export const addBody = () => {
    const body = document.querySelector("body");

    body.addEventListener("click", onClick);
}


export const removeBody = () => {
    const body = document.querySelector("body");

    body.removeEventListener("click", onClick);
}


export class Ball {
    static timeAlive = 2000
    constructor({ x, y, size, direction }) {
        // draw element
        this.element = document.createElement("div");
        this.element.style.top = y + "px";
        this.element.style.left = x + "px";
        this.element.style.width = size + "px";
        this.element.style.height = size + "px";
        this.element.style.zIndex = 1000000;
        this.element.style.position = "fixed";
        this.element.classList.add("ball");
        this.element.classList.add(`ball${random(1, 4)}`);
        this.element.style.animationDuration = Ball.timeAlive / 1000 + "s";
        this.alive = true
        this.min = { x: 0, y: 0 };
        this.max = { x: window.innerWidth, y: window.innerHeight }
        this.size = size
        this.pos = { x, y }
        this.velocity = { x: x > direction.x ? -1 : 1, y: 1 }
        this.velocitySize = 0.5
        this.acc = { x: 1.01, y: 1.01, s: 1.01 }
        this.gravity = 0.3
        this.gravityMax = 3
    }


    draw = () => {
        //to update the style
        this.element.style.top = this.pos.y + "px";
        this.element.style.left = this.pos.x + "px";
        this.element.style.width = this.size + "px";
        this.element.style.height = this.size + "px";
    }



    move = (timestamp) => {
        requestAnimationFrame((timestamp) => {
            this.velocity.x = this.velocity.x * this.acc.x
            this.velocity.y = this.velocity.y * this.acc.y
            this.velocitySize = this.velocitySize * this.acc.s
            this.pos.x += this.velocity.x
            this.pos.y += this.velocity.y
            this.size -= this.velocitySize
            this.draw()
            this.move(timestamp);
        });
    }
};