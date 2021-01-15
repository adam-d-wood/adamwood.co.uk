class Vector {
    constructor(entries) {
        this.size = entries.length;
        this.entries = entries;
    }
    getEntry(i) {
        return this.entries[i];
    }
    dot(a) {
        if (a.size != this.size) {
            throw new Error("dot product not defined for different sized vectors");
        }
        let result = 0;
        for (let i = 0; i < a.size; i++) {
            result += a.getEntry(i) * this.getEntry(i);
        }
        return result;
    }
    scale(s) {
        const newEntries = this.entries.map(x => s * x);
        return new Vector(newEntries);
    }
    add(v) {
        if (this.size == v.size) {
            let newEntries = [];
            for (let i = 0; i < this.size; i++) {
                newEntries.push(this.getEntry(i) + v.getEntry(i));
            }
            return new Vector(newEntries);
        }
        else {
            throw "cannot add different sized vectors";
        }
    }
    sub(v) {
        return this.add(v.scale(-1));
    }
    transform(m) {
        if (m.cols == this.size) {
            let newEntries = [];
            for (let i = 0; i < this.size; i++) {
                newEntries.push(m.getRow(i).dot(this));
            }
            return new Vector(newEntries);
        }
        else {
            throw "invalid shapes";
        }
    }
}
