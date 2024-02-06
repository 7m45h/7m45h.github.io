import { setTime } from "./clock.js";
import { prefersDark, setTheme, setThemeManual, themeSwitch } from "./color_manager.js";

document.addEventListener("DOMContentLoaded", () => {
  setTheme();
  setTime();

  prefersDark.addEventListener("change", setTheme);
  themeSwitch.addEventListener("click", setThemeManual)
  window.setInterval(setTime, 60000);
});
