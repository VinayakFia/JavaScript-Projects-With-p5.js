const VW = 1200;
const VH = 1200;
let RESOLUTION = 10;
let BACK_COLOUR; 
let CELL_COLOUR_BORN; 
let CELL_COLOUR_OLD; 
let GRID_COLOUR;
let grid;
let vwdivres = VW / RESOLUTION;
let vhdivres = VH / RESOLUTION;

function setup() {
  setupGrid();
  BACK_COLOUR = color(3, 3, 1);
  CELL_COLOUR_BORN = [255, 67, 101];
  CELL_COLOUR_OLD = [254, 155, 255];
  GRID_COLOUR = color(100);
  randomFill();
  //console.log(grid);
  frameRate(60);
  createCanvas(VW, VH);
}

function draw() {
  background(3, 3, 1, 30);
  //renderGrid();
  renderCells();
  step();
}

function mouseClicked() {
  let x = floor(mouseX / RESOLUTION);
  let y = floor(mouseY / RESOLUTION);
  grid[x][y] = 1;
}
