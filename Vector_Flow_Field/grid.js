function setupZeroGrid() {
  return Array(VW).fill().map(() => Array(VH).fill(0));
}

function setupNoiseGrid() {
  //noiseDetail(8, 0.65);
  let grid = setupZeroGrid();
  for (let x = 0; x < VW; x++) {
    for (let y = 0; y < VH; y++) {
      grid[x][y] = noise(x/2000, y/2000);
    }
  }
  return grid;
}
