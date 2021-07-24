class Polyhedron {
    getVertex(i) {
        return this.vertices[i];
    }
    setVertex(i, v) {
        this.vertices[i] = v;
    }
    getEdge(i) {
        return this.edges[i];
    }
    drawEdge(index, display) {
        const vertex_indices = this.getEdge(index);
        const start = this.getVertex(vertex_indices[0]);
        const end = this.getVertex(vertex_indices[1]);
        display.drawLine(start, end, this.colour, 4);
    }
    draw(display) {
        for (let i = 0; i < this.edges.length; i++) {
            this.drawEdge(i, display);
        }
    }
    translate(v) {
        for (let i = 0; i < this.vertices.length; i++) {
            const vertex = this.getVertex(i);
            this.setVertex(i, vertex.add(v));
        }
    }
    rotate(yaw, pitch, roll) {
        const yawMat = Matrix.fromEntries([
            [Math.cos(yaw), -Math.sin(yaw), 0],
            [Math.sin(yaw), Math.cos(yaw), 0],
            [0, 0, 1]
        ]);
        const pitchMat = Matrix.fromEntries([
            [Math.cos(pitch), 0, Math.sin(pitch)],
            [0, 1, 0],
            [-Math.sin(pitch), 0, Math.cos(pitch)]
        ]);
        const rollMat = Matrix.fromEntries([
            [1, 0, 0],
            [0, Math.cos(roll), -Math.sin(roll)],
            [0, Math.sin(roll), Math.cos(roll)]
        ]);
        const rotMat = yawMat.matMul(pitchMat).matMul(rollMat);
        for (let i = 0; i < this.vertices.length; i++) {
            const vertex = this.getVertex(i);
            let vertexMat = Matrix.fromEntries([vertex.entries]).matMul(rotMat);
            this.setVertex(i, vertexMat.getRow(0));
        }
        // this.centre = Matrix.fromEntries([this.centre.entries]).matMul(rotMat).getRow(0);
        // this.updateCentre();
        // console.log("vertices:", this.vertices)
    }
    rotate_about(yaw, pitch, roll, focus) {
        const move = new Vector([0, 0, 0]).sub(focus);
        this.translate(move);
        this.rotate(yaw, pitch, roll);
        this.translate(move.scale(-1));
    }
}
