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
        const end = this.getVertex(vertex_indices[1]);
        display.drawLine(start, end, new Colour(255, 0, 0), 4);
    }
}