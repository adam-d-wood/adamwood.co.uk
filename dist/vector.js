class Vector {
    constructor(entries) {
        this.size = entries.length;
        this.entries = entries;
    }
    getEntry(i) {
        return this.entries[i];
    }
    static dot(a, b) {
        if (a.size != b.size) {
            throw new Error("dot product not defined for different sized vectors");
        }
        let result = 0;
        for (let i = 0; i < a.size; i++) {
            result += a.getEntry(i) * b.getEntry(i);
        }
        return result;
    }
}
