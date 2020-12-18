class ExplicitCurve {

    y: (x:number) => number;

    constructor(y: (x: number) => number) {
        this.y = y;
    }

    getTable(display: Display, start: number, end: number): number[][] {
        const startX: number = display.topLeft[0];
        const endX: number = display.bottomRight[0];
        const dx: number = display.width / (endX-startX);
        let table: number[][];
        for (let x = startX; x < endX; x += dx) {
            table.push([x, this.y(x)])
        }
        return table;
    }

    draw
}