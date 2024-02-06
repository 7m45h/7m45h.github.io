import { setTime } from "./clock.js";

document.addEventListener("DOMContentLoaded", () => {
  setTime();
  window.setInterval(setTime, 60000);
});
