class Vector {
    public size: number;
    public entries: number[];

    constructor(entries: number[]) {
        this.size = entries.length;
        this.entries = entries;
    }
}