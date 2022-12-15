import { random } from "../../helpers/helpers"
import { LightHTML } from "./light-html"

const colors = ["#f06292", "#ba68c8", "#4dd0e1", "#81c784", "#ffb74d", "#eeeeee"]
const maxLight = 9
const lights = []
const dieTime = 500
let indexColor = 0
const onClick = (e) => {
    const body = document.querySelector("body");
    if (lights.length > maxLight) {
        const removed = lights.shift()
        removed.die()
        window.setTimeout(() => {
            body.removeChild(removed.element);
        }, dieTime);
    }
    const newLight = new LightHTML({ x: e.clientX, y: e.clientY, size: random(10, 20), color: colors[indexColor] })
    body.appendChild(newLight.element);
    lights.push(newLight)
    indexColor++
    if (indexColor > colors.length - 1) indexColor = 0
}
export const addBody = () => {
    const body = document.querySelector("body");
    body.addEventListener("click", onClick);
}


export const removeBody = () => {
    const body = document.querySelector("body");
    body.removeEventListener("click", onClick);
}