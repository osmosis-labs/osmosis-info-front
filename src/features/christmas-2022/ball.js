import { random } from "../../helpers/helpers";

const body = document.querySelector("body");

export class EngineBalls {
    constructor() {
        this.ballsAlive = [];
        this.ballsDead = []
    }

    onClick = (event) => {

        const pos = { x: event.clientX, y: event.clientY }

        // Check if ball can be used or create it
        let ball = null
        if (this.ballsDead.length > 0) {
            ball = this.ballsDead.pop()
        } else {
            ball = new Ball()
        }

        ball.initialize({ ...pos, size: random(20, 30) })
        ball.live()
        this.ballsAlive.push(ball)

        const die = () => {
            ball.die()
            ball.element.removeEventListener("animationend", die)
            this.ballsDead.push(ball)
            this.ballsAlive.splice(this.ballsAlive.indexOf(ball), 1)
        }

        // Add event listener animationend to move ball from alive to dead, it will be reused
        ball.element.addEventListener("animationend", die)

        // Run ball animation in requestAnimationFrame
        requestAnimationFrame(() => {
            body.appendChild(ball.element);
            ball.update();
        });
    }

    addBody = () => {
        body.addEventListener("click", this.onClick);
    }

    removeBody = () => {
        body.removeEventListener("click", this.onClick);
    }
}

export class Ball {
    static timeAlive = 2000
    static nbTypeBall = 4
    constructor() {
        this.element = document.createElement("div");
        this.element.style.animationDuration = Ball.timeAlive / 1000 + "s";
    }

    initialize = ({ x, y, size }) => {
        this.pos = { x: 0, y: 0 }
        this.velocities = { x: x > window.innerWidth / 2 ? -1 : 1, y: 1, scale: 0.05 }
        this.acceleration = { x: 1.02, y: 1.02, scale: 1.005 }
        this.scale = 1
        this.element.style.top = y + "px";
        this.element.style.left = x + "px";
        this.element.style.width = size + "px";
        this.element.style.height = size + "px";

        this.element.classList.add("ball");
        this.ballType = random(1, Ball.nbTypeBall)
        this.element.classList.add(`ball${this.ballType}`);
    }

    live = () => {
        this.alive = true
        this.element.classList.add("ballAlive");
        this.element.classList.remove("ballDead");
    }

    die = () => {
        // don't remove element, reuse it
        this.alive = false
        this.element.classList.add("ballDead");
        this.element.classList.remove("ballAlive");
        this.element.classList.remove(`ball${this.ballType}`);
    }

    draw = () => {
        this.element.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) scale(${this.scale})`

    }
    update = () => {
        requestAnimationFrame(() => {
            this.velocities.x = this.velocities.x * this.acceleration.x
            this.velocities.y = this.velocities.y * this.acceleration.y
            this.velocities.scale = this.velocities.scale * this.acceleration.scale
            this.pos.x += this.velocities.x
            this.pos.y += this.velocities.y
            this.scale -= this.velocities.scale
            if (this.scale < 0) this.scale = 0
            this.draw()
            if (this.alive) this.update();
        })
    }
}

// const onClick = (e) => {
//     requestAnimationFrame((timestamp) => {
//         let size = random(20, 30)
//         let ball = new Ball({
//             x: e.clientX, y: e.clientY,
//             direction: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
//             size,
//         });
//         body.appendChild(ball.element);
//         ball.move(timestamp);
//         window.setTimeout(() => {
//             body.removeChild(ball.element);
//         }, Ball.timeAlive);
//     });
// }



// export class Ball {
//     static timeAlive = 2000
//     constructor({ x, y, size, direction }) {
//         // draw element
//         this.element = document.createElement("div");
//         this.element.style.top = y + "px";
//         this.element.style.left = x + "px";
//         this.element.style.width = size + "px";
//         this.element.style.height = size + "px";
//         this.element.classList.add("ball");
//         this.element.classList.add(`ball${random(1, 4)}`);
//         this.element.style.animationDuration = Ball.timeAlive / 1000 + "s";
//         this.alive = true
//         this.min = { x: 0, y: 0 };
//         this.max = { x: window.innerWidth, y: window.innerHeight }
//         this.scaleSize = 1
//         this.pos = { x, y }
//         this.velocity = { x: x > direction.x ? -1 : 1, y: 1 }
//         this.velocitySize = 0.5
//         this.acc = { x: 1.01, y: 1.01, s: 1.01 }
//         this.gravity = 0.3
//         this.gravityMax = 3
//     }


//     draw = () => {
//         //to update the style
//         this.element.style.top = this.pos.y + "px";
//         this.element.style.left = this.pos.x + "px";
//         this.element.style.width = this.size + "px";
//         this.element.style.height = this.size + "px";

//         this.element.transform = `translate() scale(${scaleSize})`
//     }

//     live = () => {
//         this.element.classList.add("ballAlive");
//         this.element.classList.remove("ballDead");
//     }

//     die = () => {
//         // don't remove element, reuse it
//         this.element.classList.add("ballDead");
//         this.element.classList.remove("ballAlive");
//     }



//     move = (timestamp) => {
//         requestAnimationFrame((timestamp) => {
//             this.velocity.x = this.velocity.x * this.acc.x
//             this.velocity.y = this.velocity.y * this.acc.y
//             this.velocitySize = this.velocitySize * this.acc.s
//             this.pos.x += this.velocity.x
//             this.pos.y += this.velocity.y
//             this.size -= this.velocitySize
//             this.draw()
//             this.move(timestamp);
//         });
//     }
// };