class Tetreahedron extends Polyhedron {

    private length: number;
    private centre: Vector;

    constructor(length: number, centre: Vector, colour: RGBColour) {
        super();
        this.length = length;
        this.centre = centre;
        this.colour = colour;
        this.vertices = this.initVertices();
        this.edges = this.initEdges();
        this.colour = colour;
    }

    getCentre(): Vector {
        this.updateCentre();
        return this.centre;
    }

    private initVertices(): Vector[] {
        let vertices: Vector[] = [];
        vertices.push(new Vector())
        return vertices;
    }

    private initEdges(): number[][] {
        console.log("initialising edges")
        let edges: number[][] = []
        for (let i=0; i<this.vertices.length; i++) {
            for (let j=i; j<this.vertices.length; j++) {
                let vertex1: Vector = this.vertices[i];
                let vertex2: Vector = this.vertices[j];
                if (vertex1.sub(vertex2).magnitude() == this.length) {
                    edges.push([i, j])
                }
            }
        }
        console.log("edges: ")
        return edges;
    }

    updateCentre(): void {
        let sum: Vector = new Vector([0, 0, 0]);
        for (let vertex of this.vertices) {
            sum = sum.add(vertex);
        }
        sum = sum.scale(1000).round().scale(0.001)
        this.centre = sum.scale(1/4);
    }
}