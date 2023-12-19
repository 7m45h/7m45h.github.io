const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const cellSize = 10;
const snakeSpd = cellSize;
const halfCell = cellSize/2;
const twoPi = Math.PI * 2;
const vKeys = [37, 38, 39, 40];
const colors = ["#be5046", "#98c379", "#d19a66", "#61afef", "#c678dd", "#56b6c2", "#abb2bf"];
const fps = 1000/10;

let dltaT = 0;
let lastT = 0;
let timeC = 0;
let key;

class Snake {
  constructor() {
    this.x = canv.width/2;
    this.y = canv.height/2;
    this.c = randCol();
    this.tail = []
    this.scor = 0;
  }

  update() {
    if (this.tail.length > this.scor) this.tail.shift();
    
    switch (key) {
      case 37: this.x -= snakeSpd; break;
      case 38: this.y -= snakeSpd; break;
      case 39: this.x += snakeSpd; break;
      case 40: this.y += snakeSpd; break;
    }

    this.tail.push({ x: this.x, y: this.y });

    this.x = (this.x + canv.width) % canv.width;
    this.y = (this.y + canv.height) % canv.height;
  }

  render() {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.c;
    ctx.strokeRect(this.x, this.y, cellSize, cellSize);
    for (let i = 0, l = this.tail.length; i < l; i++) {
      ctx.strokeRect(this.tail[i].x, this.tail[i].y, snakeSpd, snakeSpd);
    }
    ctx.restore();
  }
}

class Apple {
  constructor() {
    this.x = Math.floor(Math.random() * (canv.width - halfCell)) + halfCell;
    this.y = Math.floor(Math.random() * (canv.height - halfCell)) + halfCell;
    this.c = randCol();
  }

  render() {
    ctx.save()
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, halfCell, 0, twoPi);
    ctx.closePath()
    ctx.stroke();
    ctx.restore();
  }

  respawn() {
    this.x = Math.floor(Math.random() * (canv.width - halfCell)) + halfCell;
    this.y = Math.floor(Math.random() * (canv.height - halfCell)) + halfCell;
    this.c = randCol();
  }
}

function renderScor() {
  ctx.save();
  ctx.font = "20px monospace";
  ctx.fillStyle = "#abb2bf";
  ctx.fillText(`Score: ${player.scor}`, canv.width - 150, canv.height - 30);
  ctx.restore();
}

function randCol() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function resizeCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function updateEnv() {
  player.update();
  if ( Math.abs(player.x + halfCell - apple.x) < cellSize && Math.abs(player.y + halfCell - apple.y) < cellSize ) {
    apple.respawn();
    player.scor++;
  }
}

function renderEnv() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  player.render();
  apple.render();
  renderScor();
}

function main(t) {
  dltaT = t - lastT;
  lastT = t;

  if (timeC > fps) {
    updateEnv();
    renderEnv();
    timeC = 0;
  } else {
    timeC += dltaT;
  }
  
  window.requestAnimationFrame(main);
}

resizeCanv();
window.addEventListener("resize", resizeCanv);
window.addEventListener("keydown", (e) => { if (vKeys.includes(e.keyCode) && Math.abs(e.keyCode - key) != 2) key = e.keyCode; });
const player = new Snake();
const apple = new Apple();

window.requestAnimationFrame(main);
