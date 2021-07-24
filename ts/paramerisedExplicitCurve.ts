class ParameterisedExplicitCurve {

    public y: (x: number, t: number) => number;
    start: number;
    end: number;
    colour: RGBColour;

    constructor(
        y: (x: number, t: number) => number,
        start: number,
        end: number,
        colour: RGBColour) {
        this.y = y;
        this.start = start;
        this.end = end;
        this.colour = colour;
    }

    public evaluate(t: number): ExplicitCurve {
        let explcitFun = x => this.y(x, t);
        return new ExplicitCurve(explcitFun, this.start, this. end, this.colour);
    }

    public add(curve: ParameterisedExplicitCurve): ParameterisedExplicitCurve {
        let newFun = (x, t) => this.y(x, t) + curve.y(x, t);
        return new ParameterisedExplicitCurve(newFun, this.start, this.end, this.colour);
    }
}