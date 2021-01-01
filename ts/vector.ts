class Vector {
    public size: number;
    public entries: number[];

    constructor(entries: number[]) {
        this.size = entries.length;
        this.entries = entries;
    }

    public getEntry(i:number): number {
        return this.entries[i];
    }

    static dot(a: Vector, b: Vector): number {
        if (a.size != b.size) {
            throw new Error("dot product not defined for different sized vectors");
        }
        let result: number = 0;
        for (let i = 0; i < a.size; i++) {
            result += a.getEntry(i) * b.getEntry(i);
        }
        return result;
    }
}