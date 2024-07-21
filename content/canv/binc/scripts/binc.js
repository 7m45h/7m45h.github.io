import * as theme_manager from "assets/scripts/theme_manager";

const div_main = document.querySelector("main");
const canv     = document.querySelector("canvas");
const ctx      = canv.getContext("2d");

const two_PI              = Math.PI * 2;
const bit_size_r          = 20;
const bit_gap             = 10;
const bit_gap_half        = bit_gap * 0.5;
const bit_size_d          = bit_size_r * 2 + bit_gap;
const clock_row_bit_count = 6;
const clock_col_bit_count = 3;
const clock_grid_width    = clock_row_bit_count * bit_size_d;
const clock_grid_height   = clock_col_bit_count * bit_size_d;

let clock_bit_offset_x = 0;
let clock_bit_offset_y = 0;

const time_in_bits = ["", "", ""];

function fit_canv()
{
  canv.width  = div_main.clientWidth;
  canv.height = div_main.clientHeight;
}

function calc_clock_bit_offset()
{
  clock_bit_offset_x = canv.width * 0.5 - clock_grid_width * 0.5 + bit_size_r + bit_gap_half;
  clock_bit_offset_y = canv.height * 0.5 - clock_grid_height * 0.5 + bit_size_r + bit_gap_half;
}

function handle_resize()
{
  fit_canv();
  calc_clock_bit_offset();
  ctx.lineWidth = 2;
}

function int_to_bits(int)
{
  return int.toString(2).padStart(6, 0);
}

function update_clock()
{
  const crnt_date = new Date();
  time_in_bits[0] = int_to_bits(crnt_date.getHours());
  time_in_bits[1] = int_to_bits(crnt_date.getMinutes());
  time_in_bits[2] = int_to_bits(crnt_date.getSeconds());
}

function render_clock()
{
  ctx.fillStyle   = theme_manager.crnt_colors.fg;
  ctx.strokeStyle = theme_manager.crnt_colors.fg;
  ctx.clearRect(0, 0, canv.width, canv.height);
  for (let r = 0; r < clock_col_bit_count; r++)
  {
    for (let c = 0; c < clock_row_bit_count; c++)
    {
      ctx.beginPath();
      ctx.arc(c * bit_size_d + clock_bit_offset_x, r * bit_size_d + clock_bit_offset_y, bit_size_r, 0, two_PI);
      ctx.closePath();
      if (time_in_bits[r][c] == "1") {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}

function main()
{
  update_clock();
  render_clock();
  window.requestAnimationFrame(main);
}

function init()
{
  handle_resize()
  window.addEventListener("resize", handle_resize);
  window.requestAnimationFrame(main);
}

theme_manager.init();
init();
