class Tetrahedron extends Polyhedron {
    constructor(length, centre, colour) {
        super();
        this.length = length;
        this.centre = centre;
        this.colour = colour;
        this.vertices = this.initVertices();
        this.edges = this.initEdges();
        this.translate(centre);
    }
    getCentre() {
        this.updateCentre();
        return this.centre;
    }
    initVertices() {
        let vertices = [];
        vertices.push((new Vector([1, 0, -1 / Math.SQRT2])));
        vertices.push((new Vector([-1, 0, -1 / Math.SQRT2])));
        vertices.push((new Vector([0, 1, 1 / Math.SQRT2])));
        vertices.push((new Vector([0, -1, 1 / Math.SQRT2])));
        vertices = vertices.map(x => x.scale(this.length / 2));
        console.log("tet vertices", vertices);
        return vertices;
    }
    initEdges() {
        console.log("initialising edges");
        let edges = [];
        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = i + 1; j < this.vertices.length; j++) {
                edges.push([i, j]);
            }
        }
        console.log("edges: ", edges);
        return edges;
    }
    updateCentre() {
        let sum = new Vector([0, 0, 0]);
        for (let vertex of this.vertices) {
            sum = sum.add(vertex);
        }
        sum = sum.scale(1000).round().scale(0.001);
        this.centre = sum.scale(1 / 4);
    }
}
