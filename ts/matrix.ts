class Matrix {

    private entries: number[][];

    public cols: number;
    public rows: number;

    constructor(m: number=2, n:number=2) {
        this.rows = m;
        this.cols = n;
        this.entries = [];
        for (let i=0; i<m; i++) {
            let row: number[] = []
            for (let j=0; j<n; j++) {
                row.push(0);
            }
            this.entries.push(row)
        }
    }
    
    static fromEntries(entries: number[][]): Matrix {
        let mat: Matrix = new Matrix();
        mat.setEntries(entries);
        return mat;
    }   

    setEntries(entries: number[][]): void {
        this.entries = entries;
        this.updateDims();
    }

    getEntries(): number[][] {
        return this.entries;
    }

    private updateDims(): void {
        this.rows = this.entries.length;
        this.cols = this.entries[0].length;
    }

    getEntry(i: number, j: number): number {
        return this.entries[i][j];
    }

    setEntry(i: number, j: number, x: number): void {
        this.entries[i][j] = x;
    }

    getRow(i: number): Vector {
        return new Vector(this.entries[i]);
    }

    getCol(j: number): Vector {
        let col: number[] = [];
        for (let i=0; i < this.rows; i++) {
            col.push(this.getEntry(i, j))
        }
        return new Vector(col);
    }

    add(m: Matrix): Matrix {
        if (this.rows == m.rows && this.cols == m.cols) {
            let entries: number[][] = [];
            for (let i=0; i < this.rows; i++) {
                let row: number[];
                for(let j=0; j<this.cols; j++) {
                    row.push(this.getEntry(i, j) + m.getEntry(i, j));
                }
                entries.push(row);
            }
            return Matrix.fromEntries(entries);
        } else {
            throw "addition is not defined for matrices of unequal shapes";
        }
    }

    matMul(m: Matrix): Matrix {
        if (this.cols == m.rows) {
            let entries: number[][] = [];
            for (let i=0; i<this.rows; i++) {
                let row: number[] = [];
                for (let j=0; j<m.cols; j++) {
                    let entry: number = this.getRow(i).dot(m.getCol(j));
                    row.push(entry);
                }
                entries.push(row);
            }
            return Matrix.fromEntries(entries)
        } else {
            throw "invalid matrix shapes";
        }
    }

}