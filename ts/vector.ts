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

    dot(a: Vector): number {
        if (a.size != this.size) {
            throw new Error("dot product not defined for different sized vectors");
        }
        let result: number = 0;
        for (let i = 0; i < a.size; i++) {
            result += a.getEntry(i) * this.getEntry(i);
        }
        return result;
    }
}