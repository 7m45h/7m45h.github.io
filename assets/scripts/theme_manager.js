const theme_switch_btn = document.getElementById("theme-switch-btn");

const crnt_colors = { "fb": "#000000", "bg": "#000000" };
document.documentElement.style.setProperty("--color-fb", crnt_colors.fb);

function set_random_bg_color()
{
  let rand_h =  Math.round(Math.random() * 360);
  let rand_s = (Math.round(Math.random() * 40) + 60); // 70%
  let rand_l = (Math.round(Math.random() * 50) + 50); // 60%
  crnt_colors.bg = `hsl(${rand_h}deg, ${rand_s}%, ${rand_l}%)`;
  document.documentElement.style.setProperty("--color-bg", crnt_colors.bg);
}

theme_switch_btn.addEventListener("click", set_random_bg_color);

set_random_bg_color();
