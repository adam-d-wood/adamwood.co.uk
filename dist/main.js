$(function () {
    main();
});
function main() {
    var canvas = document.getElementById("display");
    const grey = new Colour(14, 22, 14);
    const cream = new Colour(242, 247, 242);
    let display = new Display(canvas, grey);
    let f = (x, t) => Math.cos(Math.pow(x / 2, 2) + t);
    const byzantium = new Colour(104, 50, 87);
    const fushia = new Colour(245, 26, 164);
    const violet = new Colour(189, 64, 137);
    const purple = new Colour(135, 92, 255);
    const curve = new ParameterisedExplicitCurve(f, -5, 5, byzantium);
    let g = (x, t) => Math.cos(Math.sin(x) - t);
    let h = (x, t) => g(x, t) + f(x, t);
    const curve2 = new ParameterisedExplicitCurve(g, -5, 5, fushia);
    const curve3 = new ParameterisedExplicitCurve(h, -5, 5, violet);
    const curves = getPhaseShiftedWaves(7);
    // const sum = curves.reduce((acc, val) => acc.add(val))
    // sum.colour = purple;
    // const scaledSum = (x, t) => 0.01 * sum.y(x, t);
    // sum.y = scaledSum;
    // curves.push(sum);
    // const animator = new Animator(display, [curve, curve2, curve3]);
    // animator.animate();
    const x = t => 5 * Math.sin(t / 5);
    const y = t => -10;
    const z = t => 5 + t;
    const curve3d = new ParametricCurve3D(x, y, z, 0, 500);
    curve3d.pixelPlot(display);
}
function getPhaseShiftedWaves(n) {
    const step = Math.PI / (n);
    const fushia = new Colour(245, 26, 164);
    const byzantium = new Colour(104, 50, 87);
    const silver = new Colour(194, 193, 194);
    let curves = [];
    for (let i = 0; i < n; i++) {
        let f = (x, t) => Math.cos(x + step * i + t);
        curves.push(new ParameterisedExplicitCurve(f, -5, 5, fushia));
        let g = (x, t) => Math.cos(x + step * i - t);
        curves.push(new ParameterisedExplicitCurve(g, -5, 5, silver));
    }
    return curves;
}
