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

    getTable(display: Display, density: number): number[][] {
        const span: number = this.tEnd - this.tStart;
        const increment: number = span / density;
        return [[]];
    }
}