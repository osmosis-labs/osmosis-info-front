class Cache {
	constructor() {
		if (!Cache.instance) {
			this.cache = {}
		}
	}

	getName = (...args) => {
		let res = ""
		if (Array.isArray(args)) {
			res = args.join("-")
		} else if (typeof args === "object") {
			res = Object.keys(args).join("-")
		}
		return res
	}

	getCache = (name, condition = null) => {
		if (!this.cache[name]) {
			// console.log(`%ccache.js -> Not cache -> ${name}`, "background: #1a237e; color:#FFFFFF")
			return null
		}
		if (!condition) {
			// console.log(
			// 	`%ccache.js -> In cache (not condition) -> ${name} -> ${this.cache[name]}`,
			// 	"background: #1a237e; color:#FFFFFF"
			// )
			return this.cache[name]
		} else {
			if (condition(this.cache[name])) {
				// console.log(
				// 	`%ccache.js -> In cache (condition) -> ${name} -> ${this.cache[name]}`,
				// 	"background: #1a237e; color:#FFFFFF"
				// )
				return this.cache[name]
			} else {
				// console.log(`%ccache.js -> Not valide condition -> ${name}`, "background: #1a237e; color:#FFFFFF")
				return null
			}
		}
	}

	setCache = (name, value) => {
		// console.log(`%ccache.js -> Set cache -> ${name} -> ${value}`, "background: #1a237e; color:#FFFFFF")
		this.cache[name] = value
	}
}

const cache = new Cache()
export default cache
