const canv = document.querySelector("canvas");
const ctx = canv.getContext("2d");

const gridSize = 24;
const cellSize = gridSize/2 - 4;
const twoPI = Math.PI * 2;

const fps = 1000/1;

let dltaT = 0;
let lastT = 0;
let timeC = 0;

const grid = [0, 0];
const ipos = [0, 0];
let cells = [];

function updateCanv() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;

  grid[0] = (canv.width - (canv.width % gridSize)) / gridSize;
  grid[1] = (canv.height - (canv.height % gridSize)) / gridSize;
  ipos[0] = (canv.width % gridSize) / 2 + gridSize / 2;
  ipos[1] = (canv.height % gridSize) / 2 + gridSize / 2;

  cells = [];

  for (let r = 0; r < grid[1]; r++) {
    cells.push([]);
    for (let c = 0; c < grid[0]; c++) {
      cells[r].push([]);
      cells[r][c].push(Math.round(Math.random()));
      cells[r][c].push(cells[r][c][0]);
    }
  }
}

function updateEnv() {
  let neighbours = 0;
  for (let r = 0; r < grid[1]; r++) for (let c = 0; c < grid[0]; c++) cells[r][c][1] = cells[r][c][0];
  
  for (let r = 0; r < grid[1]; r++) {
    for (let c = 0; c < grid[0]; c++) {
      neighbours = 0;
      neighbours += cells[ (r + grid[1] - 1) % grid[1] ][ (c + grid[0] - 1) % grid[0] ][1];
      neighbours += cells[ (r + grid[1] - 1) % grid[1] ][  c                          ][1];
      neighbours += cells[ (r + grid[1] - 1) % grid[1] ][ (c + grid[0] + 1) % grid[0] ][1];
      neighbours += cells[  r                          ][ (c + grid[0] - 1) % grid[0] ][1];
      neighbours += cells[  r                          ][ (c + grid[0] + 1) % grid[0] ][1];
      neighbours += cells[ (r + grid[1] + 1) % grid[1] ][ (c + grid[0] - 1) % grid[0] ][1];
      neighbours += cells[ (r + grid[1] + 1) % grid[1] ][  c                          ][1];
      neighbours += cells[ (r + grid[1] + 1) % grid[1] ][ (c + grid[0] + 1) % grid[0] ][1];
      
      if (cells[r][c][1] && (neighbours == 2 || neighbours == 3)) cells[r][c][0] = 1;
      else if (!cells[r][c][1] && neighbours == 3) cells[r][c][0] = 1;
      else cells[r][c][0] = 0;
    }
  }
}

function renderEnv() {
  ctx.clearRect(0, 0, canv.width, canv.height);

  ctx.save();
  ctx.fillStyle = "#abb2bf";
  for (let r = 0; r < grid[1]; r++) {
    for (let c = 0; c < grid[0]; c++) {
      if (cells[r][c][0]) {
        ctx.beginPath();
        ctx.arc(ipos[0] + gridSize * c, ipos[1] + gridSize * r, cellSize, 0, twoPI);
        ctx.fill();
      }
    }
  }
  ctx.restore();
}

function main(t) {
  dltaT = t - lastT;
  lastT = t;

  if (timeC > fps) {
    updateEnv();
    renderEnv();
    timeC = 0;
  } else {
    timeC += dltaT;
  }

  //updateEnv();
  //renderEnv();
  
  window.requestAnimationFrame(main);
}

updateCanv();

window.addEventListener("resize", updateCanv);

window.requestAnimationFrame(main);
