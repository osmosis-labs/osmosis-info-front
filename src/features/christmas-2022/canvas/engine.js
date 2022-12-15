export default class Engine {
    constructor({ canvas, ctx, clear }) {
        this.canvas = canvas
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = ctx
        this.elts = []
        this.started = false
        this.clearHard = clear === "hard"
    }

    add = (elt) => {
        this.elts.push(elt)
        elt.init()

    }

    remove = (elt) => {
        this.elts.splice(this.elts.indexOf(elt), 1)
    }

    update = (mousePosRef) => {

        if (!this.started) {
            this.started = true
        }
        if (this.clearHard) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        } else {

            this.ctx.globalCompositeOperation = 'destination-out'
            this.ctx.fillStyle = 'rgba(255, 255, 255, .05)';
            this.ctx.beginPath();
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.fill();
            this.ctx.globalCompositeOperation = 'source-over';
        }

        this.elts.forEach((elt) => {

            let needToRemove = elt.update(this.ctx, mousePosRef.current, this.canvas)
            if (needToRemove) {
                this.remove(elt)
            }
        })
        if (this.elts.length !== 0) {
            window.requestAnimationFrame(() => this.update(mousePosRef))
        }
    }
}
