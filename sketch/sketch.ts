/*
   CREDIT: https://openprocessing.org/sketch/15988/
   Tear Drop Curve by Michael
   M. Kontopoulos  (11.2010)
   TEARDROP CURVE
   Based on the parametric equation found at
   http://mathworld.wolfram.com/TeardropCurve.html
  
   https://www.youtube.com/watch?v=334kdqpyzXQ
   Oh Micahel, Oh Jesus, You Know I'm Not To Blame!
   You Know My Reputation, For Playing A Good Clean Game!
*/

function radiateRaindrop(r: number, a: number) {
  translate(-width/2,-height/2,0);
  
  beginShape();
  for (let i = 0; i < 360; i++) {
    let x = width/2 + cos(radians(i)) *r;
    let y = height/2+ sin(radians(i)) * pow(sin(radians(i)/2), a) *r;
    /*ellipse(x,y, 10,10);
    point(x,y);*/
    vertex(x, y);
  }

  endShape();
}

function setup() {
  createCanvas(640, 480, WEBGL);
  normalMaterial();
  debugMode();
}

let a = 2.3;

function draw() {
  background(200);
  orbitControl();
  let b = map(a+=2.3, 0, width, 0, 9);
  radiateRaindrop(98.6, b);

  if (a >= width)
    a = 0;  
}