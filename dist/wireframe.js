class Wireframe {
    getVertex(i) {
        return this.vertices[i];
    }
    getEdge(i) {
        return this.edges[i];
    }
    drawEdge(index, display) {
        const vertex_indices = this.getEdge(index);
        const start = this.getVertex(vertex_indices[0]);
        console.log("start", start);
        const end = this.getVertex(vertex_indices[1]);
        console.log("end", end);
        display.drawLine(start, end, new Colour(255, 0, 0), 4);
    }
    draw(display) {
        console.log("called");
        console.log(this.edges);
        for (let i = 0; i < this.edges.length; i++) {
            console.log("drawing");
            this.drawEdge(i, display);
        }
    }
}
