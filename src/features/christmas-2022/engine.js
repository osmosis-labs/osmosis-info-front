export default class Engine {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.ctx = ctx
        this.elts = []
        this.started = false
    }

    add = (elt) => {
        this.elts.push(elt)
        elt.init()
        if (this.started && this.elts.length === 1) {
            this.update()
        }
    }

    remove = (elt) => {
        this.elts.splice(this.elts.indexOf(elt), 1)
    }

    update = (mousePosRef) => {
        if (!this.started) {
            this.started = true
        }

        this.elts.forEach((elt) => {
            this.ctx.globalCompositeOperation = 'destination-out'
            this.ctx.fillStyle = 'rgba(255, 255, 255, .01)';
            this.ctx.beginPath();
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.fill();
            this.ctx.globalCompositeOperation = 'source-over';
            let needToRemove = elt.update(this.ctx, mousePosRef, this.canvas)
            if (needToRemove) this.remove(elt)
        })
        if (this.elts.length !== 0) {
            window.requestAnimationFrame(() => this.update(mousePosRef))
        }
    }
}
