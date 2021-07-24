class Space3D {
    
    private objects: Polyhedron[];

    constructor() {
        this.objects = [];
    }

    public drawObjects(display : Display): void {
        for (let object of this.objects) {
            object.draw(display);
        }
    }

    public addObject(object: Polyhedron): void {
        this.objects.push(object);
    }
}