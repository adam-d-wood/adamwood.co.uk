class Matrix {
    constructor(m = 2, n = 2) {
        this.rows = m;
        this.cols = n;
        this.entries = [];
        for (let i = 0; i < m; i++) {
            let row = [];
            for (let j = 0; j < n; j++) {
                row.push(0);
            }
            this.entries.push(row);
        }
    }
    static fromEntries(entries) {
        let mat = new Matrix();
        mat.setEntries(entries);
        return mat;
    }
    setEntries(entries) {
        this.entries = entries;
        this.updateDims();
    }
    getEntries() {
        return this.entries;
    }
    updateDims() {
        this.rows = this.entries.length;
        this.cols = this.entries[0].length;
    }
    getEntry(i, j) {
        return this.entries[i][j];
    }
    getRow(i) {
        return new Vector(this.entries[i]);
    }
    getCol(j) {
        let col = [];
        for (let i = 0; i < this.rows; i++) {
            col.push(this.getEntry(i, j));
        }
        return new Vector(col);
    }
    add(m) {
        if (this.rows == m.rows && this.cols == m.cols) {
            let entries = [];
            for (let i = 0; i < this.rows; i++) {
                let row;
                for (let j = 0; j < this.cols; j++) {
                    row.push(this.getEntry(i, j) + m.getEntry(i, j));
                }
                entries.push(row);
            }
            return Matrix.fromEntries(entries);
        }
        else {
            throw "addition is not defined for matrices of unequal shapes";
        }
    }
    matMul(m) {
        if (this.cols == m.rows) {
            let entries = [];
            for (let i = 0; i < this.rows; i++) {
                let row = [];
                for (let j = 0; j < m.cols; j++) {
                    let entry = this.getRow(i).dot(m.getCol(j));
                    row.push(entry);
                }
                entries.push(row);
            }
            return Matrix.fromEntries(entries);
        }
        else {
            throw "invalid matrix shapes";
        }
    }
}
