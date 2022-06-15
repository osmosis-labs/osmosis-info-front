import omsoIMG from "./osmo.png"
import omsoDarkIMG from "./osmoDark.png"

export default class ConfettiOsmo {
	constructor({ color, x = 0, y = 0, h = 10, w = 20, vx = 5, vy = 5, r }) {
		this.color = color
		this.pos = { x, y }
		this.dim = { h: 20, w: 20 }
		this.scale = { x: 1, y: 1 }
		this.velocity = { x: vx, y: vy }
		this.rotation = r
		this.spread = 0.05
		this.gravity = 0.3
		this.gravityMax = 3
		this.img = new Image()
		this.img.src = omsoIMG
		this.imgDark = new Image()
		this.imgDark.src = omsoDarkIMG
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
		let img = this.scale.y > 0 ? this.img : this.imgDark
		ctx.drawImage(img, -width / 2, -height / 2, this.dim.w, this.dim.h)

		ctx.setTransform(1, 0, 0, 1, 0, 0)
	}
}
