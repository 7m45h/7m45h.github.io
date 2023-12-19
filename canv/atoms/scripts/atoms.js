const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const onePI = Math.PI;
const twoPI = onePI * 2;
const oneDR = onePI / 180;

const atoms = [];

const mouse = {
  down: false,
  cx: 0,
  cy: 0,
  px: 0,
  py: 0
};

let delta_t = 0;
let last_t = 0;

class Atom {
  constructor(_cx, _cy, _px, _py, _r, _m) {
    this.cx = _px;
    this.cy = _py;
    this.px = _cx;
    this.py = _cy;
    this.r = _r;
    this.m = _m;
  }

  update(dt) {
    let vx = (this.cx - this.px) * 0.99;
    let vy = (this.cy - this.py) * 0.99;

    this.px = this.cx;
    this.py = this.cy;

    this.cx += vx + 0 * dt * dt;
    this.cy += vy + 2000 * dt * dt;

    vx = this.cx - this.px;
    vy = this.cy - this.py;

    if (this.cx < 0) {
      this.cx = 0;
      this.px = this.cx + vx;
    } else if (this.cx > canv.width) {
      this.cx = canv.width;
      this.px = this.cx + vx;
    }

    if (this.cy < 0) {
      this.cy = 0;
      this.py = this.cy + vy;
    } else if (this.cy > canv.height) {
      this.cy = canv.height;
      this.py = this.cy + vy;
    }
  }

  render() {
    ctx.save();
    ctx.strokeStyle = "#abb2bf";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, twoPI);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

const placeholder_atom = new Atom(0, 0, 0, 0, 4, 1);

function resizeCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function updateEnv(dt) {
  placeholder_atom.cx = mouse.cx;
  placeholder_atom.cy = mouse.cy;
  
  for (let i = 0, l = atoms.length; i < l; i++) atoms[i].update(dt);
}

function renderEnv() {
  ctx.clearRect(0, 0, canv.width, canv.height);

  if (mouse.down) {
    ctx.save();
    ctx.strokeStyle = "#abb2bf"
    ctx.beginPath();
    ctx.moveTo(mouse.px, mouse.py);
    ctx.lineTo(mouse.cx, mouse.cy);
    ctx.stroke();
    ctx.restore();
    placeholder_atom.render();
  }
  
  for (let i = 0, l = atoms.length; i < l; i++) atoms[i].render();
}

function main(time) {
  delta_t = (time - last_t) / 1000;
  last_t = time;
  
  updateEnv(delta_t);
  renderEnv();
  window.requestAnimationFrame(main);
}

resizeCanv();

window.addEventListener("mousemove", (e) => { mouse.cx = e.clientX; mouse.cy = e.clientY });
window.addEventListener("mousedown", (e) => { mouse.down = true; mouse.px = e.clientX; mouse.py = e.clientY });
window.addEventListener("mouseup", (e) => {
  mouse.down = false; atoms.push(new Atom(e.clientX, e.clientY, mouse.px, mouse.py, 4, 1));
});
window.addEventListener("resize", resizeCanv);

window.requestAnimationFrame(main);
