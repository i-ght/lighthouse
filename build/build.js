function radiateRaindrop(r, a) {
    translate(-width / 2, -height / 2, 0);
    beginShape();
    for (var i = 0; i < 360; i++) {
        var x = width / 2 + cos(radians(i)) * r;
        var y = height / 2 + sin(radians(i)) * pow(sin(radians(i) / 2), a) * r;
        vertex(x, y);
    }
    endShape();
}
function setup() {
    createCanvas(640, 480, WEBGL);
    normalMaterial();
    debugMode();
}
var a = 2.3;
function draw() {
    background(200);
    orbitControl();
    var b = map(a += 2.3, 0, width, 0, 9);
    radiateRaindrop(98.6, b);
    if (a >= width)
        a = 0;
}
//# sourceMappingURL=build.js.map