import { random } from "../../helpers/helpers";
import { Bone } from "./Bone"

const body = document.querySelector("body");

body.addEventListener("click", (e) => {
	for (let i = 0; i < random(1, 6); i++) {
		requestAnimationFrame((timestamp) => {
			let size = random(10, 20)
			let bone = new Bone({
				x: e.clientX, y: e.clientY,
				width: size, height: size, e,
				vx: random(-5, 5), vy: random(-5, 5)
			});
			body.appendChild(bone.element);
			bone.move(timestamp);
			window.setTimeout(() => {
				body.removeChild(bone.element);
			}, Bone.timeAlive);
		});
	}
});
