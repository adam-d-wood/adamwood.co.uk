class ParametricCurve3D {
    constructor(x, y, z, tStart, tEnd) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.tStart = tStart;
        this.tEnd = tEnd;
    }
    getTable(display, density) {
        const span = this.tEnd - this.tStart;
        const increment = span / density;
        return [[]];
    }
}
