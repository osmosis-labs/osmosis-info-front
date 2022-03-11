import FallItem from "./fallItem"
import PopItem from "./popItem"

const classDisappear = "itemThemeDisappear_patrick"
const classItems = ["item1Theme_patrick", "item2Theme_patrick", "item3Theme_patrick"]
const classSize = {
	small: "itemTheme-small_patrick",
	medium: "itemTheme-medium_patrick",
	big: "itemTheme-big_patrick",
}
const classAnimation = "itemThemeFall_patrick"

export const appUseEffect = () => {
	let body = document.querySelector("body")
	const timeAlive = 1000
	const max = 6

	const click = (e) => {
		PopItem.pop({ e, classDisappear, timeAlive, max, classItems, classSize, classAnimation, body })
	}
	body.addEventListener("click", click)

	return () => {
		body.removeEventListener("click", click)
	}
}

export const infoBarUseEffect = () => {
	const timeAliveFall = 2000
	const element = document.querySelector("#infoBar")
	const body = document.querySelector("body")
	const rect = element.getBoundingClientRect()
	const size = Math.floor(Math.random() * 3) + 1
	const item = new FallItem({
		x: rect.left + rect.width / 2,
		y: rect.bottom,
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
	let timeoutAlive = window.setTimeout(() => {
		item.element.classList.add(classDisappear)
	}, timeAliveFall - 500)
	let timeoutDeath = window.setTimeout(() => {
		body.removeChild(item.element)
		item.alive = false
	}, timeAliveFall)
	return () => {
		clearTimeout(timeoutAlive)
		clearTimeout(timeoutDeath)
	}
}

export const themePalette = {
	greenPatrick: {
		dark: "#225D1D",
		light: "#64B45D",
	},
	orangePatrick: {
    main: "#E59711",
  }

}
