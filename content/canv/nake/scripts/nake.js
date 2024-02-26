const div_main = document.querySelector("main");
const canv     = document.querySelector("canvas");
const ctx      = canv.getContext("2d");

const cell_size = 10;
const half_cell = cell_size * 0.5;
const two_PI    = Math.PI * 2;
const fps       = 1000 / 10;

let time_prev    = 0;
let time_delta   = 0;
let time_counter = 0;

let crnt_key = null;

class Nake
{
  static speed = cell_size;

  constructor()
  {
    this.x = canv.width * 0.5;
    this.y = canv.height * 0.5;
    this.tail = [];
  }

  update()
  {
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
  }

  render()
  {
    ctx.strokeRect(this.x, this.y, cell_size, cell_size);
    for (let i = 0, l = this.tail.length; i < l; i++) {
      ctx.strokeRect(this.tail[i][0], this.tail[i][1], cell_size, cell_size);
    }
  }
}

function update_canv_size()
{
  canv.width = div_main.clientWidth;
  canv.height = div_main.clientHeight;

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
}

function update()
{
  nake.update();
}

function render()
{
  ctx.clearRect(0, 0, canv.width, canv.height);
  nake.render();
}

function main(time)
{
  time_delta = time - time_prev;
  time_prev = time;

  if (time_counter > fps) {
    update();
    render();
    time_counter = 0;
  } else {
    time_counter += time_delta;
  }

  window.requestAnimationFrame(main);
}

update_canv_size();
window.addEventListener("resize", update_canv_size);
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
  }
});

const nake = new Nake();

window.requestAnimationFrame(main);
