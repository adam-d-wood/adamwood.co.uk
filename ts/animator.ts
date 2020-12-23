class Animator {

    curves: ParameterisedExplicitCurve[];
    display: Display;

    constructor(display: Display, curves: ParameterisedExplicitCurve[]=[]) {
        this.display = display;
        this.curves = curves;
    }

    evaluateCurves(t: number): ExplicitCurve[] {
        const explicitCurves: ExplicitCurve[] = [];
        for (let paramCurve of this.curves) {
            let explicitCurve: ExplicitCurve = paramCurve.evaluate(t);
            explicitCurves.push(explicitCurve);
        }
        return explicitCurves;
    }

    drawCurvesAt(t: number): void {
        const explicitCurves: ExplicitCurve[] = this.evaluateCurves(t);
        for (let curve of explicitCurves) {
            curve.lineJoinedPlot(this.display);
        }
    }
}