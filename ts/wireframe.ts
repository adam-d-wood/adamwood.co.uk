class Wireframe {

    public vertices: Vector[];
    public edges: number[][];

    getVertex(i: number): Vector {
        return this.vertices[i];
    }

    private getEdge(i: number): number[] {
        return this.edges[i];
    }

    drawEdge(index: number, display: Display) {
        const vertex_indices: number[] = this.getEdge(index);
        const start: Vector = this.getVertex(vertex_indices[0]);
        console.log("start", start);
        const end: Vector = this.getVertex(vertex_indices[1]);
        console.log("end", end);
        display.drawLine(start, end, new Colour(255, 0, 0), 4);
    }

    draw(display: Display) {
        console.log("called")
        console.log(this.edges)
        for (let i=0; i<this.edges.length; i++) {
            console.log("drawing")
            this.drawEdge(i, display);
        }
    }
}