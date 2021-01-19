class Cube extends Wireframe {
    constructor(length, centre) {
        super();
        this.length = length;
        this.centre = centre;
        this.vertices = this.getVertices();
    }
    getVertices() {
        let vertices = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    let x = this.centre.getEntry(0) + this.length * (i - 0.5);
                    let y = this.centre.getEntry(1) + this.length * (j - 0.5);
                    let z = this.centre.getEntry(2) + this.length * (k - 0.5);
                    vertices.push(new Vector([x, y, z]));
                }
            }
        }
        return vertices;
    }
    translate(v) {
        return new Cube(this.length, this.centre.add(v));
    }
}
