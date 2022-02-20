let vw = 1200;
let vh = 1200;
let grid = [];
let path = [];
let x;
let y;
let begin = [1, 1];
let end = [19, 19];
let START = '#5B2333';
let END = '#F0A202';
let CURRENT = '#D7263D';
let PATH = '#6B0504';
let EMPTY = '#F7F4F3';
let WALL = '#080A0D';

let k = 0;

let lastX = [];
let lastY = [];

function setup() {
  frameRate();
  grid = newGrid(grid);

  posVals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

  begin = [random(posVals),random(posVals)];
  grid[begin[0]][begin[1]] = 0;

  end = [random(posVals),random(posVals)];
  print(end);

  grid[end[0]][end[1]] = 0;
  
  grid[end[0]+1][end[1]] = 0;
  grid[end[0]+1][end[1]+1] = 0;
  grid[end[0]+1][end[1]-1] = 0;
  grid[end[0]][end[1]+1] = 0;
  grid[end[0]][end[1]-1] = 0;
  grid[end[0]-1][end[1]] = 0;
  grid[end[0]-1][end[1]+1] = 0;
  grid[end[0]-1][end[1]-1] = 0;

  grid[begin[0]+1][begin[1]] = 0;
  grid[begin[0]+1][begin[1]+1] = 0;
  grid[begin[0]+1][begin[1]-1] = 0;
  grid[begin[0]][begin[1]+1] = 0;
  grid[begin[0]][begin[1]-1] = 0;
  grid[begin[0]-1][begin[1]] = 0;
  grid[begin[0]-1][begin[1]+1] = 0;
  grid[begin[0]-1][begin[1]-1] = 0;

  x = begin[0];
  y = begin[1];
  for (i = 0; i<30; i++) {
    path.push();
    path[i] = new Array(30);
    for (j = 0; j<30; j++) {
      path[i][j] = 0;
    }
  }
  path[begin[0]][begin[1]] = 1;
  rectMode(CORNER);
  print(path);
  createCanvas(windowWidth, windowHeight);
  
  background(EMPTY);
}

function draw() {
  translate((windowWidth-vw)/2, (windowHeight-vh)/2);
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

  if (x+1 == end[0] && y == end[1]) {
    x++;
    notMoved = false;
  }
  if (x == end[0] && y+1 == end[1]) {
    y++;
    notMoved = false;
  }
  if (x-1 == end[0] && y == end[1]) {
    x--;
    notMoved = false;
  }
  if (x == end[0] && y-1 == end[1]) {
    y--;
    notMoved = false;
  }

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
  for (i = 1; i<=28; i++) {
    for (j = 1; j<=28; j++) {
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
  for (i = 0; i<30; i++) {
    for (j = 0; j<30; j++) {
      if(path[i][j] == 1) {
        push();
        fill(PATH);
        if (i == x && y == j) {
          fill(CURRENT);
        }
        
        rect(i*vw/30, j*vh/30, vw/30, vh/30);
        pop();
      }
    }
  }

  for (i = 0; i<30; i++) {
    for (j = 0; j<30; j++) {
      if(grid[i][j] == 1) {
        rect(i*vw/30, j*vh/30, vw/30, vh/30);
      }
    }
  }

  push();
  fill(START);
  rect(begin[0]*vw/30, begin[1]*vh/30, vw/30, vh/30);
  fill(END);
  rect(end[0]*vw/30, end[1]*vh/30, vw/30, vh/30);
  pop();
}

function newGrid(theGrid) {
  for (i = 0; i<30; i++) {
    theGrid.push(1);
    theGrid[i] = Array(30);
    for (j = 0; j<30; j++) {
      x = random(0, 3);
      if (x <= 1) {
        theGrid[i][j] = 1;
      } else {
        theGrid[i][j] = 0;
      }
    }
  }

  theGrid[0] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  theGrid[29] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  for (i = 0; i<30; i++) {
    theGrid[i][0] = 1;
    theGrid[i][29] = 1;
  }

  print(theGrid);
  return theGrid;
} 