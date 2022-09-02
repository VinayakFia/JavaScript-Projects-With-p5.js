function setup() {
  VW = windowWidth;
  VH = windowHeight * 1.5;

  NUM_PARTICLES = 100;

  BACK_COLOUR = color(3, 3, 1);
  PARTICLE_COLOUR = color(255, 255, 255);
  LINE_COLOUR = color(255, 255, 255);

  DIAMETER = 12;
  SPEED = 1;
  MAX_DIST = sqrt(VW^2 + VH^2)

  particles = setupParticles(NUM_PARTICLES);

  frameRate(60);
  let canvas = createCanvas(VW, VH);
  canvas.parent('bg-canvas');
  console.log(particles);
}

function draw() {
  background(BACK_COLOUR);
  moveParticles(particles);
  lineParticles(particles);
  renderParticles(particles);
}

function setupParticles() {
  let particles = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    let newParticle = {
      'x': Math.floor(random(0, VW)),
      'y': Math.floor(random(0, VH)),
      'vx': random(-SPEED, SPEED),
      'vy': random(-SPEED, SPEED)
    };
    particles.push(newParticle);
  }
  return particles;
}

function mouseClicked() {
  let newParticle = {
    'x': mouseX,
    'y': mouseY,
    'vx': random(-SPEED, SPEED),
    'vy': random(-SPEED, SPEED)
  };
  particles.push(newParticle);
  NUM_PARTICLES++;
}

function renderParticles(particles) {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    push();
    fill(PARTICLE_COLOUR);
    circle(particles[i].x, particles[i].y, DIAMETER);
    strokeWeight(0);
    pop();
  }
  return;
}

function bound(particle) {
  if (particle.x > VW) particle.x = particle.x - VW;
  if (particle.y > VW) particle.y = particle.y - VH;
  if (particle.x < 0) particle.x = VW + particle.x;
  if (particle.y < 0) particle.y = VH + particle.y;
  return;
}

function moveParticles(particles) {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;
    bound(particles[i]);
  }
  return;
}

function lineParticles(particles) {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    let distanceMouse = dist(particles[i].x, particles[i].y, mouseX, mouseY);

    push();
    strokeWeight(3);
    stroke(color(255, 255, 255, min(MAX_DIST/(distanceMouse**3) * 800000), 90));
    line(particles[i].x, particles[i].y, mouseX, mouseY)
    pop();

    for (let j = 0; j < NUM_PARTICLES; j++) {
      if (i == j) continue;

      let distance = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);

      if (distance > 120) continue;

      push();
      strokeWeight(3);
      stroke(color(255, 255, 255, min(MAX_DIST/(distance**3) * 800000), 90));
      line(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
      pop();
    }
  }

  return;
}
