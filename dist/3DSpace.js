class Space3D {
    constructor() {
        this.objects = [];
    }
    drawObjects(display) {
        for (let object of this.objects) {
            object.draw(display);
        }
    }
    addObject(object) {
        this.objects.push(object);
    }
}
