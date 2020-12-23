class ParameterisedExplicitCurve {

    public y: (x: number, t: number) => number;

    constructor(y: (x: number, t: number) => number) {
        this.y = y;
    }

    public evaluate(t: number): ExplicitCurve {
        let explcitFun = x => this.y(x, t);
        return new ExplicitCurve(explcitFun);
    }
}