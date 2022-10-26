

export class Bone {
	static timeAlive = 2000
	constructor({ x, y, width = 40, height = 40, e, vx = 5, vy = 5 }) {
		// draw element
		this.element = document.createElement("div");
		this.element.classList.add("bone");
		this.element.style.top = y + "px";
		this.element.style.left = x + "px";
		this.element.style.width = width + "px";
		this.element.style.height = height + "px";
		this.element.style.zIndex = 1000000;
		this.element.style.position = "fixed";
		this.element.style.animationDuration = Bone.timeAlive / 1000 + "s";
		this.alive = true
		this.min = { x: 0, y: 0 };
		this.max = { x: window.innerWidth, y: window.innerHeight }
		this.size = { x: width, y: height }
		this.pos = { x, y }
		this.velocity = { x: vx, y: vy }
		this.spread = 0.05
		this.gravity = 0.3
		this.gravityMax = 3
	}


	draw = () => {
		//to update the style
		this.element.style.top = this.pos.y + "px";
		this.element.style.left = this.pos.x + "px";
	}



	move = (timestamp) => {
		requestAnimationFrame((timestamp) => {
			this.velocity.x -= this.velocity.x * this.spread
			this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
			this.velocity.y = Math.min(this.velocity.y + this.gravity, this.gravityMax)

			this.pos.x += this.velocity.x
			this.pos.y += this.velocity.y
			this.draw()
			this.move(timestamp);
		});
	}
};