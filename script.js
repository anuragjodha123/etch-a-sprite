//const { performance } = require('perf_hooks');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.height, canvas.width);


let grid = [];
for (let i = 0; i < canvas.width; i++) {
  let newArr = [];
  for (let j = 0; j < canvas.height; j++) {
    let path = new Path2D();

    ctx.fillStyle = "#fff";
    path.rect(i, j, 1, 1);
    // console.log('me running');

    ctx.fill(path);
    newArr.push(path);
  }
  grid.push(newArr);
}


canvas.addEventListener("click", (e) => {
  const startTime = performance.now()
  // // console.log(e.clientX, e.clientY);
  // for (let i = 0; i < grid.length; i++) {
  //   for (let j = 0; j < grid[i].length; j++) {
  //     const isPointInPath = ctx.isPointInPath(grid[i][j], e.offsetX, e.offsetY);
  //     //console.log(e.offsetX, e.offsetY);
  //     if (isPointInPath) {
  //       //console.log("i'm running too");
  //       ctx.fillStyle = "red";
  //       ctx.fill(grid[i][j]);
  //       i = grid.length;
  //       break;
  //     }
  //   }
  // }

  let gridX = Math.abs(Math.floor(e.offsetX/5));
  let gridY = Math.abs(Math.floor(e.offsetY/5));
  const isPointInPath = ctx.isPointInPath(grid[gridX][gridY], e.offsetX, e.offsetY);
  if (isPointInPath) {
    ctx.fillStyle = "red";
    ctx.fill(grid[gridX][gridY]);
  }

  console.log(isPointInPath);
  const endTime = performance.now()
  console.log(`${endTime - startTime} milliseconds`)
})


ctx.scale(5,5);
// check if clicked inside canvas
// if yes -> loop through the paths array and check which path clicked
// change the color of the path
// redraw the path in the same location
