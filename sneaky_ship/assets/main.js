// MAIN

const _canv = document.getElementById("canvas");
const _ctx = _canv.getContext("2d");

_ctx.fillStyle = "red";

function updateEnv() {
}

function renderEnv() {
    _ctx.clearRect( 0, 0, _canv.width, _canv.height );
    _ctx.fillRect( 10, 10, 10, 10 );
}

function main() {
    updateEnv();
    renderEnv();
    // window.requestAnimationFrame(main);
}

main();
