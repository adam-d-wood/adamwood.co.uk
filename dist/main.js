$(function () {
    main2();
});
function main2() {
    const grey = new RGBColour(25, 25, 25);
    const byzantium = new RGBColour(104, 50, 87);
    const aqua = new RGBColour(0, 255, 255);
    const canvas = document.getElementById("display");
    const display = new Display(canvas, grey);
    let space = new Space3D();
    let cube = new Cube(0.5, new Vector([0, 0, 3]), byzantium);
    let tetr = new Tetrahedron(0.5, new Vector([0, 0, 3]), aqua);
    let sphere = new Sphere(10, new Vector([0, 0, 0]), aqua);
    space.addObject(cube);
    space.addObject(tetr);
    space.addObject(sphere);
    display.drawGrid();
    let anim = setInterval(frame, 20);
    let t = 0;
    function frame() {
        if (t > 1000) {
            clearInterval(anim);
        }
        else {
            display.clear();
            display.drawGrid();
            cube.rotate_about(0, 0.02, 0.02, cube.getCentre());
            cube.rotate_about(0, 0.02, 0, new Vector([0, 0, 4]));
            tetr.rotate_about(0, 0.02, 0, new Vector([0, 0, 4]));
            tetr.rotate_about(0, -0.08, 0, tetr.getCOM());
            sphere.rotate_about(0, -0.002, 0.002, sphere.getCOM());
            space.drawObjects(display);
        }
        t += 0.001;
    }
}
function main() {
    var canvas = document.getElementById("display");
    const grey = new RGBColour(25, 25, 25);
    const cream = new RGBColour(242, 247, 242);
    let display = new Display(canvas, grey);
    let f = (x, t) => Math.cos(Math.pow(x / 2, 2) + t);
    const byzantium = new RGBColour(104, 50, 87);
    const fushia = new RGBColour(245, 26, 164);
    const violet = new RGBColour(189, 64, 137);
    const purple = new RGBColour(135, 92, 255);
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
    // let lines = [];
    // const p_colour = Colour.getRandomColour();
    // const c_colour = p_colour.get_inverse();
    // const n = 30
    // const i_colour = (c_colour.sub(p_colour)).scale(1/n);
    // let colour = p_colour;
    // for (let i=0; i<n; i++) {
    //     const x1 = -40 + 80/n * (i+1);
    //     let x = t => x1 + x1 * 1 * Math.pow(10, -14) * (Math.pow(t, 5)-10000*Math.pow(t, 3));
    //     // let y = t => -10 + Math.sin(t/10) + Math.pow(x(t)/5, 2) - Math.pow(Math.E, t/50);
    //     let y = t => -10 + Math.pow(x1/5, 2) + 1/100000 * (Math.pow(t, 3)/3 - 200*Math.pow(t, 2));
    //     let z = t => 3 + t;
    //     let line = new ParametricCurve3D(x, y, z, 0, 1000);
    //     line.lineJoinedPlot(display, colour);
    //     colour = (colour.add(i_colour)).round();
    // }
    let centre = new Vector([0, 0, 7]);
    let cubes = [];
    let k = 3;
    for (let i = 0; i < k; i++) {
        let cube = new Cube(2, new Vector([0, 0, 10]), RGBColour.getRandomColour());
        cube.rotate_about(0, 2 * Math.PI / k, 0, centre);
        cube.translate(new Vector([0, 0.2 * k, 0]));
        cubes.push(cube);
    }
    // let cube = new Cube(2, new Vector([0, 0, 10]), Colour.getRandomColour());
    // let cube2 = new Cube(2, new Vector([0, 0, 10]), Colour.getRandomColour());
    // let n = 5;
    // for (let i=0; i < n; i++) {
    //     cube.translate(new Vector([0, 0, -10]));
    //     cube.rotate(0, 0, 2*Math.PI/n);
    //     cube.translate(new Vector([0, 0, 10]));
    //     cube.draw(display);    
    // }
    let anim = setInterval(frame, 20);
    let t = 0;
    function frame() {
        if (t > 1000) {
            clearInterval(anim);
        }
        else {
            display.clear();
            display.drawGrid();
            // cube.translate(new Vector([0, 0, -10]));
            // cube.rotate(0.01, 0.005, 0.01);
            // cube.translate(new Vector([0, 0, 10]));
            // cube.rotate_about(0.00, 0.02, 0.00, centre);
            // cube.rotate_about(0.00, -0.04, 0.00, cube.getCentre());
            // cube2.rotate_about(0.00, -0.02, 0.00, centre);
            // cube2.rotate_about(0.00, 0.04, 0.00, cube2.getCentre());
            for (let cube of cubes) {
                console.log("cube", cube);
                cube.rotate_about(0, 0.02, 0, centre);
                cube.draw(display);
            }
            // cube.draw(display);
            // cube2.draw(display);
            t += 0.001;
        }
    }
    let s = new Vector([-10, 0, 20]);
    let e = new Vector([10, 0, 20]);
    // display.animateLine(s, e, Colour.getRandomColour(), 3, 500)
    // display.drawFloor(2000);
    // const rows = 8;
    // const span = 400;
    // const step = span / rows;
    // for (let i=0; i<rows; i++) {
    //     let x: number = -span/2 + (i+0.5) * step
    //     let y: number = -200
    //     let start: Vector = new Vector([x, y, 200]);
    //     let end: Vector = new Vector([x, y, 210]);
    //     drawBuildingRow(start, end, 30, display);
    // }
    // drawBuildingRow(new Vector([20, -10, 40]), new Vector([20, -10, 60]), 200, display);
    // drawBuildingRow(new Vector([-20, -10, 40]), new Vector([-20, -10, 60]), 200, display);
    // const x = t => t * Math.sin(t) + t/10;  
    // const y = t => -9 + t * Math.cos(t);
    // const z = t => 10 + t;
    // const curve3d = new ParametricCurve3D(x, y, z, 0, 100);
    // curve3d.lineJoinedPlot(display);
}
function getPhaseShiftedWaves(n) {
    const step = Math.PI / (n);
    const fushia = new RGBColour(245, 26, 164);
    const byzantium = new RGBColour(104, 50, 87);
    const silver = new RGBColour(194, 193, 194);
    let curves = [];
    for (let i = 0; i < n; i++) {
        let f = (x, t) => Math.cos(x + step * i + t);
        curves.push(new ParameterisedExplicitCurve(f, -5, 5, fushia));
        let g = (x, t) => Math.cos(x + step * i - t);
        curves.push(new ParameterisedExplicitCurve(g, -5, 5, silver));
    }
    return curves;
}
function drawBuilding(pos, width, n, colour, display) {
    const stride = new Vector([0, width, 0]);
    for (let i = 0; i < n; i++) {
        let cube = new Cube(width, pos.add(stride.scale(i)), colour);
        cube.draw(display);
    }
}
function drawBuildingRow(start, end, n, display) {
    let p_colour = RGBColour.getRandomColour();
    let c_colour = p_colour.get_inverse();
    let i_colour = (c_colour.sub(p_colour)).scale(1 / n);
    let colour = p_colour;
    const stride = end.sub(start);
    const width = stride.magnitude();
    for (let i = 0; i < n; i++) {
        // let building = new Cube(width, start.add(stride.scale(i)))
        // building.draw(display);
        drawBuilding(start.add(stride.scale(n - i - 1)), width, Math.floor(30 * Math.random()), colour, display);
        colour = (colour.add(i_colour)).round();
        console.log(colour);
    }
}
