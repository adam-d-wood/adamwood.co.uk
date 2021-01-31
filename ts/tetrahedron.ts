class Tetreahedron extends Wireframe {
    private length: number;
    private centre: Vector;

    constructor(length: number, centre: Vector, colour: Colour) {
        super();
        this.length = length;
        this.centre = centre;
        this.colour = colour;
    }
}