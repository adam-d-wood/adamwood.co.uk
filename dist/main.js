$(function () {
    main();
});
function main() {
    var canvas = document.getElementById("display");
    const grey = new Colour(10, 10, 10);
    let display = new Display(canvas, grey);
    let y = x => Math.sin(x);
    const curve = new ExplicitCurve(y);
    const red = new Colour(255, 0, 0);
    const blue = new Colour(0, 0, 255);
    curve.lineJoinedPlot(display, -4, 4, red);
    let g = x => Math.sin(x + Math.PI / 2);
    const curve2 = new ExplicitCurve(g);
    curve2.lineJoinedPlot(display, -4, 4, blue);
}
