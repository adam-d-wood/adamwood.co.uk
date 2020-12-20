class ExplicitCurve {

    y: (x:number) => number;

    constructor(y: (x: number) => number) {
        this.y = y;
    }

    getTable(display: Display, start: number, end: number): number[][] {
        const startX: number = Math.max(display.bottomLeft[0], start);
        const endX: number = Math.min(display.topRight[0], end);
        const dx: number = display.getXUnitsPerPixel();
        let table: number[][];
        for (let x = startX; x < endX; x += dx) {
            table.push([x, this.y(x)])
        }
        return table;
    }

    plot(display: Display, start: number, end: number): void {
        const table = this.getTable(display, start, end);
        display.plot(table);
    }
}