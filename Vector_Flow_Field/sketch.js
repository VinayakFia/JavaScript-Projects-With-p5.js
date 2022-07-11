const VW = 2000;
const VH = 2000;
let RESOLUTION = 3;
let BACK_COLOUR; 
let GRID_COLOUR;
let NUM_PARTICLES;
let SPEED;
let directionGrid;
let particles;
let grid;

function setup() {
  BACK_COLOUR = color(3, 3, 1);
  GRID_COLOUR = color(100);
  NUM_PARTICLES = 3000;
  SPEED = 5;
  directionGrid = setupNoiseGrid();
  directionGrid = setupDirectionGrid(directionGrid);
  particles = [];
  setupParticles();
  console.log(particles);
  frameRate(60);
  createCanvas(VW, VH);
  background(3, 3, 1);
}

function draw() {
  background(3, 3, 1, 0);
  stepParticles();
}

function mouseClicked() {

}

function reset() {
  setupGrid();
  randomFill();
}

function setupDirectionGrid(directionGrid) {
  for (let x = 0; x < VW; x++) {
    for (let y = 0; y < VH; y++) {
      directionGrid[x][y] = directionGrid[x][y] * 2 * PI;
      directionGrid[x][y] = createVector(cos(directionGrid[x][y]), sin(directionGrid[x][y])); 
    }
  }
  return directionGrid;
}

function setupParticles() {
  for (let i = 0; i < NUM_PARTICLES; i++) {
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
  for (let i = 0; i < NUM_PARTICLES; i++) {
    strokeWeight(2);
    let oldLocation = createVector(particles[i].x, particles[i].y);
    let dGridx = directionGrid[floor(oldLocation.x)][floor(oldLocation.y)].x;
    let dGridy = directionGrid[floor(oldLocation.x)][floor(oldLocation.y)].y;
    let newLocation = createVector(oldLocation.x + SPEED * dGridx, oldLocation.y + SPEED * dGridy);
    stroke(abs(dGridx) * 255, abs(dGridy) * 255, (abs(dGridx)+abs(dGridy)) * 150, 100);
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