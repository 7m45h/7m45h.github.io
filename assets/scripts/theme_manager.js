const theme_switch_btn = document.getElementById("theme-switch-btn");

const crnt_colors = { "fb": "#000000", "bg": "#000000" };

function set_random_bg_color()
{
  let rand_h = Math.round(Math.random() * 360);
  let rand_s = 70;
  let rand_l = 60;
  crnt_colors.bg = `hsl(${rand_h}deg, ${rand_s}%, ${rand_l}%)`;
}

function update_document_colors()
{
  document.documentElement.style.setProperty("--color-fb", crnt_colors.fb);
  document.documentElement.style.setProperty("--color-bg", crnt_colors.bg);
}

function handle_theme_switch_btn()
{
  set_random_bg_color();
  update_document_colors();
  window.sessionStorage.setItem("color_bg", crnt_colors.bg);
}

function init()
{
  crnt_colors.bg = window.sessionStorage.getItem("color_bg");
  if (crnt_colors.bg == null) set_random_bg_color();
  theme_switch_btn.addEventListener("click", handle_theme_switch_btn);
  update_document_colors();
}

init();
