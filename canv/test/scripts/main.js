const _canv = document.querySelector("canvas");
const _ctx = _canv.getContext("2d");

function scaleCanv() {
  _canv.width = window.innerWidth;
  _canv.height = window.innerHeight;
}

function drawCircle() {
  _ctx.strokeStyle = "white";
  _ctx.beginPath();
  _ctx.arc( _canv.width/2, _canv.height/2, 5, 0, Math.PI * 2 );
  _ctx.closePath();
  _ctx.stroke();
}

scaleCanv();
drawCircle();

window.addEventListener("resize", () => {
  scaleCanv();
  drawCircle();
});
