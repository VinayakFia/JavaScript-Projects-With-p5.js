function setupZeroGrid() {
  return Array(VW).fill().map(() => Array(VH).fill(0));
}

function setupNoiseGrid() {
  noiseDetail(8, 0.65);
  let grid = setupZeroGrid();
  for (let x = 0; x < VW; x++) {
    for (let y = 0; y < VH; y++) {
      grid[x][y] = noise(x/500, y/500);
    }
  }
  return grid;
}
