class ExplicitCurve {

    y: (x:number) => number;
    start: number;
    end: number;
    colour: Colour;

    constructor(
    y: (x: number) => number,
    start: number,
    end: number,
    colour: Colour) {
        this.y = y;
        this.start = start;
        this.end = end;
        this.colour = colour;
    }

    getTable(display: Display, start: number, end: number): number[][] {
        const startX: number = Math.max(display.bottomLeft[0], start);
        const endX: number = Math.min(display.topRight[0], end);
        const dx: number = display.getXUnitsPerPixel();
        let table: number[][] = [];
        for (let x = startX; x < endX; x += dx) {
            table.push([x, this.y(x)])
        }
        return table;
    }

    pixelPlot(display: Display): void {
        const table = this.getTable(display, this.start, this.end);
        display.pixelPlot(table);
    }

    lineJoinedPlot(display: Display): void {
        const table = this.getTable(display, this.start, this.end);
        display.lineJoinedPlot(table, this.colour);
    }
}