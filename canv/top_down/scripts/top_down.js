const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const onePI = Math.PI;
const twoPI = onePI * 2;
const oneDR = onePI / 180;

const keys = {"KeyW": false, "KeyA": false, "KeyD": false};

class Shooter {
  constructor() {
    this.x = canv.width / 2;
    this.y = canv.height / 2;
    this.mxt = 0.1;
    this.crt = 0;
    this.rt = oneDR;
    this.d = 0;
    this.av = 0;
    this.p = [
      [ -5, -4],
      [  5,  0],
      [ -5,  4],
      [ -5,  0]
    ];
    this.cd = Math.cos(this.d);
    this.sd = Math.sin(this.d);
    this.vx = 0;
    this.vy = 0;
    this.ivx = 0;
    this.ivy = 0;
    this.smk = [];
    this.rp = [ [], [], [], [] ];
  }

  update() {
    this.ivx = -1 * this.vx;
    this.ivy = -1 * this.vy;
    
    if (keys["KeyW"]) {
      this.crt = this.mxt;
      this.smk.push(new Particle(this.rp[3][0], this.rp[3][1], this.ivx, this.ivy, "#abb2bf"));
    } else {
      this.crt = 0;
    }

    if (keys["KeyA"]) this.av -= this.rt;
    if (keys["KeyD"]) this.av += this.rt;

    this.av *= 0.9;

    this.d += this.av;
    
    this.cd = Math.cos(this.d);
    this.sd = Math.sin(this.d);

    this.vx += this.crt * this.cd;
    this.vy += this.crt * this.sd;

    this.x += this.vx;
    this.y += this.vy;

    this.x = (this.x + canv.width) % canv.width;
    this.y = (this.y + canv.height) % canv.height;
    
    for (let i = 0; i < 4; i++) {
      this.rp[i][0] = this.p[i][0] * this.cd - this.p[i][1] * this.sd;
      this.rp[i][1] = this.p[i][0] * this.sd + this.p[i][1] * this.cd;
      this.rp[i][0] += this.x;
      this.rp[i][1] += this.y;
    }
    for (let i = 0; i < this.smk.length; i++) if (this.smk[i].update()) this.smk.splice(i, 1);
  }

  render() {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#abb2bf";
    ctx.beginPath();
    ctx.moveTo(this.rp[0][0], this.rp[0][1]);
    ctx.lineTo(this.rp[1][0], this.rp[1][1]);
    ctx.lineTo(this.rp[2][0], this.rp[2][1]);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    for (let i = 0, l = this.smk.length; i < l; i++) this.smk[i].render();
  }
}

class Particle {
  constructor(_x, _y, _vx, _vy, _c) {
    this.x = _x;
    this.y = _y;
    this.c = _c;
    this.vx = _vx + Math.random() * 2 - 1;
    this.vy = _vy + Math.random() * 2 - 1;
    this.l = Math.round(Math.random() * 50) + 50;
  }

  update() {
    this.l--;
    if (this.l < 0) return true;
    this.x += this.vx;
    this.y += this.vy;
    return false;
  }

  render() {
    ctx.save();
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, twoPI);
    ctx.fill();
    ctx.restore();
  }
}

function resizeCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function handleKeyBoard(e) {
  if (keys[e.code] != undefined) keys[e.code] = e.type == "keydown";
}

function updateEnv() {
  player.update();
}

function renderEnv() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  player.render();
}

function main() {
  updateEnv();
  renderEnv();
  window.requestAnimationFrame(main);
}

resizeCanv();

window.addEventListener("resize", resizeCanv);
window.addEventListener("keydown", handleKeyBoard);
window.addEventListener("keyup", handleKeyBoard);

const player = new Shooter();

window.requestAnimationFrame(main);
