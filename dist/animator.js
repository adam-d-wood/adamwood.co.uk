class Animator {
    constructor(display, curves = []) {
        this.display = display;
        this.curves = curves;
    }
    evaluateCurves(t) {
        const explicitCurves = [];
        for (let paramCurve of this.curves) {
            let explicitCurve = paramCurve.evaluate(t);
            explicitCurves.push(explicitCurve);
        }
        return explicitCurves;
    }
    drawCurvesAt(t) {
        const explicitCurves = this.evaluateCurves(t);
    }
}
