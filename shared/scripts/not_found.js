const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const colors = ["#be5046", "#98c379", "#d19a66", "#61afef", "#c678dd", "#56b6c2", "#abb2bf"];
const msg = "404";
const msgW = 175;
let msgc = colors[Math.floor(Math.random() * colors.length)];
let msgx = canv.width/2;
let msgy = canv.height/2;
let msgvx = Math.round(Math.random()) ? 2 : -2;
let msgvy = Math.round(Math.random()) ? 1 : -1;
let boundR = canv.width - msgW;

function updateCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  boundR = canv.width - msgW;
  ctx.font = "100px monospace";
  ctx.fillStyle = msgc;
}

function main() {
  if (msgx < -10 || msgx > boundR) { msgvx *= -1; msgc = colors[Math.floor(Math.random() * colors.length)]; }
  if (msgy < 70 || msgy > canv.height) { msgvy *= -1; msgc = colors[Math.floor(Math.random() * colors.length)]; }
  
  msgx += msgvx;
  msgy += msgvy;
  
  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.fillStyle = msgc;
  ctx.fillText(msg, msgx, msgy);
  
  window.requestAnimationFrame(main);
}

updateCanv();

msgx = canv.width/2 - msgW;
msgy = canv.height/2;

window.addEventListener("resize", updateCanv);

window.requestAnimationFrame(main);
