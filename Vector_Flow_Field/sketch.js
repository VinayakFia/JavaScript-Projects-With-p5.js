function setup() {
  VW = windowWidth;
  VH = windowHeight;
  back_colour = color(3, 3, 100);
  num_particles = 5000;
  speed = 1;

  random_offset = speed;
  random_offsetMin = 0;
  random_offsetMax = 5;

  simplicity = 2000;

  decay = 10;
  decayMin = 0;
  decayMax = 255;

  directionGrid = setupNoiseGrid();
  directionGrid = setupDirectionGrid(directionGrid);

  r = 255;
  g = 255;
  b = 255;
  
  particles = [];
  setupParticles();

  frameRate(60);
  createCanvas(VW, VH + 1); // + 1 necessary for some reason I dont understand

  var gui = createGui('Controls');
  gui.addGlobals('speed', 'random_offset', 'num_particles', 'simplicity', 'decay', 'r', 'g', 'b');

  background(3, 3, 1);
}

function draw() {
  background(3, 3, 1, decay);
  stepParticles();
}

function reset() {
  setupGrid();
  randomFill();
}

/**
 * Creates a direction grid from a 2D array with values from 0 to 1
 * @param directionGrid 
 * @returns 
 */
function setupDirectionGrid(directionGrid) {
  for (let x = 0; x < VW; x++) {
    for (let y = 0; y < VH; y++) {
      directionGrid[x][y] = directionGrid[x][y] * 2 * PI;
      directionGrid[x][y] = createVector(
                            cos(directionGrid[x][y]), 
                            sin(directionGrid[x][y])); 
    }
  }
  return directionGrid;
}

function setupParticles() {
  for (let i = 0; i < num_particles; i++) {
    particles.push(createVector(random(0, VW), random(0, VH)));
  }
}

function inRange(v) {
  if (v.x < 0 || v.x > VW) {
    return false;
  }
  if (v.y < 0 || v.y> VH) {
    return false;
  }
  return true;
}

function positiveMod(i, n) {
  return (i % n + n) % n;
}

function magnitude(dGridx, dGridy) {
  return sqrt(dGridx^2 + dGridy^2);
}

function stepParticles() {
  for (let i = 0; i < num_particles; i++) {
    strokeWeight(2);

    let oldLocation = createVector(particles[i].x, particles[i].y);
    let dGridx = directionGrid[floor(oldLocation.x)][floor(oldLocation.y)].x;
    let dGridy = directionGrid[floor(oldLocation.x)][floor(oldLocation.y)].y;
    let newLocation = createVector(oldLocation.x + speed * dGridx + random(-random_offset, random_offset), 
                                   oldLocation.y + speed * dGridy + random(-random_offset, random_offset));

    stroke(abs(dGridx) * r, abs(dGridy) * g, (abs(dGridx)+abs(dGridy)) * b, 100);

    if (!inRange(newLocation)) {
      newLocation.x = positiveMod(newLocation.x, VW);
      newLocation.y = positiveMod(newLocation.y, VH);
      particles[i].x = newLocation.x;
      particles[i].y = newLocation.y;
      continue;
    }

    line(oldLocation.x, oldLocation.y, newLocation.x, newLocation.y);
    particles[i].x = newLocation.x;
    particles[i].y = newLocation.y;
  }
}

function setupZeroGrid() {
  return Array(VW).fill().map(() => Array(VH).fill(0));
}

function setupNoiseGrid() {
  //noiseDetail(8, 0.65);
  let grid = setupZeroGrid();
  for (let x = 0; x < VW; x++) {
    for (let y = 0; y < VH; y++) {
      grid[x][y] = noise(x/simplicity, y/simplicity);
    }
  }
  return grid;
}
