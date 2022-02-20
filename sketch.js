let numBranches;
let i;
let height = 700;
let width = 800; 
let slider;
let sliderBias;
let angle;
let r1;
let g1;
let b1;
let r2;
let g2;
let b2;
let numGrads;
let gradIncR;
let gradIncG;
let gradIncB;
let bias;

function setup() {
  i = 0;

  let height = windowHeight-1;
  let width = windowWidth;

  numBranches = 10; 
  //slider = createSlider(0, TWO_PI, PI/4, 0.01);
  //sliderBias = createSlider(0, TWO_PI, 0, 0.01);
  angle = PI/4;
  sliderBias = 0;
  //r1 = 31;
  //g1 = 61;
  //b1 = 77;
  //r2 = 254;
  //g2 = 127;
  //b2 = 45;
  r1 = 156;
  g1 = 246;
  b1 = 246;
  r2 = 243;
  g2 = 201;
  b2 = 139;
  bias = 0.1;
  numGrads = 1;

  [gradIncR, gradIncG, gradIncB] = gradientIncrement(r1, g1, b1, r2, g2, b2, numGrads);

  createCanvas(width, height);
  fullscreen();
}

function draw(len) {
  background(0);
  //angle = slider.value();
  //bias = sliderBias.value();

  angle += 0.012;
  bias -= 0.021;

  stroke(r1, g1, b1);
  translate(windowWidth/2, windowHeight-350);
  branch(220);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  [r1, g1, b1] = gradient(r1, g1, b1, gradIncR, gradIncG, gradIncB);
  if (len <= 10) {
    r1 = 35;
    g1 = 61;
    b1 = 77;
  }
  if (len > 10) {
    push();
    strokeWeight(1);
    stroke(r1, g1, b1);
    rotate(angle+bias);
    branch(len * 0.75);
    pop();
    push();
    strokeWeight(1);
    stroke(r1, g1, b1);
    rotate(-angle+bias);
    branch(len * 0.75);
    pop();  
  }
}

function gradient(r, g, b, gradIncR, gradIncG, gradIncB) {
  return [r1+gradIncR, g1+gradIncG, b1+gradIncB];
}

function gradientIncrement(r, g, b, rr, gg, bb, numGrads) {
  diffR = rr-r;
  diffG = gg-g;
  diffB = bb-b;
  diffR = diffR/numGrads;
  diffG = diffG/numGrads;
  diffB = diffG/numGrads;
  print(diffR, diffG, diffB);
  return [diffR, diffG, diffB];
}