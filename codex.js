const PHI = 1.618033;
const width = 1337;
const height = 826;
const X = 0;
const Y = 1;

function dequeue(selections) {
  const ret = selections.shift();
  selections.push(ret);
  return ret;
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

function getGfxCtx() {
  /** @type {HTMLCanvasElement}  */
  const canvas = document.getElementById("canvas0");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  
  return [canvas, ctx];
}

function radians(degrees) {
  return degrees * (Math.PI /180);
}


function line(
   /** @type {CanvasRenderingContext2D}*/ 
   gfx,
   a,
   b,
   strokeStyle = "",
   lineWidth = 1
) {
  gfx.strokeStyle = strokeStyle;
  gfx.lineWidth = lineWidth;
  gfx.beginPath();
  gfx.moveTo(...a);
  gfx.lineTo(...b);
  gfx.stroke();
}

function ellipse(
  /** @type {CanvasRenderingContext2D}*/ 
  gfx,
  center,
  radius,
  rotation = 0,
  angle = [0, Math.PI * 2],
  counterClockwise = false,
) {
  gfx.ellipse(
    center[X],
    center[Y],
    radius[X],
    radius[Y],
    rotation,
    angle[0],
    angle[1],
    counterClockwise
  );
}

function rect(
  /** @type {CanvasRenderingContext2D}*/ 
  gfx,
  color,
  x,
  y,
  w,
  h
) {
  gfx.clearRect(x, y, w, h);
  gfx.fillStyle = color;
  gfx.fillRect(x, y, w, h);
}

const colors =  [
  "black",
  "red",
  "yellow",
  "whitesmoke",
  "green",
  "blue",
  "cyan",
  "purple"
];

function scale(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function raindrop(/** @type {CanvasRenderingContext2D}*/ gfx, r, a) {
  gfx.save();
  gfx.translate(-width / 2, -height / 2);
  
  gfx.beginPath();
  for (let i = 0; i < 360; i++) { 
    const x = width / 2 + Math.cos(radians(i)) * r;
    const y = height / 2 + Math.sin(radians(i)) * Math.pow(Math.sin(radians(i/2)), a) * r;
    ellipse(gfx, [x, y], [1, 1]);
  }

  gfx.fillStyle = "cyan";
  gfx.fill();
  gfx.restore();
}


/* function scale(n, start1, stop1, start2, stop2) {
  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  return newval;
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
} */

function clearCanvas(gfx) {
  gfx.save();
  gfx.setTransform(1, 0, 0, 1, 0, 0);
  gfx.clearRect(0, 0, width, height);
  gfx.restore();
}

function changeCanvasBackgroundColor(gfx, color) {
  gfx.save();
  gfx.setTransform(1, 0, 0, 1, 0, 0);
  gfx.fillStyle = color;
  gfx.fillRect(0, 0, width, height);
  gfx.restore();
}

let a = 2.3
function changePhase(phase, /*s* @type {CanvasRenderingContext2D}*/ gfx) {
  clearCanvas(gfx);
  changeCanvasBackgroundColor(gfx, "black");

  let b = scale(a+=9, 0, width, 0, 9);
  raindrop(gfx, 98.6, b);

  if (a >= 999) {
    a = 0;
  }

  requestAnimationFrame(newPhase => {
    changePhase(newPhase, gfx);
  });
}


function codex() {
  const [_, gfx] = getGfxCtx();
  gfx.translate(width/2, height/2);
  requestAnimationFrame(phase => {
    changePhase(phase, gfx);
  });
}
