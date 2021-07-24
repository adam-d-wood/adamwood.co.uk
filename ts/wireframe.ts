class Polyhedron {

    public vertices: Vector[];
    public edges: number[][];
    public colour: RGBColour;

    getVertex(i: number): Vector {
        return this.vertices[i];
    }

    setVertex(i: number, v:Vector) {
        this.vertices[i] = v;
    }

    private getEdge(i: number): number[] {
        return this.edges[i];
    }

    drawEdge(index: number, display: Display) {
        const vertex_indices: number[] = this.getEdge(index);
        const start: Vector = this.getVertex(vertex_indices[0]);
        const end: Vector = this.getVertex(vertex_indices[1]);
        display.drawLine(start, end, this.colour, 4);
    }

    draw(display: Display) {
        for (let i=0; i<this.edges.length; i++) {
            this.drawEdge(i, display);
        }
    }

    translate(v: Vector): void {
        for (let i=0; i < this.vertices.length; i++) {
            const vertex = this.getVertex(i);
            this.setVertex(i, vertex.add(v));
        }
    }


    public rotate(yaw: number, pitch: number, roll: number): void {
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
            let vertexMat: Matrix = Matrix.fromEntries([vertex.entries]).matMul(rotMat);
            this.setVertex(i, vertexMat.getRow(0));
        }
        // this.centre = Matrix.fromEntries([this.centre.entries]).matMul(rotMat).getRow(0);
        // this.updateCentre();
        // console.log("vertices:", this.vertices)
    }

    public rotate_about(yaw: number, pitch: number, roll: number, focus: Vector): void {
        const move: Vector = new Vector([0, 0, 0]).sub(focus);
        this.translate(move);
        this.rotate(yaw, pitch, roll);
        this.translate(move.scale(-1));
    }


}