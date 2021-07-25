class Sphere extends Polyhedron {
    constructor(radius, centre, colour) {
        super();
        this.radius = radius;
        this.centre = centre;
        this.colour = colour;
        this.thetaRes = 10;
        this.phiRes = 20;
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
        for (let theta = Math.PI / this.thetaRes; theta < Math.PI; theta += Math.PI / this.thetaRes) {
            for (let phi = 0; phi < 2 * Math.PI; phi += 2 * Math.PI / this.phiRes) {
                console.log("theta=", theta, "phi=", phi);
                let vertex = new Vector([
                    this.radius * Math.sin(theta) * Math.cos(phi),
                    this.radius * Math.cos(theta),
                    this.radius * Math.sin(theta) * Math.sin(phi)
                ]);
                vertices.push(vertex);
            }
        }
        console.log("sphere vertices", vertices);
        return vertices;
    }
    initEdges() {
        console.log("initialising edges");
        let edges = [];
        for (let i = 0; i < this.vertices.length; i++) {
            if ((i + 1) % this.phiRes == 0) {
                edges.push([i, i - (this.phiRes - 1)]);
            }
            else {
                edges.push([i, i + 1]);
            }
            if (i + this.phiRes < this.vertices.length) {
                edges.push([i, i + this.phiRes]);
            }
        }
        this.vertices.push(new Vector([0, -this.radius, 0]));
        const n = this.vertices.length;
        for (let i = 0; i < this.phiRes; i++) {
            edges.push([n - 1, n - (i + 2)]);
        }
        this.vertices.push(new Vector([0, this.radius, 0]));
        for (let i = 0; i < this.phiRes; i++) {
            edges.push([n, i]);
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
