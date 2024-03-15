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
let rp             = 0;
let rn             = 0;
let cp             = 0;
let cn             = 0;

let reset_button = false;

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
    rp = ((r - 1) + crnt_grid.length) % crnt_grid.length;
    rn = ((r + 1) + crnt_grid.length) % crnt_grid.length;
    next_grid.push([]);
    for (let c = 0; c < crnt_grid[r].length; c++)
    {
      cp = ((c - 1) + crnt_grid[r].length) % crnt_grid[r].length;
      cn = ((c + 1) + crnt_grid[r].length) % crnt_grid[r].length;

      neighbor_count = 0;
      neighbor_count += crnt_grid[rp][cp];
      neighbor_count += crnt_grid[rp][ c];
      neighbor_count += crnt_grid[rp][cn];
      neighbor_count += crnt_grid[ r][cp];
      neighbor_count += crnt_grid[ r][cn];
      neighbor_count += crnt_grid[rn][cp];
      neighbor_count += crnt_grid[rn][ c];
      neighbor_count += crnt_grid[rn][cn];

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

function main()
{
  if (reset_button)
  {
    generate_grid();
    reset_button = false;
  }
  update_grid();
  render();
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
