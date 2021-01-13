class ParametricCurve3D {

    public x: (t: number) => number;
    public y: (t: number) => number;
    public z: (t: number) => number;
    public tStart: number;
    public tEnd: number;

    constructor(
        x: (t: number) => number,
        y: (t:number) => number,
        z: (t: number) => number,
        tStart: number,
        tEnd: number
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.tStart = tStart;
        this.tEnd = tEnd;
    }

    evaluateAt(t: number): Vector {

        //get xyz coords for some value of the parameter t
        const [x, y, z]: number[] = [this.x, this.y, this.z].map(
            e => e(t)
        );
        return new Vector([x, y, z]);
    }

    getSpaceCoords(density: number): Vector[] {
        const span: number = this.tEnd - this.tStart;
        const increment: number = span / density;
        let coords: Vector[] = [];
        for (let t = this.tStart; t < this.tEnd; t += increment) {
            let coord: Vector = this.evaluateAt(t);
            coords.push(coord);
        }
        return coords;
    }

    toScreenCoords(spaceCoord: Vector): number[] {
        const Q: Vector = new Vector([0, 0, 5]);
        const N: Vector = new Vector([0, 0, -1]);
        const O: Vector = new Vector([0, 0, 0]);
        const D: Vector = spaceCoord.sub(O);
        const s: number = (Q.sub(O).dot(N)) / D.dot(N);
        const screenIntersect: Vector = O.add(D.scale(s));
        const x = screenIntersect.getEntry(0);
        const y = screenIntersect.getEntry(1);
        return [x, y];
    }

    getTable(): number[][] {
        const spaceCoords: Vector[] = this.getSpaceCoords(100);
        let table: number[][] = [];
        for (let spaceCoord of spaceCoords) {
            const [x, y]: number[] = this.toScreenCoords(spaceCoord);
            table.push([x, y])
        }
        return table;
    }

    pixelPlot(display: Display): void {
        const table = this.getTable();
        // console.log("table", table);
        display.pixelPlot(table);
    }

    lineJoinedPlot(display: Display, colour: Colour): void {
        const table = this.getTable();
        display.lineJoinedPlot(table, colour);
    }
}