const theme_switch_btn = document.getElementById("theme-switch-btn");

const crnt_colors = { "fb": "#000000", "bg": "#000000" };
document.documentElement.style.setProperty("--color-fb", crnt_colors.fb);

function set_random_bg_color()
{
  crnt_colors.bg = `hsl(${Math.round(Math.random() * 360)}deg, 70%, 50%)`;
  document.documentElement.style.setProperty("--color-bg", crnt_colors.bg);
}

theme_switch_btn.addEventListener("click", set_random_bg_color);

set_random_bg_color();
