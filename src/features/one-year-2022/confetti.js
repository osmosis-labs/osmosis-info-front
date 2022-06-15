export default class Confetti {
	constructor({ color, x = 0, y = 0, h = 10, w = 20, vx = 5, vy = 5, r }) {
		this.color = color
		this.pos = { x, y }
		this.dim = { h, w }
		this.scale = { x: 1, y: 1 }
		this.velocity = { x: vx, y: vy }
		this.rotation = r
		this.spread = 0.05
		this.gravity = 0.3
		this.gravityMax = 3
	}

	update = () => {
		this.velocity.x -= this.velocity.x * this.spread
		this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
		this.velocity.y = Math.min(this.velocity.y + this.gravity, this.gravityMax)

		this.pos.x += this.velocity.x
		this.pos.y += this.velocity.y

		// to rate confetti
		this.scale.y = Math.cos((this.pos.y + 1) * 0.09)
	}

	draw = (ctx) => {
		let width = this.dim.w * this.scale.x
		let height = this.dim.h * this.scale.y

		ctx.translate(this.pos.x, this.pos.y)
		ctx.rotate(this.rotation)

		this.update()
		ctx.fillStyle = this.scale.y > 0 ? this.color.front : this.color.back
		ctx.fillRect(-width / 2, -height / 2, width, height)

		ctx.setTransform(1, 0, 0, 1, 0, 0)
	}
}
