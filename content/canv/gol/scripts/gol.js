import * as theme_manager from "assets/scripts/theme_manager";

const div_main = document.querySelector("main");
const canv     = document.querySelector("canvas");
const ctx      = canv.getContext("2d");

let cell_size       = 10;
let cell_gap        = 4;
let cell_gap_half   = cell_gap * 0.5
let cell_area       = cell_size + cell_gap;

let next_grid    = null;
let crnt_grid    = null;
let grid_start_x = 0;
let grid_start_y = 0;

let neighbor_count = 0;
let row_prev       = 0;
let row_next       = 0;
let col_prev       = 0;
let col_next       = 0;

let reset_button = false;
let change_cell_size = null;

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
  cell_gap      = cell_size < 4 ? (cell_size == 1 ? cell_gap = 0 : 1) : 4;
  cell_gap_half = cell_gap > 0 ? cell_gap * 0.5 : 0;
  cell_area     = cell_size + cell_gap;

  let row_count = Math.floor(canv.height / cell_area);
  let col_count = Math.floor(canv.width / cell_area);

  grid_start_x = (canv.width % cell_area) * 0.5 + cell_gap_half;
  grid_start_y = (canv.height % cell_area) * 0.5 + cell_gap_half;

  crnt_grid = new Array(row_count);
  next_grid = new Array(row_count);

  for (let r = 0; r < row_count; r++)
  {
    crnt_grid[r] = new Array(col_count);
    next_grid[r] = new Array(col_count);
    for (let c = 0; c < col_count; c++)
    {
      crnt_grid[r][c] = Math.round(Math.random());
    }
  }
}

function update_grid()
{
  for (let r = 0; r < crnt_grid.length; r++)
  {
    row_prev = ((r - 1) + crnt_grid.length) % crnt_grid.length;
    row_next = (r + 1) % crnt_grid.length;
    for (let c = 0; c < crnt_grid[r].length; c++)
    {
      col_prev = ((c - 1) + crnt_grid[r].length) % crnt_grid[r].length;
      col_next = (c + 1) % crnt_grid[r].length;

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
          next_grid[r][c] = 1;
        }
        else
        {
          next_grid[r][c] = 0;
        }
      }
      else
      {
        if (neighbor_count == 3)
        {
          next_grid[r][c] = 1;
        }
        else
        {
          next_grid[r][c] = 0;
        }
      }
    }
  }

  for (let r = 0; r < next_grid.length; r++)
  {
    for (let c = 0; c < next_grid[r].length; c++)
    {
      crnt_grid[r][c] = next_grid[r][c];
    }
  }
}

function render_grid()
{
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
  ctx.fillStyle = theme_manager.crnt_colors.fg;
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

  switch (change_cell_size)
  {
    case "up":
      cell_size++;
      change_cell_size = null;
      generate_grid();
      break;
    case "down":
      cell_size > 1 ? cell_size-- : cell_size = 1;
      change_cell_size = null;
      generate_grid();
      break;
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
  window.addEventListener("keydown", (event) => {
    switch (event.key)
    {
      case 'r':
        reset_button = true;
        break;
      case '+':
        change_cell_size = "up";
        break;
      case '-':
        change_cell_size = "down";
        break;
    }
  });
  window.requestAnimationFrame(main);
}

theme_manager.init();
init();
