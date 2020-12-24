class ParameterisedExplicitCurve {
    constructor(y, start, end, colour) {
        this.y = y;
        this.start = start;
        this.end = end;
        this.colour = colour;
    }
    evaluate(t) {
        let explcitFun = x => this.y(x, t);
        return new ExplicitCurve(explcitFun, this.start, this.end, this.colour);
    }
    add(curve) {
        let newFun = (x, t) => this.y(x, t) + curve.y(x, t);
        return new ParameterisedExplicitCurve(newFun, this.start, this.end, this.colour);
    }
}
