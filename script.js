//const { performance } = require('perf_hooks');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const SCALING_FACTOR = 10;

ctx.canvas.width = canvas.width * SCALING_FACTOR;
ctx.canvas.height = canvas.height * SCALING_FACTOR;
ctx.scale(SCALING_FACTOR,SCALING_FACTOR);

let grid = [];
for (let i = 0; i < canvas.width; i++) {
  let newArr = [];
  for (let j = 0; j < canvas.height; j++) {
    let path = {shape: new Path2D(), fillStyle: "#fff"};

    ctx.fillStyle = path.fillStyle;
    path.shape.rect(i, j, 1, 1);
    ctx.fill(path.shape);

    newArr.push(path);
  }
  grid.push(newArr);
}

function isEquals(array1, array2) {
  return array1.every((value, index) => value === array2[index]);
}

let mouseHistory = [];
let mouseHistoryPath = [];
let startDrawing = false;

function draw(e, option) {
  const startTime = performance.now();

  let gridX = Math.abs(Math.floor(e.offsetX/SCALING_FACTOR));
  let gridY = Math.abs(Math.floor(e.offsetY/SCALING_FACTOR));
  const isPointInPath = ctx.isPointInPath(grid[gridX][gridY].shape, e.offsetX, e.offsetY);
  
  //to create the hover effect
  if (mouseHistory.length == 2) {
    mouseHistory.shift();
    mouseHistory.push([gridX, gridY]);
  } else {
    mouseHistory.push([gridX, gridY]);
  }

  
  if (isPointInPath) {
    let pastPath = grid[mouseHistory[0][0]][mouseHistory[0][1]];
    let currentPath = grid[mouseHistory[mouseHistory.length-1][0]][mouseHistory[mouseHistory.length-1][1]];
    ctx.fillStyle = "red";
    ctx.fill(currentPath.shape);
    
    if (startDrawing) {
      ctx.fillStyle = currentPath.fillStyle = "red";
    }

    if (mouseHistory.length == 2 && !isEquals(mouseHistory[0], mouseHistory[1]) && !startDrawing) {
      ctx.fillStyle = pastPath.fillStyle;
      ctx.fill(pastPath.shape)
    }
  }

  const endTime = performance.now()
}

document.addEventListener("mousedown", (e) => {
  startDrawing = true
});

//enables drawing pixels on click
canvas.addEventListener("mousedown", (e) => {
  startDrawing = true;
  draw(e)
});

canvas.addEventListener("mousemove", (e) => {
  draw(e);
})

document.addEventListener("mouseup", () => startDrawing = false);

// to remove the pixel left when mouse leaves the canvas during draw:mousemove
canvas.addEventListener("mouseleave", () => {
  if (startDrawing == false) {
    ctx.fillStyle = "white";
    ctx.fill(grid[mouseHistory[1][0]][mouseHistory[1][1]].shape)
  }
});


//ctx.clearRect(0, 0, canvas.height, canvas.width);