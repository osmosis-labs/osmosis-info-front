import { getRandom } from "./helpers"

export default class FallItem {
	constructor({ x, y, width, height, size, classItems, classSize, classAnimation }) {
		this.width = width
		this.height = height
		this.element = document.createElement("div")
		this.element.classList.add(classSize[size])
		this.element.classList.add(classAnimation)
		const randomIndex = getRandom(0, classItems.length)
		this.element.classList.add(classItems[randomIndex])
		this.element.style.top = y + "px"
		this.element.style.left = x + "px"
		this.x = x
		this.y = y
		this.alive = true
		this.duration = 1200

		this.startX = this.x
		this.startY = this.y

		this.accY = getRandom(10, 30)
		this.accX = getRandom(10, 30)
		this.xDirectLeft = getRandom(0, 10) < 5 ? true : false
		this.xRange = getRandom(50, 100)
		this.yRange = getRandom(50, 100)
		this.imgHeight = 200
		this.imgWidth = 200
		this.finalY = this.getFinalY()
		this.finalX = this.getFinalX()
		this.distY = this.finalY - this.y
		this.distX = this.finalX - this.x
	}

	getFinalY = () => {
		let limit = this.height - this.imgHeight
		let finalY = 0
		let rangeY = this.yRange
		this.rangeY += this.yRange
		finalY = this.y + rangeY
		// if (finalY > limit) finalY = limit;
		// if (finalY < 0) finalY = 0;
		return finalY
	}

	getFinalX = () => {
		let limit = this.width - this.imgWidth
		let finalX = 0
		let rangeX = this.xRange
		this.xRange -= this.accX
		if (this.xDirectLeft) {
			rangeX = -this.xRange
			this.xDirectLeft = !this.xDirectLeft
		}
		finalX = this.x + rangeX
		if (finalX > limit) finalX = limit
		if (finalX < 0) finalX = 0
		return finalX
	}

	move = (timestamp) => {
		let runtime = timestamp - this.startTime
		let progress = runtime / this.duration
		progress = Math.min(progress, 1)
		this.x = this.startX + this.distX * progress
		this.y = this.startY + this.distY * progress
		this.element.style.left = `${this.x.toFixed(2)}px`
		this.element.style.top = `${this.y.toFixed(2)}px`

		if (this.alive) {
			requestAnimationFrame((timestamp) => {
				if (runtime >= this.duration) {
					this.startTime = timestamp
					this.finalX = this.getFinalX()
					this.finalY = this.getFinalY()
					this.startX = this.x
					this.startY = this.y
					this.distY = this.finalY - this.y
					this.distX = this.finalX - this.x
				}
				this.move(timestamp)
			})
		}
	}

	static pop = ({e, classDisappear, timeAlive, max, classItems, classSize, classAnimation, body}) => {
		let numberflowers = getRandom(1, max)
		for (let i = 0; i < numberflowers; i++) {
			let size = getRandom(1, 3)
			let item = new FallItem({
				x: e.clientX,
				y: e.clientY,
				width: window.innerWidth,
				height: window.innerHeight,
				size: size === 1 ? "small" : size === 2 ? "medium" : "big",
				classItems,
				classSize,
				classAnimation,
			})
			body.appendChild(item.element)
			requestAnimationFrame((timestamp) => {
				item.startTime = timestamp
				item.move(timestamp)
			})
			window.setTimeout(() => {
				item.element.classList.add(classDisappear)
			}, timeAlive - 500)
			window.setTimeout(() => {
				body.removeChild(item.element)
				item.alive = false
			}, timeAlive)
		}
	}
}
