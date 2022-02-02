let vw;
let vh;
let planets = [];
let numPlanets = 0;

//temporary Variables
let force = 0;
let pDistance = 0;
let acceleration = 0;
let tempx = 0;
let tempy = 0;
let angle = 0;

let worldBounds = true;

//constants
const G = 0.005;

function setup() {
  angleMode(DEGREES);

  vh = windowHeight*0.9;
  vw = windowWidth*0.94;

  createCanvas(vw, vh);
}

function draw() {
  background(0);

  if (numPlanets>0){
    for(i = 0; i < numPlanets; i++) {
      planetCollision(i);
    }
  }

  if (worldBounds = true && numPlanets > 0) {
    for(i = 0; i<numPlanets; i++) {
      if (planets[i].x + planets[i].r/2 >= vw) {
        planets[i].vx*=-1
      }
      if (planets[i].x - planets[i].r/2 <= 0) {
        planets[i].vx*=-1
      }
      if (planets[i].y + planets[i].r/2 >= vh) {
        planets[i].vy*=-1
      }
      if (planets[i].y - planets[i].r/2 <= 0) {
        planets[i].vy*=-1
      }
    }
  }

  if (numPlanets>0){ 
    for(i = 0; i<numPlanets; i++) {
    gravity(i);
    planets[i].move();
    planets[i].show();
    print(planets);
    }
  }
}

function mousePressed() {
  planets.push();
  planets[numPlanets] = new Planet();
  numPlanets++;
}

function gravity(i) {
  for (j = 0; j<numPlanets; j++) {
    if (j!=i) {
      pDistance = dist(planets[i].x, planets[i].y, planets[j].x, planets[j].y);
      force = (G*planets[i].mass*planets[j].mass)/(pDistance*pDistance);
      acceleration = force/planets[i].mass;

      //find Angle Between
      let v1 = createVector(1, 0);
      tempx = -planets[i].x+planets[j].x;
      tempy = -planets[i].y+planets[j].y;
      let v2 = createVector(tempx, tempy);
      angle = v1.angleBetween(v2);

      //add acceleration
      planets[i].vx += acceleration*cos(angle);
      planets[i].vy += acceleration*sin(angle);
    }
  }
}

function planetCollision(i) {
  for (j = 0; j<numPlanets; j++) {
    if (j != i) {
      distance = dist(planets[i].x, planets[i].y, planets[j].x, planets[j].y);
      if (distance <= (planets[i].r+planets[j].r)/2.2) {
        if (planets[i].mass >= planets[j].mass) {
          planets[i].mass += planets[j].mass;
          planets[i].r = sqrt(planets[i].mass/PI);
          planets.splice(j, 1);
        } else {
          planets[j].mass += planets[i].mass;
          planets[j].r = sqrt(planets[j].mass/PI);
          planets.splice(i, 1);
        } 
      numPlanets--;
      }
    }
  }
}

class Planet {
  constructor() {
    this.density = 1.5;
    this.colour = color(255, 255, 255);
    this.strokeColour = color(random(255), random(255), random(255));
    this.x = mouseX;
    this.y = mouseY;
    this.r = random(10, 50);
    this.mass = this.massCalc(this.r);
    
    this.vy = 0;
    this.vx = 0;
  }
  
  massCalc(radius) {
    return radius*radius*PI*1;
  }

  colourCalc(mass) {
    //this.colour = color((mass/7000), (mass/7000), (mass/7000));
    this.colour = color(0, 0, 0)
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {  
    push();
    
    this.shadow();
    this.light();
    
    this.colourCalc(this.mass);
    strokeWeight(15);
    stroke(this.strokeColour);
    fill(this.colour);
    ellipse(this.x, this.y, this.r);

    pop();
  }

  shadow() {
    push();
    fill(100, 100);
    noStroke();
    ellipse(this.x+10, this.y+10, this.r+15);
    pop();
  }

  light() {
    push();
    this.rSquared = this.r*this.r
    fill(255, map(this.rSquared, 0, 10000, 3,10));
    noStroke();
    ellipse(this.x, this.y, this.rSquared/50);
    pop();
  }
}
