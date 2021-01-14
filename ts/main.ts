$(function() {
    main();
});

function main() {
    var canvas = document.getElementById("display");
    const grey: Colour = new Colour(14, 22, 14);
    const cream: Colour = new Colour(242, 247, 242);
    let display = new Display(canvas, grey);
    let f = (x, t) => Math.cos(Math.pow(x/2, 2) + t);
    const byzantium: Colour = new Colour(104, 50, 87);
    const fushia: Colour = new Colour(245, 26, 164);
    const violet: Colour = new Colour(189, 64, 137);
    const purple: Colour = new Colour(135, 92, 255);
    const curve = new ParameterisedExplicitCurve(f, -5, 5, byzantium);
    let g = (x, t) => Math.cos(Math.sin(x)- t);
    let h = (x, t) => g(x, t) + f(x, t);
    const curve2 = new ParameterisedExplicitCurve(g, -5, 5, fushia);
    const curve3 = new ParameterisedExplicitCurve(h, -5, 5, violet)
    const curves = getPhaseShiftedWaves(7);
    // const sum = curves.reduce((acc, val) => acc.add(val))
    // sum.colour = purple;
    // const scaledSum = (x, t) => 0.01 * sum.y(x, t);
    // sum.y = scaledSum;
    // curves.push(sum);
    // const animator = new Animator(display, [curve, curve2, curve3]);
    // animator.animate();
    let lines = [];
    const p_colour = Colour.getRandomColour();
    const c_colour = p_colour.get_inverse();
    const n = 30
    const i_colour = (c_colour.sub(p_colour)).scale(1/n);
    let colour = p_colour;
    for (let i=0; i<n; i++) {
        const x1 = -40 + 80/n * (i+1);
        let x = t => x1 + x1 * 1 * Math.pow(10, -14) * (Math.pow(t, 5)-10000*Math.pow(t, 3));
        // let y = t => -10 + Math.sin(t/10) + Math.pow(x(t)/5, 2) - Math.pow(Math.E, t/50);
        let y = t => -10 + Math.pow(x1/5, 2) + 1/100000 * (Math.pow(t, 3)/3 - 200*Math.pow(t, 2));
        let z = t => 3 + t;
        let line = new ParametricCurve3D(x, y, z, 0, 1000);
        line.lineJoinedPlot(display, colour);
        colour = (colour.add(i_colour)).round();
    }
    // const x = t => t * Math.sin(t) + t/10;  
    // const y = t => -9 + t * Math.cos(t);
    // const z = t => 10 + t;
    // const curve3d = new ParametricCurve3D(x, y, z, 0, 100);
    // curve3d.lineJoinedPlot(display);
}

function getPhaseShiftedWaves(n: number): ParameterisedExplicitCurve[] {
    const step: number = Math.PI / (n);
    const fushia: Colour = new Colour(245, 26, 164);
    const byzantium: Colour = new Colour(104, 50, 87);
    const silver: Colour = new Colour(194, 193, 194);
    let curves: ParameterisedExplicitCurve[] = []
    for (let i=0; i < n; i++) {
        let f = (x, t) => Math.cos(x + step * i + t);
        curves.push(new ParameterisedExplicitCurve(f, -5, 5, fushia));
        let g = (x, t) => Math.cos(x + step * i - t);
        curves.push(new ParameterisedExplicitCurve(g, -5, 5, silver));
    }
    return curves;
}


