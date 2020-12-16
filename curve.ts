class ExplicitCurve {

    y: (a:number, b:number) => number;

    constructor(y: (a: number, b: number) => number) {
        this.y = y;
    }
}