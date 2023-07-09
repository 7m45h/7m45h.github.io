const _canv = document.querySelector("canvas");
const _ctx = _canv.getContext("2d");

const _colArr = ["#282c34", "#be5046", "#98c379", "#d19a66", "#61afef", "#c678dd", "#56b6c2", "#abb2bf"];
const _twoPi = Math.PI * 2;
const _objArr = [];

function randCol() {
  return _colArr[ Math.floor( Math.random() * 7 ) ];
}

function scaleCanv() {
  _canv.width = window.innerWidth;
  _canv.height = window.innerHeight;
}

class Obj {
  constructor(x, y) {
    this.posX = x || _canv.width/2;
    this.posY = y || _canv.height/2;
    this.rad = 5;
    this.col = randCol();
    this.velX = Math.random() * 4 - 2;
    this.velY = Math.random() * 4 - 2;
  }

  update() {
    if ( this.posX + this.rad >= _canv.width || this.posX - this.rad <= 0 ) {
      this.velX *= -1;
      this.col = randCol();
    }
    if ( this.posY + this.rad >= _canv.height || this.posY - this.rad <= 0 ) {
      this.velY *= -1;
      this.col = randCol();
    }

    this.posX += this.velX;
    this.posY += this.velY;
  }

  render() {
    _ctx.strokeStyle = this.col;
    _ctx.beginPath();
    _ctx.arc(this.posX, this.posY, this.rad, 0, _twoPi);
    _ctx.closePath();
    _ctx.stroke();
  }
}

// MAIN LOOP
function main() {
  _ctx.clearRect(0, 0, _canv.width, _canv.height);
  _objArr.forEach((obj) => {
    obj.update();
  });
  _objArr.forEach((obj) => {
    obj.render();
  });
  window.requestAnimationFrame(main);
}

// INIT
scaleCanv();
for (let i = 0; i < 100; i++) {
  _objArr.push(new Obj());
}
document.addEventListener("click", (event) => {
  _objArr.push(new Obj(event.offsetX, event.offsetY));
});
window.addEventListener("resize", () => {
  scaleCanv();
});
window.requestAnimationFrame(main);
