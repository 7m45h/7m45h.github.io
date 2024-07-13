const theme_switch_btn  = document.getElementById("theme-switch-btn");
const prefer_dark_theme = window.matchMedia("(prefers-color-scheme: dark)");

const crnt_colors = {"theme": "dark", "fg": "#000000", "bg": "#000000" };

function toggle_theme_manual()
{
  crnt_colors.theme = crnt_colors.theme == "dark" ? "light" : "dark";
  update_colors();
}

function toggle_theme_auto()
{
  crnt_colors.theme = prefer_dark_theme.matches ? "dark" : "light";
  update_colors();
}

function update_colors()
{
  document.documentElement.style.setProperty("color-scheme", crnt_colors.theme);
  sessionStorage.setItem("theme", crnt_colors.theme);

  let styles = window.getComputedStyle(document.documentElement);
  if (crnt_colors.theme == "dark")
  {
    crnt_colors.fg = styles.getPropertyValue("--color-light");
    crnt_colors.bg = styles.getPropertyValue("--color-dark");
  }
  else
  {
    crnt_colors.fg = styles.getPropertyValue("--color-dark");
    crnt_colors.bg = styles.getPropertyValue("--color-light");
  }
}

function init()
{
  crnt_colors.theme = sessionStorage.getItem("theme");
  if (crnt_colors.theme) update_colors(); else toggle_theme_auto();
  theme_switch_btn.addEventListener("click", toggle_theme_manual);
  prefer_dark_theme.addEventListener("change", toggle_theme_auto);
}

export { crnt_colors, init }
