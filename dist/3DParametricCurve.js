class ParametricCurve3D {
    constructor(x, y, z, tStart, tEnd) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.tStart = tStart;
        this.tEnd = tEnd;
    }
    evaluateAt(t) {
        //get xyz coords for some value of the parameter t
        const [x, y, z] = [this.x, this.y, this.z].map(e => e(t));
        return new Vector([x, y, z]);
    }
    getSpaceCoords(density) {
        const span = this.tEnd - this.tStart;
        const increment = span / density;
        let coords = [];
        for (let t = this.tStart; t < this.tEnd; t += increment) {
            let coord = this.evaluateAt(t);
            coords.push(coord);
        }
        return coords;
    }
    toScreenCoords(spaceCoord) {
        const Q = new Vector([0, 0, 5]);
        const N = new Vector([0, 0, -1]);
        const O = new Vector([0, 0, 0]);
        const D = spaceCoord.sub(O);
        const s = (Q.sub(O).dot(N)) / D.dot(N);
        const screenIntersect = O.add(D.scale(s));
        const x = screenIntersect.getEntry(0);
        const y = screenIntersect.getEntry(1);
        return [x, y];
    }
    getTable() {
        const spaceCoords = this.getSpaceCoords(100);
        let table = [];
        for (let spaceCoord of spaceCoords) {
            const [x, y] = this.toScreenCoords(spaceCoord);
            table.push([x, y]);
        }
        return table;
    }
    pixelPlot(display) {
        const table = this.getTable();
        // console.log("table", table);
        display.pixelPlot(table);
    }
    lineJoinedPlot(display, colour) {
        const table = this.getTable();
        display.lineJoinedPlot(table, colour);
    }
}
