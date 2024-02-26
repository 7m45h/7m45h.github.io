const theme_switch_btn = document.getElementById("theme-switch-btn");
const match_dark_theme = window.matchMedia("(prefers-color-scheme: dark)");

let crnt_theme = "dark";
let color_fg = "#ffffff";
let color_bg = "#000000";

match_dark_theme.addEventListener("change", () => {
  if (match_dark_theme.matches) {
    document.documentElement.style.setProperty("color-scheme", "only dark");
    crnt_theme = "dark";
    color_fg = "#ffffff";
    color_bg = "#000000";
  } else {
    document.documentElement.style.setProperty("color-scheme", "only light");
    crnt_theme = "light";
    color_fg = "#000000";
    color_bg = "#ffffff";
  }
})

theme_switch_btn.addEventListener("click", () => {
  if (crnt_theme == "dark") {
    document.documentElement.style.setProperty("color-scheme", "only light");
    crnt_theme = "light";
    color_fg = "#000000";
    color_bg = "#ffffff";
  } else {
    document.documentElement.style.setProperty("color-scheme", "only dark");
    crnt_theme = "dark";
    color_fg = "#ffffff";
    color_bg = "#000000";
  }
});
