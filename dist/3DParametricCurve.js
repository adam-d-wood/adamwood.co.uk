class ParametricCurve3D {
    constructor(x, y, z, tStart, tEnd) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.tStart = tStart;
        this.tEnd = tEnd;
    }
    evaluate(t) {
        const [x, y, z] = [this.x, this.y, this.z].map(e => e(t));
        return [x, y, z];
    }
    getTable(display, density) {
        const span = this.tEnd - this.tStart;
        const increment = span / density;
        for (let t = this.tStart; t < this.tEnd; t += increment) {
        }
        return [[]];
    }
}
