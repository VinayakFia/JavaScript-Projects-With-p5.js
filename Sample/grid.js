function setupGrid() {
  grid = Array(VW / RESOLUTION).fill().map(() => Array(VH / RESOLUTION).fill(0));
  return;
}

// Renders each cell
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

// Renders Grid
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

// Randomly fills grid
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

// Performed every step to iterate through grid
function step() {
  let newGrid = Array(VW / RESOLUTION).fill().map(() => Array(VH / RESOLUTION).fill(0));
  for (let x = 0; x < VW / RESOLUTION; x++) {
    for (let y = 0; y < VH / RESOLUTION; y++) {
      // PERFORM OPERATION ON GRID
    }
  }
  grid = newGrid;
  return;
}
