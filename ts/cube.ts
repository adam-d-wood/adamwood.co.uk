class Cube extends Wireframe{

    private length: number;
    private centre: Vector;

    constructor(length: number, centre: Vector, colour: Colour) {
        super();
        this.length = length;
        this.centre = centre;
        this.vertices = this.initVertices();
        this.edges = this.initEdges();
        this.colour = colour;
    }

    private initVertices(): Vector[] {
        let vertices: Vector[] = [];
        for (let i=0; i < 2; i++) {
            for (let j=0; j < 2; j++) {
                for (let k=0; k < 2; k++) {
                    let x: number = this.centre.getEntry(0) + this.length * (i-0.5);
                    let y: number = this.centre.getEntry(1) + this.length * (j-0.5);
                    let z: number = this.centre.getEntry(2) + this.length * (k-0.5);
                    vertices.push(new Vector([x, y, z]));
                }
            }
        }
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




    translate(v: Vector): void {
        for (let i=0; i < this.vertices.length; i++) {
            const vertex = this.getVertex(i);
            this.setVertex(i, vertex.add(v));
        this.centre = this.centre.add(v);
        }
    }

    rotate(yaw: number, pitch: number, roll: number): void {
        const yawMat: Matrix = Matrix.fromEntries([
            [Math.cos(yaw), -Math.sin(yaw), 0],
            [Math.sin(yaw), Math.cos(yaw), 0],
            [0, 0, 1]
        ]);
        const pitchMat: Matrix = Matrix.fromEntries([
            [Math.cos(pitch), 0, Math.sin(pitch)],
            [0, 1, 0],
            [-Math.sin(pitch), 0, Math.cos(pitch)]
        ]);
        const rollMat: Matrix = Matrix.fromEntries([
            [1, 0, 0],
            [0, Math.cos(roll), -Math.sin(roll)],
            [0, Math.sin(roll), Math.cos(roll)]
        ]);
        const rotMat: Matrix = yawMat.matMul(pitchMat).matMul(rollMat);
        for (let i=0; i < this.vertices.length; i++) {
            const vertex = this.getVertex(i);
            console.log("old vertex: ", vertex);
            let vertexMat: Matrix = Matrix.fromEntries([vertex.entries]).matMul(rotMat);
            this.setVertex(i, vertexMat.getRow(0));
            console.log("new vertex: ", vertex)
        }
        console.log("vertices:", this.vertices)
    }

}