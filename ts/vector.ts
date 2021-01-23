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

    scale(s: number): Vector {
        const newEntries = this.entries.map(x => s*x);
        return new Vector(newEntries);
    }

    add(v: Vector): Vector {
        if (this.size == v.size) {
            let newEntries: number[] = [];
            for (let i=0; i<this.size; i++) {
                newEntries.push(this.getEntry(i) + v.getEntry(i));
            }
            return new Vector(newEntries);
        } else {
            throw "cannot add different sized vectors"
        }
    }

    sub(v: Vector): Vector {
        return this.add(v.scale(-1));
    }

    transform(m: Matrix): Vector {
        if (m.cols == this.size) {
            let newEntries: number[] = [];
            for (let i=0; i<this.size; i++) {
                newEntries.push(m.getRow(i).dot(this));
            }
            return new Vector(newEntries);
        } else {
            throw "invalid shapes";
        }
    }

    magnitude(): number {
        return Math.sqrt(this.entries.map(x=>x*x).reduce((a, b)=>a+b))
    }
}