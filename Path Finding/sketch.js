let vw = 1300;
let vh = 1300;
let grid = [];
let path = [];
let x;
let y;
let begin = [1, 1];
let end = [19, 19];
let START = '#5B2333';
let END = '#F0A202';
let CURRENT = '#05E9FF';
let PATH = '#BA1B1D';
let EMPTY = '#F7F4F3';
let WALL = '#564D4A';

let k = 0;

let lastX = [];
let lastY = [];

function setup() {
  frameRate();
  grid = newGrid(grid);
  grid[begin[0]][begin[1]] = 0;

  posVals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  end = [random(posVals),random(posVals)];
  print(end);

  grid[end[0]][end[1]] = 0;

  x = begin[0];
  y = begin[1];
  lastX[0] = x;
  lastY[1] = y;
  for (i = 0; i<20; i++) {
    path.push(1);
    path[i]= new Array(20);
    for (j = 0; j<20; j++) {
      path[i][j] = 0;
    }
  }
  path[1][1] = 1;
  rectMode(CORNER);
  print(grid);
  createCanvas(vw, vh);
}

function draw() {
  background(EMPTY);
  noStroke();
  fill(WALL);

  if (x == end[0] && y == end[1]) {
  } else {
    pathFind();
  }

  illustrate();
}

function pathFind() {
  notMoved = true;
  newAvailable = newGround();

  while (notMoved == true) {
    rand = random([1, 2, 3, 4])
    if (newAvailable == true) {
      if (rand == 1 && grid[x][y+1] == 0 && path[x][y+1] == 0) {
        path[x][y+1] = 1;
        y++;
        notMoved = false;
      }
      if (rand == 2 && grid[x+1][y] == 0 && path[x+1][y] == 0) {
        path[x+1][y] = 1;
        x++;
        notMoved = false;
      }
      if (rand == 3 && grid[x][y-1] == 0 && path[x][y-1] == 0) {
        path[x][y-1] = 1;
        y--;
        notMoved = false;
      }
      if (rand == 4 && grid[x-1][y] == 0 && path[x-1][y] == 0) {
        path[x-1][y] = 1;
        x--;
        notMoved = false;
      }
    } else {
      [x, y] = findAvailable();
      notMoved = false;
    }
  }
}

function findAvailable() {
  for (i = 1; i<=18; i++) {
    for (j = 1; j<=18; j++) {
      x = i;
      y = j;
      if (newGround() && path[x][y] == 1) {
        return [x, y];
      }
    }
  }
  return [end[0], end[1]];
}

function newGround() {
  if ((grid[x][y+1] == 0 && path[x][y+1] == 0) || (grid[x+1][y] == 0 && path[x+1][y] == 0) || (grid[x][y-1] == 0 && path[x][y-1] == 0) || (grid[x-1][y] == 0 && path[x-1][y] == 0)) {
    return true;
  } else {
    return false;
  }
}

function illustrate() {
  for (i = 0; i<20; i++) {
    for (j = 0; j<20; j++) {
      if(path[i][j] == 1) {
        push();
        fill(PATH);
        if (i == x && y == j) {
          fill(CURRENT);
        }
        rect(i*vw/20, j*vh/20, vw/20, vh/20);
        pop();
      }
    }
  }

  for (i = 0; i<20; i++) {
    for (j = 0; j<20; j++) {
      if(grid[i][j] == 1) {
        rect(i*vw/20, j*vh/20, vw/20, vh/20);
      }
    }
  }

  push();
  fill(START);
  rect(begin[0]*vw/20, begin[1]*vh/20, vw/20, vh/20);
  fill(END);
  rect(end[0]*vw/20, end[1]*vh/20, vw/20, vh/20);
  pop();
}

function newGrid(theGrid) {
  for (i = 0; i<20; i++) {
    theGrid.push(1);
    theGrid[i] = Array(19);
    for (j = 0; j<20; j++) {
      x = random(0, 3);
      if (x <= 1) {
        theGrid[i][j] = 1;
      } else {
        theGrid[i][j] = 0;
      }
    }
  }

  theGrid[0] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  theGrid[19] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  for (i = 0; i<20; i++) {
    theGrid[i][0] = 1;
    theGrid[i][19] = 1;
  }

  print(theGrid);
  return theGrid;
} 