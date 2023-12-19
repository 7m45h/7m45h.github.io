const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const vmag = 30;
const vlen = vmag/3;
const grid = [0, 0];
const ipos = [0, 0];
const mous = [0, 0];
const colors = ["#be5046", "#98c379", "#d19a66", "#61afef", "#c678dd", "#56b6c2", "#abb2bf"];
const lwid = 2;
let varr = [];

class Vector {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.c = colors[Math.floor(Math.random() * colors.length)];
    this.d = 0;
    this.t = [-vlen, 0];
    this.h = [ vlen, 0];
    this.al = [vlen - 4, -4];
    this.ar = [vlen - 4,  4];
    this.cd = Math.cos(this.d);
    this.sd = Math.sin(this.d);
    this.rt = [(this.t[0] * this.cd - this.t[1] * this.sd) + this.x, (this.t[0] * this.sd + this.t[1] * this.cd) + this.y];
    this.rh = [(this.h[0] * this.cd - this.h[1] * this.sd) + this.x, (this.h[0] * this.sd + this.h[1] * this.cd) + this.y];
    this.ral = [(this.al[0] * this.cd - this.al[1] * this.sd) + this.x, (this.al[0] * this.sd + this.al[1] * this.cd) + this.y];
    this.rar = [(this.ar[0] * this.cd - this.ar[1] * this.sd) + this.x, (this.ar[0] * this.sd + this.ar[1] * this.cd) + this.y];
  }

  update() {
    this.d = Math.atan2(mous[1] - this.y, mous[0] - this.x);

    this.cd = Math.cos(this.d);
    this.sd = Math.sin(this.d);

    this.rt[0] = (this.t[0] * this.cd - this.t[1] * this.sd) + this.x;
    this.rt[1] = (this.t[0] * this.sd + this.t[1] * this.cd) + this.y;
    this.rh[0] = (this.h[0] * this.cd - this.h[1] * this.sd) + this.x;
    this.rh[1] = (this.h[0] * this.sd + this.h[1] * this.cd) + this.y;
    this.ral[0] = (this.al[0] * this.cd - this.al[1] * this.sd) + this.x;
    this.ral[1] = (this.al[0] * this.sd + this.al[1] * this.cd) + this.y;
    this.rar[0] = (this.ar[0] * this.cd - this.ar[1] * this.sd) + this.x;
    this.rar[1] = (this.ar[0] * this.sd + this.ar[1] * this.cd) + this.y;
  }

  render() {
    ctx.lineWidth = lwid;
    ctx.strokeStyle = this.c;
    ctx.beginPath();
    ctx.moveTo(this.ral[0], this.ral[1]);
    ctx.lineTo(this.rh[0], this.rh[1]);
    ctx.lineTo(this.rar[0], this.rar[1]);
    ctx.moveTo(this.rh[0], this.rh[1]);
    ctx.lineTo(this.rt[0], this.rt[1]);
    ctx.stroke();
  }
}

function newGrid() {
  varr = [];
  grid[0] = (canv.width - (canv.width % vmag)) / vmag;
  grid[1] = (canv.height - (canv.height % vmag)) / vmag;
  ipos[0] = ((canv.width % vmag) / 2) + vmag/2;
  ipos[1] = ((canv.height % vmag) / 2) + vmag/2;
  for (let r = 0; r < grid[1]; r++) {
    varr.push([]);
    for (let c = 0; c < grid[0]; c++) {
      varr[r].push(new Vector(ipos[0] + vmag * c, ipos[1] + vmag * r));
    }
  }
}

function setMousPos(_e) {
  mous[0] = _e.clientX;
  mous[1] = _e.clientY;
  window.requestAnimationFrame(main);
}

function setUpCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function updateEnv() {
  for (let r = 0; r < grid[1]; r++) for (let c = 0; c < grid[0]; c++) varr[r][c].update();
}

function renderEnv() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.save();
  for (let r = 0; r < grid[1]; r++) for (let c = 0; c < grid[0]; c++) varr[r][c].render();
  ctx.restore();
}

function main() {
  updateEnv();
  renderEnv();
}

setUpCanv();
mous[0] = canv.width/2;
mous[1] = canv.height/2;

window.addEventListener("resize", () => {
  setUpCanv();
  newGrid();
});
window.addEventListener("mousemove", setMousPos);

newGrid();

window.requestAnimationFrame(main);
