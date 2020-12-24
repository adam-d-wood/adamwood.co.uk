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
        for (let curve of explicitCurves) {
            curve.lineJoinedPlot(this.display);
        }
    }
    animate() {
        let t = 0;
        let anim = setInterval(frame, 20);
        const self = this;
        function frame() {
            if (t > 1000) {
                clearInterval(anim);
            }
            else {
                self.display.clear();
                self.display.drawGrid();
                self.drawCurvesAt(t);
                t += 0.02;
            }
        }
    }
}
