class Wireframe {

    public vertices: Vector[];
    private edges: number[][];

    getVertex(i: number): Vector {
        return this.vertices[i];
    }

    private getEdge(i: number): number[] {
        return this.edges[i];
    }

    drawEdge(index: number, display: Display) {
        const vertex_indices: number[] = this.getEdge(index);
        const start: Vector = this.getVertex(vertex_indices[0]);
        const end: Vector = this.getVertex(vertex_indices[1]);
        display.drawLine(start, end, new Colour(255, 0, 0), 4);
    }
}