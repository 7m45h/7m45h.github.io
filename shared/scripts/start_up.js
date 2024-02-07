import { prefersDark, setThemeAuto, setThemeManual, themeSwitch } from "./color_manager.js";

setThemeAuto();

prefersDark.addEventListener("change", setThemeAuto);
themeSwitch.addEventListener("click", setThemeManual);
