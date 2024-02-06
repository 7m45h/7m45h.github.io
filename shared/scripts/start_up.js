import { setTime } from "./clock.js";
import { prefersDark, setThemeAuto, setThemeManual, themeSwitch } from "./color_manager.js";

document.addEventListener("DOMContentLoaded", () => {
  setThemeAuto();
  setTime();

  prefersDark.addEventListener("change", setThemeAuto);
  themeSwitch.addEventListener("click", setThemeManual);
  window.setInterval(setTime, 60000);
});
