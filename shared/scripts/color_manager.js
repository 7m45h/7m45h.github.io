const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const themeSwitch = document.getElementById("theme-switch-btn");
const bodyElement = document.querySelector("body");

let curntTheme = "dark";

function setTheme() {
  if (prefersDark.matches) {
    curntTheme = "dark";
    bodyElement.classList.replace("theme-light", "theme-dark");
  } else {
    curntTheme = "light";
    bodyElement.classList.replace("theme-dark", "theme-light");
  }
}

function setThemeManual() {
  if (curntTheme == "light") {
    curntTheme = "dark";
    bodyElement.classList.replace("theme-light", "theme-dark");
  } else if (curntTheme == "dark"){
    curntTheme = "light";
    bodyElement.classList.replace("theme-dark", "theme-light");
  }
}

export { prefersDark, themeSwitch, setTheme, setThemeManual };
