class ExplicitCurve {
    constructor(y) {
        this.y = y;
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
    plot(display, start, end) {
        const table = this.getTable(display, start, end);
        display.plot(table);
    }
}
