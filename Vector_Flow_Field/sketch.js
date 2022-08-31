let VW = 1300;
let VH = 1200;
let RESOLUTION = 3;
let BACK_COLOUR; 
let GRID_COLOUR;
let NUM_PARTICLES;
let SPEED;
let directionGrid;
let particles;
let grid;
let ticker;
let RANDOM;

function setup() {
  //Sliders
  slider1 = createSlider(0, 15, 5, 1);
  slider1.position(10, 10);
  slider1.style('width', '200px');

  slider2 = createSlider(0, 15, 0, 1);
  slider2.position(10, 10);
  slider2.style('width', '200px');
  slider2.position(0, 100);

  slider3 = createSlider(0, 255, 20, 1);
  slider3.position(10, 10);
  slider3.style('width', '200px');
  slider3.position(0, 200);

  VW = windowWidth;
  VH = windowHeight;
  BACK_COLOUR = color(3, 3, 1);
  GRID_COLOUR = color(100);
  NUM_PARTICLES = 5000;
  SPEED = 5;
  directionGrid = setupNoiseGrid();
  directionGrid = setupDirectionGrid(directionGrid);
  particles = [];
  ticker = 0;
  setupParticles();
  console.log(particles);
  frameRate(60);
  createCanvas(VW, VH);
  background(3, 3, 1);
}

function draw() {
  let decay = slider3.value();
  RANDOM = slider2.value();
  SPEED = slider1.value();
  background(3, 3, 1, decay);
  stepParticles();
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
  if (v.y < 0 || v.y > VH) {
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
    let newLocation = createVector(oldLocation.x + SPEED * dGridx + 0.5 + random(-RANDOM, RANDOM), oldLocation.y + SPEED * dGridy + random(-RANDOM, RANDOM));
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

function stepParticles2() {
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