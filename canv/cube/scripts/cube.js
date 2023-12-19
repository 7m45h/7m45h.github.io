const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const onePI = Math.PI;
const twoPI = onePI * 2;
const oneDR = onePI / 180;
const colos = ["#282c34", "#be5046", "#98c379", "#d19a66", "#61afef", "#c678dd", "#56b6c2", "#abb2bf"];

class Cube {
  constructor() {
    this.p = [canv.width/2, canv.height/2];
    this.s = Math.round(Math.sqrt(canv.width * canv.height)/10);
    this.d = 0;
    this.e = [
      [-1 * this.s, -1 * this.s,  1 * this.s],
      [ 1 * this.s, -1 * this.s,  1 * this.s],
      [ 1 * this.s,  1 * this.s,  1 * this.s],
      [-1 * this.s,  1 * this.s,  1 * this.s],
      [-1 * this.s, -1 * this.s, -1 * this.s],
      [ 1 * this.s, -1 * this.s, -1 * this.s],
      [ 1 * this.s,  1 * this.s, -1 * this.s],
      [-1 * this.s,  1 * this.s, -1 * this.s]
    ];
    this.cd = 0;
    this.sd = 0;
    this.tmpx = 0;
    this.tmpy = 0;
    this.tmpz = 0;
    this.re = [ [], [], [], [], [], [], [], [] ];
  }

  update() {
    this.d = (this.d + twoPI + oneDR) % twoPI;
    this.cd = Math.cos(this.d);
    this.sd = Math.sin(this.d);

    for (let i = 0; i < 8; i++) {
      this.re[i][0] = this.e[i][0];
      this.re[i][1] = this.e[i][1];
      this.re[i][2] = this.e[i][2];
      // rotate in x axis
      this.tmpx = this.e[i][0];
      this.tmpy = this.e[i][1];
      this.tmpz = this.e[i][2];
      this.re[i][1] = this.tmpy * this.cd - this.tmpz * this.sd;
      this.re[i][2] = this.tmpy * this.sd + this.tmpz * this.cd;
      // rotate in y axis
      this.tmpx = this.re[i][0];
      this.tmpy = this.re[i][1];
      this.tmpz = this.re[i][2];
      this.re[i][0] = this.tmpx * this.cd + this.tmpz * this.sd;
      this.re[i][2] = this.tmpz * this.cd - this.tmpx * this.sd;
      // rotate in z axis
      this.tmpx = this.re[i][0];
      this.tmpy = this.re[i][1];
      this.tmpz = this.re[i][2];
      this.re[i][0] = this.tmpx * this.cd - this.tmpy * this.sd;
      this.re[i][1] = this.tmpx * this.sd + this.tmpy * this.cd;
      // apply positions
      this.re[i][0] += this.p[0];
      this.re[i][1] += this.p[1];
    }
  }

  render() {
    ctx.save();
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = colos[i];
      ctx.beginPath();
      ctx.arc(this.re[i][0], this.re[i][1], 4, 0, twoPI);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
  }
}

function resizeCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function updateEnv() {
  cube.update();
}

function renderEnv() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  cube.render();
}

function main () {
  updateEnv();
  renderEnv();
  window.requestAnimationFrame(main);
}

resizeCanv();

window.addEventListener("resize", resizeCanv);

const cube = new Cube();

window.requestAnimationFrame(main);
