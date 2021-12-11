let body = document.querySelector("body");
const timeAlive = 1000;
class Snowflake {
  constructor({ x, y, width, height, size, e }) {
    let className = size === "small" ? "snowflake-small" : size === "medium" ? "snowflake-medium" : "snowflake-big";
    this.width = width;
    this.height = height;
    this.element = document.createElement("div");
    this.element.classList.add(className);
    this.element.classList.add("snowflake");
    this.element.style.top = y + "px";
    this.element.style.left = x + "px";
    this.x = x;
    this.y = y;
    this.alive = true;
    this.duration = 1200;
    this.finalY = this.getFinalPoint("y");
    this.finalX = this.getFinalPoint("x");
    this.startX = this.x;
    this.startY = this.y;
    this.distY = this.finalY - this.y;
    this.distX = this.finalX - this.x;
  }

  getNewDist = () => {
    return Math.random() * 1000;
  };

  getFinalPoint = (direction) => {
    var minPos, maxPos;
    let maxDist = 200;

    if (direction === "x") {
      let screenLength = this.width;
      let imageLength = 200;
      minPos = this.x - maxDist < 0 ? 0 : this.x - maxDist;
      maxPos = this.x + maxDist > screenLength - imageLength ? screenLength - imageLength : this.x + maxDist;
      return this.getRand(minPos, maxPos);
    } else {
      let screenLength = this.height;
      let imageLength = 20;
      minPos = this.y - maxDist < 0 ? 0 : this.y - maxDist;
      maxPos = this.y + maxDist > screenLength - imageLength ? screenLength - imageLength : this.y + maxDist;
      return this.getRand(minPos, maxPos);
    }
  };

  getRand = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  move = (timestamp) => {
    let runtime = timestamp - this.startTime;
    let progress = runtime / this.duration;
    progress = Math.min(progress, 1);
    this.x = this.startX + this.distX * progress;
    this.y = this.startY + this.distY * progress;
    this.element.style.left = `${this.x.toFixed(2)}px`;
    this.element.style.top = `${this.y.toFixed(2)}px`;

    if (this.alive) {
      requestAnimationFrame((timestamp) => {
        if (runtime >= this.duration) {
          this.startTime = timestamp;
          this.finalX = this.getFinalPoint("x");
          this.finalY = this.getFinalPoint("y");
          this.startX = this.x;
          this.startY = this.y;
          this.distY = this.finalY - this.y;
          this.distX = this.finalX - this.x;
        }
        this.move(timestamp);
      });
    }
  };
}

body.addEventListener("click", (e) => {
  let max = 6;
  let numberSnowflakes = Math.floor(Math.random() * max) + 2;
  for (let i = 0; i < numberSnowflakes; i++) {
    let size = Math.floor(Math.random() * 3) + 1;
    let snowflake = new Snowflake({
      x: e.clientX,
      y: e.clientY,
      width: window.innerWidth,
      height: window.innerHeight,
      size: size === 1 ? "small" : size === 2 ? "medium" : "big",
      e,
    });
    body.appendChild(snowflake.element);
    requestAnimationFrame((timestamp) => {
      snowflake.startTime = timestamp;
      snowflake.move(timestamp);
    });
    window.setTimeout(() => {
      snowflake.element.classList.add("snowflakeDisappear");
    }, timeAlive - 500);
    window.setTimeout(() => {
      body.removeChild(snowflake.element);
      snowflake.alive = false;
    }, timeAlive);
  }
});
