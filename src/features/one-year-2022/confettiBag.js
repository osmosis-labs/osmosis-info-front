import Confetti from "./confetti"
import ConfettiOsmo from "./confettiOsmo"

const colors = [
	{ front: "#ac9dd8", back: "#7c6fa6" }, // purple
	// { front: "#322dc2", back: "#000290" }, // blue
	{ front: "#C4A46A", back: "#92753e" }, // gold
]

const rng = (min, max) => Math.random() * (max - min) + min

export default class ConfettiBag {
	constructor(canvas, { x, y, vxLimit, vyLimit, nbConfetti }) {
		this.canvas = canvas
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.confettis = []
		this.opacityText = 0.1
		this.opacityTextUp = true
		this.x = x
		this.y = y
		this.vxLimit = vxLimit
		this.vyLimit = vyLimit
		this.nbConfetti = nbConfetti
	}

	init = () => {
		for (let i = 0; i < this.nbConfetti; i++) {
			let vx = rng(this.vxLimit[0], this.vxLimit[1])
			let vy = rng(this.vyLimit[0], this.vyLimit[1])

			let confetti = null
			if (rng(0, 1) <= 20 / 100) {
				confetti = new ConfettiOsmo({
					color: colors[Math.floor(rng(0, colors.length))],
					x: this.x,
					y: this.y,
					h: rng(3, 5),
					w: rng(5, 10),
					vx,
					vy,
					r: rng(0, 2 * Math.PI),
				})
			} else {
				confetti = new Confetti({
					color: colors[Math.floor(rng(0, colors.length))],
					x: this.x,
					y: this.y,
					h: rng(3, 5),
					w: rng(5, 10),
					vx,
					vy,
					r: rng(0, 2 * Math.PI),
				})
			}
			this.confettis.push(confetti)
		}
	}

	draw = (ctx) => {
		this.confettis.forEach((confetti, index) => {
			confetti.draw(ctx)
			//remove confetti if it's out of the screen
			if (confetti.pos.y >= this.canvas.height) this.confettis.splice(index, 1)
		})
	}

	update = (ctx) => {
		this.draw(ctx)
		return this.confettis.length <= 0
	}
}
