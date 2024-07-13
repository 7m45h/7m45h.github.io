import { crnt_colors } from "assets/scripts/theme_manager";

const div_main = document.querySelector("main");
const canv     = document.querySelector("canvas");
const ctx      = canv.getContext("2d");

const cell_size = 16;
const half_cell = cell_size * 0.5;
const two_PI    = Math.PI * 2;

let fps          = 24
let fpm          = 1000 / fps;
let time_prev    = 0;
let time_delta   = 0;
let time_counter = 0;

let crnt_key = null;

class Nake
{
  static speed = cell_size;

  static prevX = 0;
  static prevY = 0;
  static crntX = 0;
  static crntY = 0;

  constructor()
  {
    this.x    = canv.width * 0.5;
    this.y    = canv.height * 0.5;
    this.tail = [];
  }

  update()
  {
    Nake.prevX = this.x;
    Nake.prevY = this.y;

    switch (crnt_key)
    {
      case "ArrowLeft":
      this.x -= Nake.speed;
      break;
      case "ArrowRight":
      this.x += Nake.speed;
      break;
      case "ArrowUp":
      this.y -= Nake.speed;
      break;
      case "ArrowDown":
      this.y += Nake.speed;
      break;
    }

    for (let i = 0, l = this.tail.length; i < l; i++)
    {
      Nake.crntX = this.tail[i][0];
      Nake.crntY = this.tail[i][1];

      this.tail[i][0] = Nake.prevX;
      this.tail[i][1] = Nake.prevY;

      Nake.prevX = Nake.crntX;
      Nake.prevY = Nake.crntY;
    }

    this.x = (this.x + canv.width) % canv.width;
    this.y = (this.y + canv.height) % canv.height;
  }

  render()
  {
    ctx.strokeRect(this.x - half_cell, this.y - half_cell, cell_size, cell_size);
    for (let i = 0, l = this.tail.length; i < l; i++)
    {
      ctx.strokeRect(this.tail[i][0] - half_cell, this.tail[i][1] - half_cell, cell_size, cell_size);
    }
  }
}

class Apple
{
  constructor()
  {
    this.x = canv.width * Math.random();
    this.y = canv.height * Math.random();
  }

  respawn()
  {
    this.x = canv.width * Math.random();
    this.y = canv.height * Math.random();
  }

  render()
  {
    ctx.beginPath();
    ctx.arc(this.x, this.y, half_cell, 0, two_PI);
    ctx.closePath();
    ctx.stroke();
  }
}

function update_canv_size()
{
  canv.width  = div_main.clientWidth;
  canv.height = div_main.clientHeight;

  ctx.font      = "bold 20px monospace";
  ctx.lineWidth = 2;
}

function update()
{
  nake.update();
  if (!(
    nake.x - half_cell > apple.x + half_cell ||
    nake.x + half_cell < apple.x - half_cell ||
    nake.y - half_cell > apple.y + half_cell ||
    nake.y + half_cell < apple.y - half_cell
  )) {
    apple.respawn();
    nake.tail.push([nake.x, nake.y]);
  }
}

function render()
{
  ctx.fillStyle   = crnt_colors.fg;
  ctx.strokeStyle = crnt_colors.fg;
  ctx.clearRect(0, 0, canv.width, canv.height);
  apple.render();
  nake.render();
  ctx.fillText(`fps:   ${fps.toString().padStart(2, '0')}`, canv.width - 150, canv.height - 60);
  ctx.fillText(`score: ${nake.tail.length.toString().padStart(2, '0')}`, canv.width - 150, canv.height - 30);
}

function main(time)
{
  time_delta = time - time_prev;
  time_prev  = time;

  if (time_counter > fpm) {
    update();
    render();
    time_counter = 0;
  } else {
    time_counter += time_delta;
  }

  window.requestAnimationFrame(main);
}

update_canv_size();
window.addEventListener("resize", () => {
  update_canv_size();
  apple.respawn();
});

window.addEventListener("keydown", (event) => {
  switch (event.key)
  {
    case "ArrowLeft":
    if (crnt_key != "ArrowRight") crnt_key = "ArrowLeft";
    break;

    case "ArrowRight":
    if (crnt_key != "ArrowLeft") crnt_key = "ArrowRight";
    break;

    case "ArrowUp":
    if (crnt_key != "ArrowDown") crnt_key = "ArrowUp";
    break;

    case "ArrowDown":
    if (crnt_key != "ArrowUp") crnt_key = "ArrowDown";
    break;

    case '+':
    fps++;
    fpm = 1000 / fps;
    break;

    case '-':
    if (fps > 1) fps--;
    fpm = 1000 / fps;
    break;
  }
});

const nake  = new Nake();
const apple = new Apple();

function init()
{
  window.requestAnimationFrame(main);
}

export { init }
