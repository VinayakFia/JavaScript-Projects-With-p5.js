function setupGrid() {
  grid = Array(VW / RESOLUTION).fill().map(() => Array(VH / RESOLUTION).fill(0));
  return;
}

function gradient(curStep) {
  let cuffed = (curStep - 1) / 5;
  if (curStep > 1) curStep = 1;
  return color(
    CELL_COLOUR_BORN[0] * (1 - cuffed) + CELL_COLOUR_OLD[0] * cuffed,
    CELL_COLOUR_BORN[1] * (1 - cuffed) + CELL_COLOUR_OLD[1] * cuffed,
    CELL_COLOUR_BORN[2] * (1 - cuffed) + CELL_COLOUR_OLD[2] * cuffed
  );
}

function renderCells() {
  for (let x = 0; x < VW / RESOLUTION; x++) {
    for (let y = 0; y < VH / RESOLUTION; y++) {
      push();
      noStroke();
      if (grid[x][y] == 1) {
        fill(gradient(numNeighbors(x, y)));
        circle(x * RESOLUTION + RESOLUTION / 2, y * RESOLUTION + RESOLUTION / 2, RESOLUTION)
        //rect(x * RESOLUTION, y * RESOLUTION, RESOLUTION, RESOLUTION);
      }
      pop();
    }
  }
  return;
}

function renderGrid() {
  for (let x = 0; x < VW / RESOLUTION; x++) {
    push();
    strokeWeight(0.5);
    stroke(GRID_COLOUR);
    line(x * RESOLUTION, 0, x * RESOLUTION, VH)
    pop();
  }
  for (let y = 0; y < VH / RESOLUTION; y++) {
    push();
    strokeWeight(0.5);
    stroke(GRID_COLOUR);
    line(0, y * RESOLUTION, VW, y * RESOLUTION)
    pop();
  }
  return;
}

function randomFill() {
  for (let x = 0; x < VW / RESOLUTION; x++) {
    for (let y = 0; y < VH / RESOLUTION; y++) {
      if (random(0, 10) > 8) {
        grid[x][y] = 1;
      }
    }
  }
  return;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function numNeighbors(x, y) {
  let neighbours = 0;
  //console.log(x, y);
  if (grid[mod(x-1, vwdivres)][y] >= 1) {
    neighbours++;
  }
  if (grid[x][mod(y - 1, vhdivres)] >= 1) {
    neighbours++;
  }
  if (grid[mod(x + 1, vwdivres)][y] >= 1) {
    neighbours++;
  }
  if (grid[x][mod(y + 1, vhdivres)] >= 1) {
    neighbours++;
  }
  if (grid[mod(x - 1, vwdivres)][mod(y - 1, vhdivres)] >= 1) {
    neighbours++;
  }
  if (grid[mod(x + 1, vwdivres)][mod(y - 1, vhdivres)] >= 1) {
    neighbours++;
  }
  if (grid[mod(x - 1, vwdivres)][mod(y + 1, vhdivres)] >= 1) {
    neighbours++;
  }
  if (grid[mod(x + 1, vwdivres)][mod(y + 1, vhdivres)] >= 1) {
    neighbours++;
  }
  return neighbours;
}

function step() {
  let newGrid = Array(VW / RESOLUTION).fill().map(() => Array(VH / RESOLUTION).fill(0));
  for (let x = 0; x < VW / RESOLUTION; x++) {
    for (let y = 0; y < VH / RESOLUTION; y++) {
      let neighbours = numNeighbors(x, y);
      if (grid[x][y] >= 1) {
        if (neighbours == 2 || neighbours == 3) {
          newGrid[x][y] = grid[x][y] + 1;
        }
      }
      if (grid[x][y] == 0 && neighbours == 3) {
        newGrid[x][y] = 1;
      }
    }
  }
  grid = newGrid;
  return;
}
