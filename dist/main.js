$(function () {
    main();
});
function main() {
    var canvas = document.getElementById("display");
    const grey = new Colour(40, 40, 40);
    let display = new Display(canvas, grey);
    let y = x => Math.sin(x);
    const red = new Colour(255, 0, 0);
    const blue = new Colour(0, 0, 255);
    const curve = new ExplicitCurve(y, -4, 4, red);
    curve.lineJoinedPlot(display);
    let g = x => Math.sin(x + Math.PI / 2);
    const curve2 = new ExplicitCurve(g, -4, 4, blue);
    curve2.lineJoinedPlot(display);
}
