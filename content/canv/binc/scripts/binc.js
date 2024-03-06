const div_main = document.querySelector("main");
const canv     = document.querySelector("canvas");
const ctx      = canv.getContext("2d");

const two_PI        = Math.PI * 2;
const bit_count_r   = 6;
const bit_count_c   = 3;
const bit_size      = 20;
const bit_gap       = 10;
const bit_size_two  = bit_size * 2 + bit_gap;
const grid_width    = bit_size_two * bit_count_r;
const grid_height   = bit_size_two * bit_count_c;
const clock = [ [], [], [], ];

let bit_offset_x = 0;
let bit_offset_y = 0;

function calc_bit_offset()
{
  bit_offset_x = canv.width * 0.5 - grid_width * 0.5 + bit_size;
  bit_offset_y = canv.height * 0.5 - grid_height * 0.5 + bit_size;
}

function update_clock()
{
  const crnt_time = new Date();
  clock[0] = crnt_time.getHours().toString(2).padStart(6, 0).split('');
  clock[1] = crnt_time.getMinutes().toString(2).padStart(6, 0).split('');
  clock[2] = crnt_time.getSeconds().toString(2).padStart(6, 0).split('');
}

function draw_clock()
{
  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.fillStyle   = color_fg;
  ctx.strokeStyle = color_fg;
  ctx.lineWidth   = 2;

  for (let r = 0; r < bit_count_c; r++)
  {
    for (let c = 0; c < bit_count_r; c++)
    {
      ctx.beginPath();
      ctx.arc((c * bit_size_two) + bit_offset_x, (r * bit_size_two) + bit_offset_y, bit_size, 0, two_PI);
      ctx.closePath();
      ctx.stroke();
      if (clock[r][c] == "1")
      {
        ctx.fill();
      }
    }
  }
}

function update_canv_size()
{
  canv.width = div_main.clientWidth;
  canv.height = div_main.clientHeight;
}
update_canv_size();
calc_bit_offset();
function main()
{
  update_clock();
  draw_clock();
  window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);
