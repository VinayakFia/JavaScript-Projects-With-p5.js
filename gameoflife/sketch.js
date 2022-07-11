const VW = 1200;
const VH = 1200;
let RESOLUTION = 1;
let BACK_COLOUR; 
let CELL_COLOUR_BORN; 
let CELL_COLOUR_OLD; 
let GRID_COLOUR;
let grid;
let vwdivres = VW / RESOLUTION;
let vhdivres = VH / RESOLUTION;
let button;

function setup() {
  button = createButton('Reset');
  button.position(50, VH + 310);
  button.mousePressed(reset);
  setupGrid();
  BACK_COLOUR = color(3, 3, 1);
  CELL_COLOUR_OLD = [255, 67, 101];
  CELL_COLOUR_BORN = [CELL_COLOUR_OLD[0] / 2, CELL_COLOUR_OLD[1] / 2, CELL_COLOUR_OLD[2] / 2];
  //CELL_COLOUR_OLD = [254, 155, 255];
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

function reset() {
  setupGrid();
  randomFill();
}
