const div_main = document.querySelector("main");
const canv     = document.querySelector("canvas");
const ctx      = canv.getContext("2d");

const cell_size     = 10;
const cell_gap      = 4;
const cell_gap_half = cell_gap * 0.5
const cell_area     = cell_size + cell_gap;

let next_grid    = [];
let crnt_grid    = [];
let grid_start_x = 0;
let grid_start_y = 0;

let neighbor_count = 0;
let row_prev       = 0;
let row_next       = 0;
let col_prev       = 0;
let col_next       = 0;

let reset_button = false;

const fps        = 1000 / 10;
let delta_time   = 0;
let prev_time    = 0;
let time_counter = 0;

function fit_canv()
{
  canv.width  = div_main.clientWidth;
  canv.height = div_main.clientHeight;
}

function generate_grid()
{
  let row_count = Math.floor(canv.height / cell_area);
  let col_count = Math.floor(canv.width / cell_area);

  grid_start_x = (canv.width % cell_area) * 0.5 + cell_gap_half;
  grid_start_y = (canv.height % cell_area) * 0.5 + cell_gap_half;

  crnt_grid = [];

  for (let r = 0; r < row_count; r++)
  {
    crnt_grid.push([]);
    for (let c = 0; c < col_count; c++)
    {
      crnt_grid[r].push(Math.round(Math.random()));
    }
  }
}

function update_grid()
{
  next_grid = [];

  for (let r = 0; r < crnt_grid.length; r++)
  {
    row_prev = ((r - 1) + crnt_grid.length) % crnt_grid.length;
    row_next = ((r + 1) + crnt_grid.length) % crnt_grid.length;
    next_grid.push([]);
    for (let c = 0; c < crnt_grid[r].length; c++)
    {
      col_prev = ((c - 1) + crnt_grid[r].length) % crnt_grid[r].length;
      col_next = ((c + 1) + crnt_grid[r].length) % crnt_grid[r].length;

      neighbor_count = 0;
      neighbor_count += crnt_grid[row_prev][col_prev];
      neighbor_count += crnt_grid[row_prev][       c];
      neighbor_count += crnt_grid[row_prev][col_next];
      neighbor_count += crnt_grid[       r][col_prev];
      neighbor_count += crnt_grid[       r][col_next];
      neighbor_count += crnt_grid[row_next][col_prev];
      neighbor_count += crnt_grid[row_next][       c];
      neighbor_count += crnt_grid[row_next][col_next];

      if (crnt_grid[r][c])
      {
        if (neighbor_count == 2 || neighbor_count == 3)
        {
          next_grid[r].push(1);
        }
        else
        {
          next_grid[r].push(0);
        }
      }
      else
      {
        if (neighbor_count == 3)
        {
          next_grid[r].push(1);
        }
        else
        {
          next_grid[r].push(0);
        }
      }
    }
  }

  crnt_grid = next_grid;
}

function render_grid()
{
  ctx.fillStyle = color_fg;

  for (let r = 0; r < crnt_grid.length; r++)
  {
    for (let c = 0; c < crnt_grid[r].length; c++)
    {
      if (crnt_grid[r][c])
      {
        ctx.fillRect(cell_area * c + grid_start_x, cell_area * r + grid_start_y, cell_size, cell_size);
      }
    } 
  }
}

function render()
{
  ctx.clearRect(0, 0, canv.width, canv.height);
  render_grid();
}

function handle_window_resize()
{
  fit_canv();
  generate_grid();
}

function main(crnt_time)
{
  if (reset_button)
  {
    generate_grid();
    reset_button = false;
  }

  delta_time = crnt_time - prev_time;
  prev_time  = crnt_time;

  if (time_counter > fps)
  {
    update_grid();
    render();
    time_counter = 0;
  }
  else
  {
    time_counter += delta_time;
  }

  window.requestAnimationFrame(main);
}

function init()
{
  fit_canv();
  generate_grid();
  window.addEventListener("resize", handle_window_resize);
  window.addEventListener("keydown", (event) => { reset_button = event.key == "r"; });
  window.requestAnimationFrame(main);
}

init();
