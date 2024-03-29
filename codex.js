const PHI = 1.618033;
const width = 1337;
const height = 826;
const X = 0;
const Y = 1;
let [mouseX, mouseY] = [0, 0];

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


function ellipse(
  /** @type {CanvasRenderingContext2D}*/ 
  gfx,
  center,
  radius,
  rotation = 0,
  angle = [0, Math.PI * 2],
  counterClockwise = false
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

function scale(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


function raindrop(/** @type {CanvasRenderingContext2D}*/ gfx, r, a) {
  gfx.save();

  
  gfx.strokeStyle = "cyan";
  gfx.fillStyle = "cyan";
  gfx.beginPath();

  for (let i = 0; i < 360; i++) { 
    gfx.beginPath();
    const x = width / 2 + Math.cos(radians(i)) * r;
    const y = height / 2 + Math.sin(radians(i)) * Math.pow(Math.sin(radians(i/2)), a) * r;
    ellipse(gfx, [x, y], [10, 10]);

    gfx.fill();
  }

  gfx.fill();
  gfx.restore();
}


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

let a = 0;
function changePhase(phase, /*s* @type {CanvasRenderingContext2D}*/ gfx) {
  clearCanvas(gfx);
  changeCanvasBackgroundColor(gfx, "black");

  let b = scale(mouseX, 0, width, 0, 7);
  raindrop(gfx, 333, b);

  if (a >= 333) {
    a = 0;
  }

  requestAnimationFrame(newPhase => {
    changePhase(newPhase, gfx);
  });
}


function codex() {
  const [canvas, gfx] = getGfxCtx();
  canvas.addEventListener("mousemove", event => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  })

  requestAnimationFrame(phase => {
    changePhase(phase, gfx);
  });
}
