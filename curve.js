var ExplicitCurve = /** @class */ (function () {
    function ExplicitCurve(y) {
        this.y = y;
    }
    ExplicitCurve.prototype.getTable = function (display, start, end) {
        var startX = Math.max(display.bottomLeft[0], start);
        var endX = Math.min(display.topRight[0], end);
        var dx = display.getXUnitsPerPixel();
        var table;
        for (var x = startX; x < endX; x += dx) {
            table.push([x, this.y(x)]);
        }
        return table;
    };
    ExplicitCurve.prototype.plot = function (display, start, end) {
        var table = this.getTable(display, start, end);
        display.plot(table);
    };
    return ExplicitCurve;
}());
