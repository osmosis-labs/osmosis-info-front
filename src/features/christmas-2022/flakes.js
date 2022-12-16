import { random } from "../../helpers/helpers";
import { Flake } from "./flake"


const onClick = (e) => {
    const body = document.querySelector("body");
    for (let i = 0; i < random(1, 6); i++) {
        requestAnimationFrame((timestamp) => {
            let size = random(10, 20)
            let flake = new Flake({
                x: e.clientX, y: e.clientY,
                width: size, height: size, e,
                vx: random(-5, 5), vy: random(-5, 5)
            });
            body.appendChild(flake.element);
            flake.move(timestamp);
            window.setTimeout(() => {
                body.removeChild(flake.element);
            }, Flake.timeAlive);
        });
    }
}
export const addBody = () => {
    const body = document.querySelector("body");

    body.addEventListener("click", onClick);
}


export const removeBody = () => {
    const body = document.querySelector("body");

    body.removeEventListener("click", onClick);
}