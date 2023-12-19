const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const mRdim = 100;
const strokeWidth = 2;
const red = "#e05252"
const white = "#abb2bf"
const twoPi = Math.PI * 2;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  render(c) {
    ctx.save();
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, strokeWidth, 0, twoPi);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

class Box {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(p) {
    return p.x > this.x && p.x < this.x + this.w && p.y > this.y && p.y < this.y + this.h;
  }

  intersects(b) {
    return b.x + b.w > this.x && b.x < this.x + this.w && b.y + b.h > this.y && b.y < this.y + this.h;
  }

  render(c) {
    ctx.save();
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = c;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

class QuadTree {
  constructor(x, y, w, h) {
    this.bound = new Box(x, y, w, h);
    this.cap = 1;
    this.objects = [];
    this.divided = false;
  }

  divid() {
    this.nw = new QuadTree(this.bound.x, this.bound.y, this.bound.w/2, this.bound.h/2);
    this.ne = new QuadTree(this.bound.x + this.bound.w/2, this.bound.y, this.bound.w/2, this.bound.h/2);
    this.sw = new QuadTree(this.bound.x, this.bound.y + this.bound.h/2, this.bound.w/2, this.bound.h/2);
    this.se = new QuadTree(this.bound.x + this.bound.w/2, this.bound.y + this.bound.h/2, this.bound.w/2, this.bound.h/2);
    this.divided = true;
    for (let i = 0, l = this.objects.length; i < l; i++) this.add(this.objects[i]);
    this.objects = [];
  }

  add(p) {
    if (!this.bound.contains(p)) return false;
    if (this.objects.length < this.cap && !this.divided) {
      this.objects.push(p);
      return true;
    }
    if (!this.divided) this.divid();
    if (this.nw.add(p)) return true;
    if (this.ne.add(p)) return true;
    if (this.sw.add(p)) return true;
    if (this.se.add(p)) return true;
    return false;
  }

  query(b) {
    if (!this.bound.intersects(b)) return [];
    if (!this.divided) return this.objects.filter((obj) => b.contains(obj));
    let out = [];
    out = out.concat(this.nw.query(b));
    out = out.concat(this.ne.query(b));
    out = out.concat(this.sw.query(b));
    out = out.concat(this.se.query(b));
    return out;
  }

  queryAll() {
    if (!this.divided) return this.objects;
    let out = [];
    out = out.concat(this.nw.queryAll());
    out = out.concat(this.ne.queryAll());
    out = out.concat(this.sw.queryAll());
    out = out.concat(this.se.queryAll());
    return out;
  }

  render() {
    this.bound.render(white);
    if (this.divided) {
      this.nw.render();
      this.ne.render();
      this.sw.render();
      this.se.render();
    }
  }
}

function resizeCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function updateEnv() {}
function renderEnv() {
  ctx.clearRect(0, 0, canv.width, canv.height);
  quadTree.render();
  for (let i = 0, a = quadTree.queryAll(), l = a.length; i < l; i++) a[i].render(white);
  for (let i = 0, a = quadTree.query(mouseRange), l = a.length; i < l; i++) a[i].render(red);
  mouseRange.render(red);
}

function main() {
  //updateEnv();
  renderEnv();
  window.requestAnimationFrame(main);
}

resizeCanv();

const mouseRange = new Box(canv.width/2 - mRdim, canv.height/2 - mRdim, mRdim*2, mRdim*2);
const quadTree = new QuadTree(strokeWidth, strokeWidth, canv.width - strokeWidth*2, canv.height - strokeWidth*2);

window.addEventListener("mousedown", (e) => quadTree.add(new Particle(e.clientX, e.clientY)));
window.addEventListener("mousemove", (e) => { mouseRange.x = e.clientX - mRdim; mouseRange.y = e.clientY - mRdim; });

window.requestAnimationFrame(main);
