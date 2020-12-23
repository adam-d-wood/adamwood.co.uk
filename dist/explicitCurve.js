class ExplicitCurve {
    constructor(y, start, end, colour) {
        this.y = y;
        this.start = start;
        this.end = end;
        this.colour = colour;
    }
    getTable(display, start, end) {
        const startX = Math.max(display.bottomLeft[0], start);
        const endX = Math.min(display.topRight[0], end);
        const dx = display.getXUnitsPerPixel();
        let table = [];
        for (let x = startX; x < endX; x += dx) {
            table.push([x, this.y(x)]);
        }
        return table;
    }
    pixelPlot(display) {
        const table = this.getTable(display, this.start, this.end);
        display.pixelPlot(table);
    }
    lineJoinedPlot(display) {
        const table = this.getTable(display, this.start, this.end);
        display.lineJoinedPlot(table, this.colour);
    }
}
