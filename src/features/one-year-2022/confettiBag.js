import Confetti from "./confetti"
import ConfettiOsmo from "./confettiOsmo"

const colors = [
	{ front: "#ac9dd8", back: "#7c6fa6" }, // purple
	// { front: "#322dc2", back: "#000290" }, // blue
	{ front: "#C4A46A", back: "#92753e" }, // gold
]

const rng = (min, max) => Math.random() * (max - min) + min
const nbConfetti = rng(200, 300)

export default class ConfettiBag {
	constructor(canvas, ctx) {
		this.canvas = canvas
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.ctx = ctx
		this.confettis = []
		this.opacityText = 0.1
		this.opacityTextUp = true
	}

	init = () => {
		for (let i = 0; i < nbConfetti; i++) {
			let y = this.canvas.height / 2
			let x = this.canvas.width
			let vxLmt = [10, 30]
			let vyLmt = [0, 18]
			let vx = -rng(vxLmt[0], vxLmt[1])
			let vy = -rng(vyLmt[0], vyLmt[1])
			if (i % 2 === 0) {
				x = 0
				vx = rng(vxLmt[0], vxLmt[1])
				vy = -rng(vyLmt[0], vyLmt[1])
			}
			let confetti = null
			if (rng(0, 1) <= 20 / 100) {
				confetti = new ConfettiOsmo({
					color: colors[Math.floor(rng(0, colors.length))],
					x,
					y,
					h: rng(3, 5),
					w: rng(5, 10),
					vx,
					vy,
					r: rng(0, 2 * Math.PI),
				})
			} else {
				confetti = new Confetti({
					color: colors[Math.floor(rng(0, colors.length))],
					x,
					y,
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

	drawText = () => {
		this.ctx.font = "48px Inter"
		let offsetText = 0.01
		if (this.opacityTextUp) {
			this.opacityText += offsetText
		} else {
			this.opacityText -= offsetText
		}
		if (this.opacityText >= 1) {
			this.opacityTextUp = false
		}

		this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
		let txt = "Happy birthday Osmosis!"
		let widthText = this.ctx.measureText(txt).width
		if (widthText > this.canvas.width) {
			let txtTable = txt.split(" ")
			let yStep = 50
			let yStart = (-yStep * (txtTable.length - 1)) / 2
			for (let i = 0; i < txtTable.length; i++) {
				let currentWidthTxt = this.ctx.measureText(txtTable[i]).width
				this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacityText})`
				this.ctx.strokeText(txtTable[i], -currentWidthTxt / 2, yStart + yStep * i)
				this.ctx.fillStyle = `rgba(172, 157, 216, ${this.opacityText})`
				this.ctx.fillText(txtTable[i], -currentWidthTxt / 2, yStart + yStep * i)
			}
		} else {
			this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacityText})`
			this.ctx.strokeText(txt, 0 - widthText / 2, 0)
			this.ctx.fillStyle = `rgba(172, 157, 216, ${this.opacityText})`
			this.ctx.fillText(txt, 0 - widthText / 2, 0)
		}

		this.ctx.setTransform(1, 0, 0, 1, 0, 0)
	}

	draw = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.drawText()
		this.confettis.forEach((confetti, index) => {
			confetti.draw(this.ctx)

			//remove confetti if it's out of the screen
			if (confetti.pos.y >= this.canvas.height) this.confettis.splice(index, 1)
		})
	}

	update = () => {
		this.draw()
		if (this.confettis.length === 0) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		} else {
			window.requestAnimationFrame(this.update)
		}
	}
}
