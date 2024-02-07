import { prefersDark, setThemeAuto, setThemeManual, themeSwitch } from "./color_manager.js";

document.addEventListener("DOMContentLoaded", () => {
  setThemeAuto();

  prefersDark.addEventListener("change", setThemeAuto);
  themeSwitch.addEventListener("click", setThemeManual);
});
